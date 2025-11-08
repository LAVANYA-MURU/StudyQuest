
import React from 'react';
import { useData } from '../context/DataContext';
import Spinner from '../components/ui/Spinner';

const AdminDashboard: React.FC = () => {
    const { users, tasks, habits, studyRooms, loading } = useData();

    if (loading) {
        return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={users.length} icon={<UsersIcon className="w-8 h-8" />} />
                <StatCard title="Total Tasks" value={tasks.length} icon={<ClipboardIcon className="w-8 h-8" />} />
                <StatCard title="Total Habits" value={habits.length} icon={<CheckBadgeIcon className="w-8 h-8" />} />
                <StatCard title="Active Rooms" value={studyRooms.length} icon={<BuildingLibraryIcon className="w-8 h-8" />} />
            </div>

            {/* User Management Table */}
            <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">User Management</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs text-gray-300 uppercase bg-base-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Level</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="bg-base-200 border-b border-base-300 hover:bg-base-300">
                                    <td className="px-6 py-4 font-medium text-white flex items-center">
                                        <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full mr-3"/>
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-red-900 text-red-300' : 'bg-blue-900 text-blue-300'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{user.level}</td>
                                    <td className="px-6 py-4 space-x-2">
                                        <button className="font-medium text-primary hover:underline">Edit</button>
                                        <button className="font-medium text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactElement;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
        <div className="p-3 bg-base-300 rounded-full text-primary">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const UsersIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-2.308M15 19.128c-3.032 0-5.5-2.032-5.5-4.512 0-2.48 2.468-4.512 5.5-4.512 3.032 0 5.5 2.032 5.5 4.512 0 2.48-2.468 4.512-5.5 4.512Zm-2.25-4.512c0-2.48 2.239-4.512 5-4.512s5 2.032 5 4.512c0 2.48-2.239 4.512-5 4.512s-5-2.032-5-4.512Zm-9-3.75h.008v.008H3.75v-.008Zm0 0h.008v.008H3.75v-.008Zm0 0h.008v.008H3.75v-.008Zm0 0h.008v.008H3.75v-.008Z" /></svg>;
const ClipboardIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 5.25 6h.008a2.25 2.25 0 0 1 2.242 2.135 48.425 48.425 0 0 0-.112-1.588A2.25 2.25 0 0 1 9.75 3.75h4.5a2.25 2.25 0 0 1 2.25 2.25v.091c.01-.03.019-.061.029-.091a2.25 2.25 0 0 1 2.25-2.25h.008a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-4.5a2.25 2.25 0 0 1-2.25-2.25V6.108c0-.906-.394-1.732-1.03-2.316a2.25 2.25 0 0 0-1.22-.647M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>;
const CheckBadgeIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
const BuildingLibraryIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>;


export default AdminDashboard;
