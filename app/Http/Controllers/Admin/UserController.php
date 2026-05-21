<?php

namespace App\Http\Controllers\Admin;

use App\Exports\SimpleExport;
use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('kelas');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role')) {
            $query->where('role', $request->input('role'));
        }

        $users = $query->orderBy('name')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users->through(fn($u) => [
                'id'    => $u->id,
                'name'  => $u->name,
                'email' => $u->email,
                'role'  => $u->role,
                'kelas' => $u->kelas ? "{$u->kelas->nama_kelas} {$u->kelas->jurusan}" : null,
            ]),
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create', [
            'kelas_list' => Kelas::all(['id', 'nama_kelas', 'jurusan']),
            'roles'      => ['admin', 'kepala_sekolah', 'wali_kelas', 'sekretaris', 'guru_mapel', 'guru_piket'],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:100',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role'     => 'required|in:admin,kepala_sekolah,wali_kelas,sekretaris,guru_mapel,guru_piket',
            'kelas_id' => 'nullable|exists:kelas,id',
        ]);

        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => $request->role,
            'kelas_id' => $request->kelas_id,
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Pengguna berhasil ditambahkan!');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user'       => $user->only('id', 'name', 'email', 'role', 'kelas_id'),
            'kelas_list' => Kelas::all(['id', 'nama_kelas', 'jurusan']),
            'roles'      => ['admin', 'kepala_sekolah', 'wali_kelas', 'sekretaris', 'guru_mapel', 'guru_piket'],
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'     => 'required|string|max:100',
            'email'    => 'required|email|unique:users,email,' . $user->id,
            'role'     => 'required|in:admin,kepala_sekolah,wali_kelas,sekretaris,guru_mapel,guru_piket',
            'kelas_id' => 'nullable|exists:kelas,id',
            'password' => 'nullable|min:6',
        ]);

        $user->update([
            'name'     => $request->name,
            'email'    => $request->email,
            'role'     => $request->role,
            'kelas_id' => $request->kelas_id,
            ...($request->password ? ['password' => Hash::make($request->password)] : []),
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Data pengguna berhasil diperbarui!');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Tidak bisa menghapus akun sendiri.');
        }
        $user->delete();
        return back()->with('success', 'Pengguna berhasil dihapus.');
    }

    /* ─────────────── Export & Import ─────────────── */

    public function exportExcel()
    {
        $users = User::with('kelas')->orderBy('name')->get();
        $rows  = $users->map(fn ($u, $i) => [
            $i + 1,
            $u->name,
            $u->email,
            $u->role,
            $u->kelas ? "{$u->kelas->nama_kelas} {$u->kelas->jurusan}" : '-',
        ])->toArray();

        return Excel::download(
            new SimpleExport($rows, ['No', 'Nama', 'Email', 'Role', 'Kelas']),
            'Data_Pengguna_' . now()->format('Ymd') . '.xlsx'
        );
    }

    public function exportPdf()
    {
        $users = User::with('kelas')->orderBy('name')->get();
        $pdf   = Pdf::loadView('exports.users_pdf', compact('users'))
            ->setPaper('a4', 'portrait');
        return $pdf->download('Data_Pengguna_' . now()->format('Ymd') . '.pdf');
    }

    public function importExcel(Request $request)
    {
        $request->validate(['file' => 'required|file|mimes:xlsx,xls,csv|max:4096']);

        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($request->file('file')->getRealPath());
        $rows        = $spreadsheet->getActiveSheet()->toArray(null, true, true, false);

        $imported = 0;
        foreach ($rows as $i => $row) {
            if ($i === 0) continue;
            [$name, $email, $role, $password] = array_pad(array_values($row), 4, null);
            if (empty($name) || empty($email) || empty($role)) continue;

            $validRoles = ['admin','kepala_sekolah','wali_kelas','sekretaris','guru_mapel','guru_piket'];
            if (!in_array(trim($role), $validRoles)) continue;

            User::updateOrCreate(
                ['email' => trim($email)],
                [
                    'name'     => trim($name),
                    'role'     => trim($role),
                    'password' => Hash::make($password ?: 'password123'),
                ]
            );
            $imported++;
        }

        return redirect()->route('admin.users.index')
            ->with('success', "{$imported} pengguna berhasil diimpor.");
    }
}
