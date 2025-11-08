
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import StudyRooms from './pages/StudyRooms';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/layout/Layout';
import RoomDetail from './pages/RoomDetail';

const PrivateRoute: React.FC<{ children: React.ReactElement, adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const AppRoutes: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

            <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="rooms" element={<StudyRooms />} />
                <Route path="rooms/:roomId" element={<RoomDetail />} />
                <Route path="profile" element={<Profile />} />
                <Route path="admin" element={
                    <PrivateRoute adminOnly={true}>
                        <AdminDashboard />
                    </PrivateRoute>
                } />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
        <DataProvider>
            <HashRouter>
                <AppRoutes />
            </HashRouter>
        </DataProvider>
    </AuthProvider>
  );
}

export default App;
