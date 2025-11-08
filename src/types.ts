
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatarUrl: string;
  level: number;
  points: number;
  streak: number;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  points: number;
}

export interface Habit {
  id: string;
  userId: string;
  title: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  lastCompleted: string | null;
  points: number;
}

export interface StudyRoom {
  id: string;
  name: string;
  description: string;
  members: string[]; // array of user IDs
  memberCount: number;
  maxMembers: number;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
}
