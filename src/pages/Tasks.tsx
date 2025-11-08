import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import type { Task, Habit } from '../types';

const Tasks: React.FC = () => {
    const { 
        tasks, habits, toggleTask, completeHabit, 
        deleteTask, deleteHabit, addTask, addHabit, loading 
    } = useData();
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [formType, setFormType] = useState<'task' | 'habit'>('task');

    // Task form state
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskPoints, setTaskPoints] = useState(10);

    // Habit form state
    const [habitTitle, setHabitTitle] = useState('');
    const [habitFrequency, setHabitFrequency] = useState<'daily' | 'weekly'>('daily');
    const [habitPoints, setHabitPoints] = useState(5);

    const resetForms = () => {
        setTaskTitle('');
        setTaskDesc('');
        setTaskDueDate('');
        setHabitTitle('');
        setHabitFrequency('daily');
    };

    const handleOpenModal = () => {
        resetForms();
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskTitle || !taskDueDate) return;
        await addTask({ title: taskTitle, description: taskDesc, dueDate: taskDueDate, points: taskPoints });
        handleCloseModal();
    };

    const handleAddHabit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!habitTitle) return;
        await addHabit({ title: habitTitle, frequency: habitFrequency, points: habitPoints });
        handleCloseModal();
    };


    return (
        <>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">Tasks & Habits</h1>
                    <button onClick={handleOpenModal} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700">
                        Add New
                    </button>
                </div>

                {loading ? <div className="flex justify-center"><Spinner /></div> : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Tasks Section */}
                        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold text-white mb-4">My Tasks</h2>
                            <ul className="space-y-3">
                                {tasks.map(task => (
                                    <li key={task.id} className={`flex items-center justify-between bg-base-300 p-3 rounded-md transition-opacity ${task.completed ? 'opacity-50' : 'opacity-100'}`}>
                                        <div className="flex items-center">
                                            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="h-5 w-5 rounded bg-base-100 border-gray-600 text-primary focus:ring-primary" />
                                            <div className="ml-4">
                                                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.title}</p>
                                                <p className="text-xs text-gray-400">{new Date(task.dueDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={() => deleteTask(task.id)} className="text-gray-500 hover:text-red-400 p-1">
                                                 <TrashIcon className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                                {tasks.length === 0 && <p className="text-gray-400 text-center py-4">No tasks yet. Add one!</p>}
                            </ul>
                        </div>

                        {/* Habits Section */}
                        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold text-white mb-4">My Habits</h2>
                             <ul className="space-y-3">
                                {habits.map(habit => (
                                    <li key={habit.id} className="flex items-center justify-between bg-base-300 p-3 rounded-md">
                                        <div>
                                            <p className="font-medium text-white">{habit.title}</p>
                                            <p className="text-xs text-gray-400 capitalize">{habit.frequency} &bull; {habit.streak} day streak 🔥</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button onClick={() => completeHabit(habit.id)} className="px-3 py-1 text-sm bg-secondary text-white rounded-md hover:bg-green-600">
                                                Complete
                                            </button>
                                             <button onClick={() => deleteHabit(habit.id)} className="text-gray-500 hover:text-red-400 p-1">
                                                 <TrashIcon className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                                {habits.length === 0 && <p className="text-gray-400 text-center py-4">No habits yet. Add one!</p>}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add a New Item">
                <div>
                    <div className="border-b border-gray-700">
                        <nav className="-mb-px flex space-x-6">
                            <button onClick={() => setFormType('task')} className={`py-3 px-1 border-b-2 font-medium text-sm ${formType === 'task' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>
                                Task
                            </button>
                            <button onClick={() => setFormType('habit')} className={`py-3 px-1 border-b-2 font-medium text-sm ${formType === 'habit' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}>
                                Habit
                            </button>
                        </nav>
                    </div>

                    {formType === 'task' ? (
                        <form onSubmit={handleAddTask} className="space-y-4 mt-6">
                            <div>
                                <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-400">Task Title</label>
                                <input type="text" id="taskTitle" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white" />
                            </div>
                             <div>
                                <label htmlFor="taskDesc" className="block text-sm font-medium text-gray-400">Description (Optional)</label>
                                <textarea id="taskDesc" value={taskDesc} onChange={e => setTaskDesc(e.target.value)} rows={2} className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white" />
                            </div>
                             <div>
                                <label htmlFor="taskDueDate" className="block text-sm font-medium text-gray-400">Due Date</label>
                                <input type="date" id="taskDueDate" value={taskDueDate} onChange={e => setTaskDueDate(e.target.value)} required className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white" />
                            </div>
                            <div className="flex justify-end pt-4">
                                <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-indigo-700">Add Task</button>
                            </div>
                        </form>
                    ) : (
                         <form onSubmit={handleAddHabit} className="space-y-4 mt-6">
                            <div>
                                <label htmlFor="habitTitle" className="block text-sm font-medium text-gray-400">Habit Title</label>
                                <input type="text" id="habitTitle" value={habitTitle} onChange={e => setHabitTitle(e.target.value)} required className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white" />
                            </div>
                             <div>
                                <label htmlFor="habitFrequency" className="block text-sm font-medium text-gray-400">Frequency</label>
                                <select id="habitFrequency" value={habitFrequency} onChange={e => setHabitFrequency(e.target.value as 'daily' | 'weekly')} className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white">
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                </select>
                            </div>
                            <div className="flex justify-end pt-4">
                                <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-indigo-700">Add Habit</button>
                            </div>
                        </form>
                    )}
                </div>
            </Modal>
        </>
    );
};

const TrashIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;

export default Tasks;