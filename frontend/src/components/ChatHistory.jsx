import React from 'react';
import { useSelector } from 'react-redux';

const ChatHistory = () => {
    const history = useSelector((state) => state.chat.history);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <h2 className="text-xl font-bold mb-4">Chat History</h2>
            {history.map((message, index) => (
                <div key={index} className={`p-2 rounded-md ${message.sender === 'user' ? 'bg-gray-700' : 'bg-gray-800'}`}>
                    <p><strong>{message.sender === 'user' ? 'You' : 'Langflow'}:</strong></p>
                    <p>{message.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ChatHistory;