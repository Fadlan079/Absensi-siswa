<?php

namespace App\Http\Controllers;

use App\Models\Notifikasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotifikasiController extends Controller
{
    public function index()
    {
        $notifikasi = Notifikasi::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Notifikasi/Index', [
            'notifikasi' => $notifikasi
        ]);
    }

    public function markAsRead(Request $request, $id)
    {
        $notif = Notifikasi::where('user_id', auth()->id())->findOrFail($id);
        $notif->update(['is_read' => true]);

        return back();
    }

    public function markAllAsRead()
    {
        Notifikasi::where('user_id', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return back();
    }
}
