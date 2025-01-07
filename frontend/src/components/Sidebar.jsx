import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSession, setActiveSession, setChatMode } from '../redux/chatSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const sessions = useSelector((state) => state.chat.sessions);
    const activeSessionId = useSelector((state) => state.chat.activeSessionId);
    const dispatch = useDispatch();

    const handleNewChat = () => {
        dispatch(addSession());
        dispatch(setChatMode(true)); // Enable chat mode
    };

    return (
        <div className="w-1/5 h-full p-4 flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold mb-4">HackIT-Thunderbolt ⚡</h2>
                <h1 className="text-lg text-gray-400 mb-4">Today</h1>
                <ul className="space-y-2">
                    {sessions.map((session) => (
                        <li
                            key={session.id}
                            className={`p-2 rounded text-ellipsis text-md cursor-pointer ${activeSessionId === session.id
                                ? 'bg-white bg-opacity-5 backdrop-blur-xl'
                                : 'hover:bg-white hover:bg-opacity-5 hover:backdrop-blur-xl'
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
            <div>
                <button
                    className="w-full mb-4 bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded"
                    onClick={handleNewChat}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    &nbsp;&nbsp;
                    New Chat
                </button>

            </div>

        </div>
    );
};

export default Sidebar;
