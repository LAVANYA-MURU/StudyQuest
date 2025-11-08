
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface NavbarProps {
    setSidebarOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <header className="flex items-center justify-between p-4 bg-base-200 border-b border-base-300">
            <div className="flex items-center">
                 <button onClick={() => setSidebarOpen(true)} className="text-gray-400 focus:outline-none lg:hidden">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
                <h1 className="text-xl font-semibold text-white ml-2">Welcome, {user?.name.split(' ')[0]}!</h1>
            </div>

            <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                    <img className="h-10 w-10 rounded-full object-cover" src={user?.avatarUrl} alt="Your avatar" />
                    <span className="text-white hidden sm:inline">{user?.name}</span>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
                
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-base-300 rounded-md shadow-lg py-1 z-50">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-base-200">Profile</Link>
                        <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-base-200">
                            Sign out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
