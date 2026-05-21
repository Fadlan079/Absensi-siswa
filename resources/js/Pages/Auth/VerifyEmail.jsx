import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email - Portal Presensi" />

            <div className="mb-8 text-center lg:text-left">
                <h2 className="text-2xl font-bold text-text mb-2">Verifikasi Email Anda</h2>
                <p className="text-muted text-sm leading-relaxed">
                    Terima kasih telah mendaftar! Sebelum memulai, harap verifikasi alamat email Anda dengan mengeklik tautan yang baru saja kami kirimkan ke email Anda. Jika tidak menerima email tersebut, kami akan mengirimkan yang baru.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 text-sm font-medium text-green-700 bg-green-50 p-4 rounded-xl border border-green-200">
                    Tautan verifikasi baru telah dikirimkan ke alamat email yang Anda berikan saat pendaftaran.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <PrimaryButton className="w-full sm:w-auto" disabled={processing}>
                        Kirim Ulang Email Verifikasi
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm text-muted hover:text-danger transition-colors focus:outline-none rounded-md"
                    >
                        Keluar Akun
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
