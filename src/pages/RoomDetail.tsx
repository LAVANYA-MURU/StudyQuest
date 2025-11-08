
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Spinner from '../components/ui/Spinner';
import ChatWindow from '../components/chat/ChatWindow';
import { StudyRoom } from '../types';

const RoomDetail: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();
    const { getRoomDetails, loading } = useData();
    const [room, setRoom] = useState<StudyRoom | null>(null);

    const fetchRoom = useCallback(async (id: string) => {
        const roomDetails = await getRoomDetails(id);
        if(roomDetails){
            setRoom(roomDetails);
        } else {
            navigate('/rooms'); // room not found
        }
    }, [getRoomDetails, navigate]);

    useEffect(() => {
        if (!roomId) {
            navigate('/rooms');
            return;
        }
        fetchRoom(roomId);
    }, [roomId, fetchRoom, navigate]);

    if (loading || !room) {
        return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2">
                 <ChatWindow roomId={room.id} />
            </div>
            <div className="bg-base-200 p-6 rounded-lg shadow-lg h-fit">
                <h2 className="text-2xl font-bold text-white">{room.name}</h2>
                <p className="text-gray-400 mt-2">{room.description}</p>
                 <div className="mt-4 text-sm text-gray-400">Join Code: <span className="font-mono bg-base-300 px-2 py-1 rounded select-all cursor-pointer" onClick={() => navigator.clipboard.writeText(room.id)}>{room.id}</span></div>
                
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Members ({room.memberCount}/{room.maxMembers})</h3>
                    <ul className="space-y-2">
                        {/* Mock members for display - in a real app, you'd fetch user details by ID */}
                        {room.members.map((memberId, index) => (
                             <li key={memberId} className="flex items-center space-x-3">
                                <img className="h-8 w-8 rounded-full object-cover" src={`https://picsum.photos/seed/${memberId}/200`} alt="Member avatar" />
                                <span className="text-gray-300">User_{memberId}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;
