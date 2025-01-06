import React from "react";
import { useSelector } from "react-redux";

const ChatHistory = () => {
    const history = useSelector((state) => state.chat.history);

    return (
        <div className="w-1/3 h-full bg-gray-900 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Chat History</h2>
            {history.length === 0 ? (
                <p className="text-gray-500">No chat history yet.</p>
            ) : (
                history.map((chat, index) => (
                    <div key={index} className="mb-4">
                        <p><strong>You:</strong> {chat.input}</p>
                        <p><strong>Langflow:</strong> {chat.response}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatHistory;
