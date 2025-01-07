import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSession, setActiveSession, setChatMode } from '../redux/chatSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    // Select the sessions and activeSessionId from the Redux store
    const sessions = useSelector((state) => state.chat.sessions);
    const activeSessionId = useSelector((state) => state.chat.activeSessionId);
    const dispatch = useDispatch(); // Dispatch actions to Redux store

    // Helper function to strip HTML tags from messages
    const stripHtmlTags = (html) => {
        return html.replace(/<\/?[^>]+(>|$)/g, ''); // Regular expression to remove HTML tags
    };

    // Function to handle creating a new chat session
    const handleNewChat = () => {
        dispatch(addSession()); // Dispatch addSession to create a new session
        dispatch(setChatMode(true)); // Dispatch setChatMode to enable chat mode
    };

    return (
        <div className="w-1/5 h-full p-4 flex flex-col justify-between">
            <div>
                {/* App header */}
                <h2
                    className="text-xl font-bold mb-4"
                    onClick={() => dispatch(setChatMode(false))} // Disable chat mode when clicked
                >
                    HackIT-Thunderbolt ⚡
                </h2>
                <h1 className="text-sm text-gray-400 mb-4">Today</h1>
                <ul className="space-y-2">
                    {/* Map through the sessions to display each one */}
                    {sessions.map((session) => {
                        // Get the latest message from the session, if available
                        const latestMessage = stripHtmlTags(
                            session.messages[session.messages.length - 1]?.text || ''
                        );
                        return (
                            <li
                                key={session.id}
                                className={`p-2 rounded w-full text-ellipsis text-sm cursor-pointer truncate ${activeSessionId === session.id
                                    ? 'bg-white bg-opacity-5 backdrop-blur-xl' // Highlight active session
                                    : 'hover:bg-white hover:bg-opacity-5 hover:backdrop-blur-xl' // Hover effect for other sessions
                                    }`}
                                onClick={() => {
                                    dispatch(setActiveSession(session.id)); // Set the clicked session as active
                                }}
                            >
                                {/* Display the latest message or "New Chat" if no messages */}
                                {latestMessage ? latestMessage : 'New Chat'}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                {/* Button to start a new chat */}
                <button
                    className="w-full mb-4 bg-indigo-700 hover:bg-indigo-800 text-white py-2 rounded"
                    onClick={handleNewChat} // Call handleNewChat when clicked
                >
                    <FontAwesomeIcon icon={faPlus} /> {/* Add plus icon */}
                    &nbsp;&nbsp;
                    New Chat
                </button>
            </div>
        </div>
    );
};

export default Sidebar;