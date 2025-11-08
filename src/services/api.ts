
import type { User, Task, Habit, StudyRoom, ChatMessage } from '../types';
import { POINTS_PER_TASK, POINTS_PER_HABIT } from '../constants';

// --- MOCK DATABASE ---
let mockUsers: User[] = [
  { id: '1', name: 'Alice Student', email: 'user@test.com', role: 'user', avatarUrl: 'https://picsum.photos/seed/alice/200', level: 1, points: 50, streak: 3 },
  { id: '2', name: 'Bob Admin', email: 'admin@test.com', role: 'admin', avatarUrl: 'https://picsum.photos/seed/bob/200', level: 99, points: 9999, streak: 10 },
];

let mockTasks: Task[] = [
  { id: 't1', userId: '1', title: 'Finish Math Homework', description: 'Chapter 5, problems 1-10', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), completed: false, points: 10 },
  { id: 't2', userId: '1', title: 'Read History Chapter 3', description: 'Pages 50-75', dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), completed: true, points: 10 },
];

let mockHabits: Habit[] = [
  { id: 'h1', userId: '1', title: 'Review flashcards', frequency: 'daily', streak: 5, lastCompleted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), points: 5 },
  { id: 'h2', userId: '1', title: 'Organize notes', frequency: 'weekly', streak: 2, lastCompleted: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), points: 15 },
];

let mockStudyRooms: StudyRoom[] = [
  { id: 'r1', name: 'Organic Chemistry Help', description: 'Group for anyone struggling with O-Chem. All welcome!', members: ['1'], memberCount: 1, maxMembers: 10 },
  { id: 'r2', name: 'Finals Cram Session', description: 'Let\'s power through the final week together.', members: [], memberCount: 0, maxMembers: 20 },
];

let mockMessages: { [roomId: string]: ChatMessage[] } = {
  'r1': [
    { id: 'm1', roomId: 'r1', userId: '1', userName: 'Alice Student', userAvatar: 'https://picsum.photos/seed/alice/200', text: 'Hey everyone! Ready to study?', timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
    { id: 'm2', roomId: 'r1', userId: '2', userName: 'Bob Admin', userAvatar: 'https://picsum.photos/seed/bob/200', text: 'Let\'s do it!', timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString() },
  ]
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- AUTH ---
export const mockLogin = async (email: string, pass: string): Promise<User> => {
  await delay(500);
  const user = mockUsers.find(u => u.email === email);
  if (user && pass === 'password') { // Simple password check for demo
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    return user;
  }
  throw new Error('Invalid credentials');
};

export const mockLogout = () => {
    localStorage.removeItem('loggedInUser');
};

// --- USERS ---
export const getUsers = async (): Promise<User[]> => {
    await delay(300);
    return mockUsers;
}

// --- TASKS ---
export const getTasks = async (userId: string): Promise<Task[]> => {
  await delay(500);
  return mockTasks.filter(t => t.userId === userId);
};

export const addTask = async (userId: string, taskData: Omit<Task, 'id' | 'userId' | 'completed'>): Promise<Task> => {
    await delay(300);
    const newTask: Task = {
        ...taskData,
        id: `t${Date.now()}`,
        userId,
        completed: false,
    };
    mockTasks.push(newTask);
    return newTask;
};

export const updateTask = async (updatedTask: Task): Promise<Task> => {
    await delay(200);
    const index = mockTasks.findIndex(t => t.id === updatedTask.id);
    if (index > -1) {
        mockTasks[index] = updatedTask;
        return updatedTask;
    }
    throw new Error('Task not found');
};

export const deleteTask = async (taskId: string): Promise<void> => {
    await delay(300);
    mockTasks = mockTasks.filter(t => t.id !== taskId);
};

// --- HABITS ---
export const getHabits = async (userId: string): Promise<Habit[]> => {
    await delay(500);
    return mockHabits.filter(h => h.userId === userId);
};

export const addHabit = async (userId: string, habitData: Omit<Habit, 'id' | 'userId' | 'streak' | 'lastCompleted'>): Promise<Habit> => {
    await delay(300);
    const newHabit: Habit = {
        ...habitData,
        id: `h${Date.now()}`,
        userId,
        streak: 0,
        lastCompleted: null,
    };
    mockHabits.push(newHabit);
    return newHabit;
};

export const updateHabit = async (updatedHabit: Habit): Promise<Habit> => {
    await delay(200);
    const index = mockHabits.findIndex(h => h.id === updatedHabit.id);
    if (index > -1) {
        mockHabits[index] = updatedHabit;
        return updatedHabit;
    }
    throw new Error('Habit not found');
};

export const deleteHabit = async (habitId: string): Promise<void> => {
    await delay(300);
    mockHabits = mockHabits.filter(h => h.id !== habitId);
};

export const completeHabit = async (habitId: string): Promise<Habit> => {
    await delay(300);
    const habit = mockHabits.find(h => h.id === habitId);
    if (habit) {
        habit.streak += 1;
        habit.lastCompleted = new Date().toISOString();
        // In a real app, you'd update the user's points here
        return habit;
    }
    throw new Error('Habit not found');
};


// --- STUDY ROOMS ---
export const getStudyRooms = async (): Promise<StudyRoom[]> => {
    await delay(600);
    return mockStudyRooms;
};

export const getStudyRoomById = async (roomId: string): Promise<StudyRoom | null> => {
    await delay(200);
    const room = mockStudyRooms.find(r => r.id === roomId);
    return room || null;
}

export const createStudyRoom = async (roomData: Omit<StudyRoom, 'id' | 'members' | 'memberCount'>): Promise<StudyRoom> => {
    await delay(400);
    const newRoom: StudyRoom = {
        ...roomData,
        id: `r${Date.now()}`,
        members: [],
        memberCount: 0,
    };
    mockStudyRooms.push(newRoom);
    return newRoom;
}

export const joinStudyRoom = async (userId: string, roomId: string): Promise<StudyRoom | null> => {
    await delay(400);
    const room = mockStudyRooms.find(r => r.id === roomId);
    if (room && !room.members.includes(userId) && room.memberCount < room.maxMembers) {
        room.members.push(userId);
        room.memberCount = room.members.length;
        return room;
    } else if (!room) {
        throw new Error('Room not found with that code');
    } else if (room.members.includes(userId)) {
        return room; // Already a member, success
    } else {
        throw new Error('Room is full');
    }
};

// --- CHAT ---
export const getMessages = async (roomId: string): Promise<ChatMessage[]> => {
    await delay(300);
    return mockMessages[roomId] || [];
};

export const postMessage = async (roomId: string, userId: string, text: string): Promise<ChatMessage> => {
    await delay(100);
    const user = mockUsers.find(u => u.id === userId);
    if(!user) throw new Error('User not found');

    const newMessage: ChatMessage = {
        id: `m${Date.now()}`,
        roomId,
        userId,
        userName: user.name,
        userAvatar: user.avatarUrl,
        text,
        timestamp: new Date().toISOString()
    };
    if (!mockMessages[roomId]) {
        mockMessages[roomId] = [];
    }
    mockMessages[roomId].push(newMessage);
    return newMessage;
};
