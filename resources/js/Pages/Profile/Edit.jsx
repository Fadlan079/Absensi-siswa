import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;

    return (
        <DashboardLayout user={auth.user}>
            <Head title="Profile" />
            <section className="p-5">
                <div className="bg-primary rounded-xl p-5 text-white shadow-md border-b-4 border-secondary">
                    <h2 className="text-xl font-bold">Profil Saya</h2>
                    <p className="text-white/70 text-sm mt-1">Kelola informasi akun dan pengaturan keamanan</p>
                </div>
            </section>

            <section className="px-5 pb-6">
                <div className="mx-auto space-y-6">
                    <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-xl">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-xl">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-6 shadow-sm border border-gray-100 rounded-xl">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </section>
        </DashboardLayout>
    );
}
