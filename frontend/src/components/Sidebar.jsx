import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSession, setActiveSession, setChatMode } from '../redux/chatSlice';

const Sidebar = () => {
    const sessions = useSelector((state) => state.chat.sessions);
    const activeSessionId = useSelector((state) => state.chat.activeSessionId);
    const dispatch = useDispatch();

    const handleNewChat = () => {
        dispatch(addSession());
        dispatch(setChatMode(true)); // Enable chat mode
    };

    return (
        <div className="w-1/3 h-full bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-4">Chat Sessions</h2>
            <button
                className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                onClick={handleNewChat}
            >
                New Chat
            </button>
            <ul className="space-y-2">
                {sessions.map((session) => (
                    <li
                        key={session.id}
                        className={`p-2 rounded cursor-pointer ${activeSessionId === session.id
                            ? 'bg-blue-500'
                            : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                        onClick={() => {
                            dispatch(setActiveSession(session.id));
                        }}
                    >
                        Chat {session.id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
