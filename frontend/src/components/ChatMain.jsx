import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/chatSlice';
import { fetchLangflowResponse } from '../utils/langflow'; // Assuming it's the latest fetch function

const ChatMain = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSend = async () => {
        if (input.trim()) {
            // Dispatch user message to history
            dispatch(addMessage({ sender: 'user', text: input }));

            setLoading(true);

            try {
                // Call the API to get the Langflow response (or any API you need)
                const response = await fetchLangflowResponse(input);

                // Dispatch the Langflow response to history
                dispatch(addMessage({ sender: 'langflow', text: response }));
            } catch (error) {
                dispatch(addMessage({ sender: 'langflow', text: 'Error fetching response.' }));
            }

            setLoading(false);
            setInput('');
        }
    };

    return (
        <div className="w-2/3 h-full p-4">
            <h1 className="text-2xl font-bold mb-4">Langflow Chat</h1>
            <div className="h-5/6 overflow-y-auto border p-4 mb-4 bg-gray-900 rounded-lg">
            </div>
            <div className="flex">
                <textarea
                    className="flex-grow p-2 border rounded bg-gray-900 text-white"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className={`ml-2 px-4 py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
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
