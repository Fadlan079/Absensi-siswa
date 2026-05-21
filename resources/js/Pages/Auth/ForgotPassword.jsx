import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password - Portal Presensi" />

            <div className="mb-8 text-center lg:text-left">
                <h2 className="text-2xl font-bold text-text mb-2">Lupa Password?</h2>
                <p className="text-muted text-sm leading-relaxed">
                    Tidak masalah. Beritahu kami alamat email Anda, dan kami akan mengirimkan tautan untuk membuat password baru.
                </p>
            </div>

            {status && (
                <div className="mb-6 text-sm font-medium text-green-700 bg-green-50 p-4 rounded-xl border border-green-200">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Kirim Tautan Reset
                    </PrimaryButton>
                </div>
                
                <div className="text-center mt-4">
                    <Link href={route('login')} className="text-sm text-muted hover:text-primary transition-colors focus:outline-none rounded-md">
                        Kembali ke halaman masuk
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
