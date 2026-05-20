import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title="Admin Dashboard" />
            
            <section className="p-5">
                <div className="bg-primary p-6 rounded-lg shadow-md border-b-[5px] border-secondary text-white">
                    <h2 className="text-2xl font-bold mb-2">Selamat Datang di Admin Dashboard</h2>
                    <p className="text-gray-200">Anda masuk sebagai Admin.</p>
                </div>
            </section>
        </DashboardLayout>
    );
}
