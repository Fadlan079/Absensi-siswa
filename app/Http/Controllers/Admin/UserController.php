<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('kelas')
            ->orderBy('name')
            ->paginate(20);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users->through(fn($u) => [
                'id'    => $u->id,
                'name'  => $u->name,
                'email' => $u->email,
                'role'  => $u->role,
                'kelas' => $u->kelas ? "{$u->kelas->nama_kelas} {$u->kelas->jurusan}" : null,
            ]),
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
}
