
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import { useNavigate } from 'react-router-dom';

const StudyRooms: React.FC = () => {
    const { studyRooms, joinRoom, createRoom, loading } = useData();
    const navigate = useNavigate();

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isJoinModalOpen, setJoinModalOpen] = useState(false);
    
    // State for create room form
    const [roomName, setRoomName] = useState('');
    const [roomDesc, setRoomDesc] = useState('');
    const [maxMembers, setMaxMembers] = useState(10);
    
    // State for join room form
    const [joinCode, setJoinCode] = useState('');
    const [error, setError] = useState('');

    const handleCreateRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const newRoom = await createRoom({ name: roomName, description: roomDesc, maxMembers });
            setCreateModalOpen(false);
            setRoomName('');
            setRoomDesc('');
            navigate(`/rooms/${newRoom.id}`);
        } catch (err) {
            setError('Failed to create room.');
        }
    };

    const handleJoinWithCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const joinedRoom = await joinRoom(joinCode);
            if (joinedRoom) {
                setJoinModalOpen(false);
                setJoinCode('');
                navigate(`/rooms/${joinedRoom.id}`);
            } else {
                setError('Could not find or join room with that code.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to join room.');
        }
    };

    const handleJoinCard = async (roomId: string) => {
        try {
            const room = await joinRoom(roomId);
            if(room) {
                navigate(`/rooms/${roomId}`);
            }
        } catch (err: any) {
            alert(err.message || 'Could not join room.');
        }
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-3xl font-bold text-white">Study Rooms</h1>
                    <div className="flex gap-4">
                        <button onClick={() => { setJoinModalOpen(true); setError(''); }} className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-green-600">
                            Join with Code
                        </button>
                        <button onClick={() => { setCreateModalOpen(true); setError(''); }} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700">
                            Create Room
                        </button>
                    </div>
                </div>

                {loading ? <div className="flex justify-center"><Spinner /></div> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {studyRooms.map(room => (
                            <div key={room.id} className="bg-base-200 p-6 rounded-lg shadow-lg flex flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">{room.name}</h2>
                                    <p className="text-gray-400 mt-2 text-sm">{room.description}</p>
                                </div>
                                <div className="flex justify-between items-center mt-6">
                                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                                        <UsersIcon className="w-5 h-5"/>
                                        <span>{room.memberCount} / {room.maxMembers}</span>
                                    </div>
                                    <button onClick={() => handleJoinCard(room.id)} className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={room.memberCount >= room.maxMembers && !room.members.includes('1')}>
                                        Enter
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Create Room Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} title="Create a New Study Room">
                <form onSubmit={handleCreateRoom} className="space-y-4">
                    <div>
                        <label htmlFor="roomName" className="block text-sm font-medium text-gray-400">Room Name</label>
                        <input type="text" id="roomName" value={roomName} onChange={e => setRoomName(e.target.value)} required className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white" />
                    </div>
                     <div>
                        <label htmlFor="roomDesc" className="block text-sm font-medium text-gray-400">Description</label>
                        <textarea id="roomDesc" value={roomDesc} onChange={e => setRoomDesc(e.target.value)} required rows={3} className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white" />
                    </div>
                     <div>
                        <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-400">Max Members</label>
                        <input type="number" id="maxMembers" value={maxMembers} onChange={e => setMaxMembers(parseInt(e.target.value))} min="2" max="50" required className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white" />
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-indigo-700">Create Room</button>
                    </div>
                </form>
            </Modal>

            {/* Join Room Modal */}
            <Modal isOpen={isJoinModalOpen} onClose={() => setJoinModalOpen(false)} title="Join with Code">
                 <form onSubmit={handleJoinWithCode} className="space-y-4">
                    <div>
                        <label htmlFor="joinCode" className="block text-sm font-medium text-gray-400">Enter Join Code</label>
                        <input type="text" id="joinCode" value={joinCode} onChange={e => setJoinCode(e.target.value)} required className="mt-1 block w-full bg-base-300 border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary text-white" />
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    <div className="flex justify-end pt-4">
                        <button type="submit" className="px-5 py-2.5 bg-secondary text-white rounded-lg hover:bg-green-600">Join Room</button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

const UsersIcon: React.FC<{ className: string }> = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-2.308M15 19.128c-3.032 0-5.5-2.032-5.5-4.512 0-2.48 2.468-4.512 5.5-4.512 3.032 0 5.5 2.032 5.5 4.512 0 2.48-2.468 4.512-5.5 4.512Zm-2.25-4.512c0-2.48 2.239-4.512 5-4.512s5 2.032 5 4.512c0 2.48-2.239 4.512-5 4.512s-5-2.032-5-4.512Zm-9-3.75h.008v.008H3.75v-.008Zm0 0h.008v.008H3.75v-.008Zm0 0h.008v.008H3.75v-.008Zm0 0h.008v.008H3.75v-.008Z" /></svg>;

export default StudyRooms;
