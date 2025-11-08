import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const { user } = useAuth();

    const commonClasses = "flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200";
    const activeClass = "bg-primary text-white";
    const inactiveClass = "text-gray-400 hover:bg-base-300 hover:text-white";

    const navLinkClasses = ({ isActive }: { isActive: boolean }) => 
        `${commonClasses} ${isActive ? activeClass : inactiveClass}`;

    const navItems = [
        { to: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
        { to: '/tasks', icon: ClipboardIcon, label: 'Tasks & Habits' },
        { to: '/rooms', icon: UsersIcon, label: 'Study Rooms' },
        { to: '/profile', icon: UserCircleIcon, label: 'Profile' },
    ];

    if (user?.role === 'admin') {
        navItems.push({ to: '/admin', icon: CogIcon, label: 'Admin Panel' });
    }

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>
            <aside className={`flex-shrink-0 w-64 bg-base-200 border-r border-base-300 flex flex-col transition-transform duration-300 z-30 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-center h-20 border-b border-base-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                    <span className="ml-2 text-xl font-bold text-white">StudyQuest</span>
                </div>
                <nav className="flex-1 px-2 py-4">
                    {navItems.map(item => (
                         <NavLink key={item.to} to={item.to} className={navLinkClasses} onClick={() => setSidebarOpen(false)}>
                            <item.icon className="h-6 w-6" />
                            <span className="ml-4">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

// SVG Icon Components
const HomeIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>;
const ClipboardIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 5.25 6h.008a2.25 2.25 0 0 1 2.242 2.135 48.425 48.425 0 0 0-.112-1.588A2.25 2.25 0 0 1 9.75 3.75h4.5a2.25 2.25 0 0 1 2.25 2.25v.091c.01-.03.019-.061.029-.091a2.25 2.25 0 0 1 2.25-2.25h.008a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-4.5a2.25 2.25 0 0 1-2.25-2.25V6.108c0-.906-.394-1.732-1.03-2.316a2.25 2.25 0 0 0-1.22-.647M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>;
const UsersIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.57-1.023-.095-2.346-1.092-2.962M3.75 12.075c3.01 0 5.715-1.25 7.67-3.321M3.75 12.075c-3.01 0-5.715-1.25-7.67-3.321m0 0a3 3 0 0 0-5.682 2.72m0 0a9.094 9.094 0 0 0 3.741.479m-3.741-.479a3 3 0 0 0-4.682-2.72m5.682 2.72a3 3 0 0 1 3.336 0m12.75 0a3 3 0 0 1-3.336 0M12 18.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></svg>;
const UserCircleIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>;
const CogIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15 0c1.146-5.573 6.036-9.75 12-9.75s10.854 4.177 12 9.75m-12 0c1.146 5.573 6.036 9.75 12 9.75s10.854-4.177 12 9.75M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" /></svg>;

export default Sidebar;