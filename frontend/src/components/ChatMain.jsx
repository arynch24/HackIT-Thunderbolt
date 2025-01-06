import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/chatSlice";
import { fetchLangflowResponse } from "../utils/langflow";

const ChatMain = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSend = async () => {
        if (!input.trim()) return;

        setLoading(true);
        try {
            const response = await fetchLangflowResponse(input);
            dispatch(addMessage({ input, response }));
            setInput("");
        } catch (error) {
            alert("Error fetching response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-2/3 h-full p-4">
            <h1 className="text-2xl font-bold mb-4">Langflow Chat</h1>
            <div className="h-5/6 overflow-y-auto border p-4 mb-4">
                {/* Dynamic responses could also be shown here if needed */}
            </div>
            <div className="flex">
                <textarea
                    className="flex-grow p-2 border rounded bg-gray-900"
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
