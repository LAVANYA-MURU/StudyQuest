
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import type { Task, Habit, StudyRoom, User, ChatMessage } from '../types';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

interface DataContextType {
  tasks: Task[];
  habits: Habit[];
  studyRooms: StudyRoom[];
  users: User[]; // For admin
  loading: boolean;
  fetchData: () => void;
  addTask: (task: Omit<Task, 'id' | 'userId' | 'completed'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
  addHabit: (habit: Omit<Habit, 'id' | 'userId' | 'streak' | 'lastCompleted'>) => Promise<void>;
  updateHabit: (habit: Habit) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
  completeHabit: (habitId: string) => Promise<void>;
  createRoom: (roomData: Omit<StudyRoom, 'id' | 'members' | 'memberCount'>) => Promise<StudyRoom>;
  joinRoom: (roomId: string) => Promise<StudyRoom | null>;
  getRoomDetails: (roomId: string) => Promise<StudyRoom | null>;
  messages: { [roomId: string]: ChatMessage[] };
  fetchMessages: (roomId: string) => Promise<void>;
  postMessage: (roomId: string, text: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [habits, setHabits] = useState<Habit[]>([]);
    const [studyRooms, setStudyRooms] = useState<StudyRoom[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<{ [roomId: string]: ChatMessage[] }>({});
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const [fetchedTasks, fetchedHabits, fetchedRooms] = await Promise.all([
                api.getTasks(user.id),
                api.getHabits(user.id),
                api.getStudyRooms(),
            ]);
            setTasks(fetchedTasks);
            setHabits(fetchedHabits);
            setStudyRooms(fetchedRooms);

            if (user.role === 'admin') {
                const fetchedUsers = await api.getUsers();
                setUsers(fetchedUsers);
            }
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Task CRUD
    const addTask = async (taskData: Omit<Task, 'id' | 'userId'| 'completed'>) => {
        if (!user) return;
        const newTask = await api.addTask(user.id, taskData);
        setTasks(prev => [...prev, newTask]);
    };

    const updateTask = async (updatedTask: Task) => {
        if (!user) return;
        const task = await api.updateTask(updatedTask);
        setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    };

    const deleteTask = async (taskId: string) => {
        if (!user) return;
        await api.deleteTask(taskId);
        setTasks(prev => prev.filter(t => t.id !== taskId));
    };

    const toggleTask = async (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            const updatedTask = await api.updateTask({ ...task, completed: !task.completed });
            setTasks(prev => prev.map(t => t.id === taskId ? updatedTask : t));
        }
    };
    
    // Habit CRUD
    const addHabit = async (habitData: Omit<Habit, 'id' | 'userId' | 'streak' | 'lastCompleted'>) => {
        if(!user) return;
        const newHabit = await api.addHabit(user.id, habitData);
        setHabits(prev => [...prev, newHabit]);
    };

    const updateHabit = async (updatedHabit: Habit) => {
        if(!user) return;
        const habit = await api.updateHabit(updatedHabit);
        setHabits(prev => prev.map(h => h.id === habit.id ? habit : h));
    };

    const deleteHabit = async (habitId: string) => {
        if(!user) return;
        await api.deleteHabit(habitId);
        setHabits(prev => prev.filter(h => h.id !== habitId));
    };

    const completeHabit = async (habitId: string) => {
        const habit = habits.find(h => h.id === habitId);
        if (habit) {
            const updatedHabit = await api.completeHabit(habitId);
            setHabits(prev => prev.map(h => h.id === habitId ? updatedHabit : h));
        }
    };

    // Study Rooms
    const createRoom = async (roomData: Omit<StudyRoom, 'id' | 'members' | 'memberCount'>) => {
        const newRoom = await api.createStudyRoom(roomData);
        setStudyRooms(prev => [...prev, newRoom]);
        return newRoom;
    };

    const joinRoom = async (roomId: string) => {
        if (!user) return null;
        const joinedRoom = await api.joinStudyRoom(user.id, roomId);
        if (joinedRoom) {
            // Refetch to update member counts
            const fetchedRooms = await api.getStudyRooms();
            setStudyRooms(fetchedRooms);
        }
        return joinedRoom;
    };
    
    const getRoomDetails = useCallback(async (roomId: string) => {
        setLoading(true);
        try {
            return await api.getStudyRoomById(roomId);
        } catch (error) {
            console.error("Failed to fetch room details", error);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Chat
    const fetchMessages = useCallback(async (roomId: string) => {
        const fetchedMessages = await api.getMessages(roomId);
        setMessages(prev => ({ ...prev, [roomId]: fetchedMessages }));
    }, []);

    const postMessage = async (roomId: string, text: string) => {
        if (!user) return;
        const newMessage = await api.postMessage(roomId, user.id, text);
        setMessages(prev => ({
            ...prev,
            [roomId]: [...(prev[roomId] || []), newMessage]
        }));
    };

    return (
        <DataContext.Provider value={{ 
            tasks, habits, studyRooms, users, loading, fetchData,
            addTask, updateTask, deleteTask, toggleTask,
            addHabit, updateHabit, deleteHabit, completeHabit,
            joinRoom,
            createRoom,
            getRoomDetails,
            messages,
            fetchMessages,
            postMessage
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
