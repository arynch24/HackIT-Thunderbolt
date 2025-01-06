import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/chatSlice';
import { fetchLangflowResponse } from '../utils/langflow';
import { marked } from 'marked';

const ChatMain = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useSelector((state) => state.chat.history);

    const handleSend = async () => {
        if (input.trim()) {
            // Dispatch user message to history
            dispatch(addMessage({ sender: 'user', text: input }));
            setLoading(true);

            try {
                const response = await fetchLangflowResponse(input);

                // Convert Markdown response to HTML
                const html = marked.parse(response);

                // Replace newline characters with <br />
                const formattedText = html.replace(/\n/g, '<br />');

                // Dispatch the formatted response
                dispatch(addMessage({ sender: 'langflow', text: formattedText }));
            } catch (error) {
                dispatch(addMessage({ sender: 'langflow', text: 'Error fetching response.' }));
            }

            setLoading(false);
            setInput('');
        }
    };

    return (
        <div className="w-3/4 h-full p-4">
            <h1 className="text-2xl font-bold mb-4">Langflow Chat</h1>

            <div className="h-[75%] overflow-y-auto border p-4 mb-4 bg-gray-900 rounded-lg">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {history.map((message, index) => (
                        <div key={index} className={`${message.sender === 'user' ? 'flex justify-end' : ''}`}>
                            <div className={`p-2 rounded-md sm:w-2/3 ${message.sender === 'user' ? 'bg-gray-700 text-right' : 'bg-gray-800'}`}>
                                <p><strong>{message.sender === 'user' ? 'You' : 'Langflow'}:</strong></p>
                                {/* Render HTML with dangerouslySetInnerHTML */}
                                <p dangerouslySetInnerHTML={{ __html: message.text }} />
                            </div>
                        </div>
                    ))}
                </div>
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
