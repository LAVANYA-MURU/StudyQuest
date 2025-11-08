
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const { tasks } = useData();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    if (!user) return null;

    const completedTasks = tasks.filter(task => task.completed);

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock update
        alert(`Profile updated for ${name}`);
    };
    
    const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Mock upload
            alert(`New profile picture selected: ${e.target.files[0].name}`);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Form */}
                <div className="md:col-span-2 bg-base-200 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div className="flex items-center space-x-6">
                             <img className="h-24 w-24 rounded-full object-cover" src={user.avatarUrl} alt="Profile" />
                             <div>
                                <label htmlFor="picture-upload" className="cursor-pointer px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-indigo-700">
                                    Change Picture
                                </label>
                                <input id="picture-upload" type="file" className="hidden" onChange={handlePictureUpload} accept="image/*" />
                             </div>
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400">Full Name</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email Address</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white" />
                        </div>
                        <div>
                            <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-indigo-700">Save Changes</button>
                        </div>
                    </form>
                </div>
                {/* Activity History */}
                <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-white mb-6">Activity History</h2>
                    <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {completedTasks.map(task => (
                             <li key={task.id} className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                        <CheckIcon className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Completed task</p>
                                    <p className="text-sm text-gray-400">{task.title}</p>
                                </div>
                            </li>
                        ))}
                         {completedTasks.length === 0 && <p className="text-gray-400">No completed tasks yet.</p>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const CheckIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

export default Profile;
