import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { getLevelDetails } from '../constants';
import { Link } from 'react-router-dom';
import PomodoroTimer from '../components/productivity/PomodoroTimer';
import Spinner from '../components/ui/Spinner';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { tasks, habits, loading } = useData();

    if (loading || !user) {
        return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }

    const { level, progress, pointsToNextLevel } = getLevelDetails(user.points);
    const incompleteTasks = tasks.filter(task => !task.completed);
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">My Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Level Card */}
                <div className="bg-base-200 p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
                    <h2 className="text-lg font-semibold text-white">Your Progress</h2>
                    <div className="flex items-center space-x-4 mt-4">
                        <div className="relative">
                            <svg className="w-20 h-20 transform -rotate-90">
                                <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" className="text-base-300" fill="transparent" />
                                <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="8" className="text-secondary" fill="transparent"
                                    strokeDasharray={2 * Math.PI * 34}
                                    strokeDashoffset={2 * Math.PI * 34 * (1 - progress / 100)}
                                    strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">{level}</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-white">Level {level}</p>
                            <p className="text-sm text-gray-400">{user.points} Total Points</p>
                            <p className="text-sm text-gray-400">{pointsToNextLevel} points to next level</p>
                        </div>
                    </div>
                </div>

                {/* Streak Card */}
                <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-orange-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0-2.433 2.47.822.822 0 0 1-.942.333 8.287 8.287 0 0 0-1.265-.82A8.25 8.25 0 0 1 12 5.25a8.25 8.25 0 0 1 3.362-.036Z" />
                    </svg>
                    <p className="text-3xl font-bold text-white mt-2">{user.streak}</p>
                    <p className="text-gray-400">Day Streak</p>
                </div>

                {/* Tasks Card */}
                <div className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className="text-3xl font-bold text-white mt-2">{tasks.length - incompleteTasks.length} / {tasks.length}</p>
                    <p className="text-gray-400">Tasks Completed</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Tasks */}
                <div className="bg-base-200 p-6 rounded-lg shadow-lg lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">Upcoming Tasks</h2>
                        <Link to="/tasks" className="text-sm text-primary hover:underline">View All</Link>
                    </div>
                    <ul className="space-y-3">
                        {incompleteTasks.slice(0, 4).map(task => (
                            <li key={task.id} className="flex items-center justify-between bg-base-300 p-3 rounded-md">
                                <div>
                                    <p className="text-white font-medium">{task.title}</p>
                                    <p className="text-xs text-gray-400">{new Date(task.dueDate).toLocaleDateString()}</p>
                                </div>
                                <button className="w-6 h-6 border-2 border-gray-500 rounded-full focus:outline-none"></button>
                            </li>
                        ))}
                         {incompleteTasks.length === 0 && (
                            <p className="text-gray-400 text-center py-4">No pending tasks. Great job!</p>
                        )}
                    </ul>
                </div>

                {/* Pomodoro Timer */}
                <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                     <h2 className="text-xl font-semibold text-white mb-4">Focus Timer</h2>
                     <PomodoroTimer />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;