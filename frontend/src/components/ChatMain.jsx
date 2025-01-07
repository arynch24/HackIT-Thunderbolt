import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageToSession } from '../redux/chatSlice';
import { fetchLangflowResponse } from '../utils/langflow';
import { marked } from 'marked';

const ChatMain = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const activeSessionId = useSelector((state) => state.chat.activeSessionId);
    const activeSession = useSelector((state) =>
        state.chat.sessions.find((s) => s.id === activeSessionId)
    );
    const chatMode = useSelector((state) => state.chat.chatMode); // Get chatMode
    const dispatch = useDispatch();

    const handleSend = async () => {
        if (input.trim() && activeSessionId) {
            dispatch(
                addMessageToSession({
                    sessionId: activeSessionId,
                    message: { sender: 'user', text: input },
                })
            );

            setLoading(true);
            try {
                const response = await fetchLangflowResponse(input);

                // Convert Markdown response to HTML
                const html = marked.parse(response);

                // Replace newline characters with <br />
                const formattedText = html.replace(/\n/g, '<br />');

                dispatch(
                    addMessageToSession({
                        sessionId: activeSessionId,
                        message: { sender: 'langflow', text: formattedText },
                    })
                );
            } catch {
                dispatch(
                    addMessageToSession({
                        sessionId: activeSessionId,
                        message: { sender: 'langflow', text: 'Error fetching response.' },
                    })
                );
            }
            setLoading(false);
            setInput('');
        }
    };

    if (!chatMode) {
        // Render default content when chat mode is disabled
        return (
            <div className="w-2/3 h-full p-4 flex items-center justify-center">
                <h1 className="text-2xl text-gray-600">Welcome to the Chat App!</h1>
            </div>
        );
    }

    return (
        <div className="w-2/3 h-full p-4">
            <h1 className="text-2xl font-bold mb-4">Chat</h1>
            <div className="h-5/6 overflow-y-auto border p-4 mb-4 bg-gray-900 rounded-lg">
                {activeSession?.messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${message.sender === 'user' ? 'flex justify-end' : ''}`}
                    >
                        <div className={`p-2 rounded-md mb-2 sm:w-2/3 ${message.sender === 'user' ? 'bg-gray-700 text-right' : 'bg-gray-800'}`}>
                            <strong>{message.sender === 'user' ? 'You' : 'Langflow'}:</strong>
                            <p dangerouslySetInnerHTML={{ __html: message.text }} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex">
                <textarea
                    className="flex-grow p-2 border rounded bg-gray-900 text-white appearance-none resize-none min-h-[3rem] max-h-[12rem] overflow-y-auto"
                    placeholder="Type your message..."
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    className={`ml-2 px-8 py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                    onClick={handleSend}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </div>
        </div>
    );
};

export default ChatMain;
