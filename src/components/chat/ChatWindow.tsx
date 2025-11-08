
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface ChatWindowProps {
  roomId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ roomId }) => {
  const { user } = useAuth();
  const { messages, fetchMessages, postMessage } = useData();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const roomMessages = messages[roomId] || [];

  useEffect(() => {
    fetchMessages(roomId);
  }, [roomId, fetchMessages]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user) return;
    postMessage(roomId, newMessage);
    setNewMessage('');
  };

  return (
    <div className="bg-base-200 p-4 rounded-lg shadow-lg flex flex-col h-[calc(100vh-220px)]">
      <h2 className="text-xl font-semibold text-white mb-4 border-b border-base-300 pb-2">Room Chat</h2>
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {roomMessages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.userId === user?.id ? 'flex-row-reverse' : ''}`}>
            <img src={msg.userAvatar} alt={msg.userName} className="w-8 h-8 rounded-full" />
            <div className={`p-3 rounded-lg max-w-xs md:max-w-md ${msg.userId === user?.id ? 'bg-primary text-white' : 'bg-base-300 text-content'}`}>
              <p className="text-sm font-semibold">{msg.userId !== user?.id && msg.userName}</p>
              <p className="text-sm break-words">{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-base-300 border-gray-600 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary text-white"
        />
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 3.105a.75.75 0 0 1 .884-.069l14 8a.75.75 0 0 1 0 1.328l-14 8A.75.75 0 0 1 3 20.25V4.5A.75.75 0 0 1 3.105 3.105Z" />
            </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
