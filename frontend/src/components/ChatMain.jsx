import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageToSession } from '../redux/chatSlice';
import { fetchLangflowResponse } from '../utils/langflow';
import { marked } from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Spline from '@splinetool/react-spline';

const ChatMain = () => {
    const [firstName, setFirstName] = useState(''); // State to store user's first name
    const [hasPrompted, setHasPrompted] = useState(false); // State to track if prompt for name has been shown

    // Prompt the user for their first name on component mount
    useEffect(() => {
        if (!hasPrompted) {
            const name = window.prompt('Please enter your first name:');
            if (name) {
                setFirstName(name); // Set the user's first name if entered
            }
            setHasPrompted(true); // Mark that the prompt has been shown
        }
    }, [hasPrompted]);

    const [input, setInput] = useState(''); // State for the user's message input
    const [loading, setLoading] = useState(false); // State to track loading state for API request
    const activeSessionId = useSelector((state) => state.chat.activeSessionId); // Get the active session ID from Redux
    const activeSession = useSelector((state) =>
        state.chat.sessions.find((s) => s.id === activeSessionId) // Get the active session object from Redux
    );
    const chatMode = useSelector((state) => state.chat.chatMode); // Get chatMode state from Redux
    const dispatch = useDispatch(); // Get dispatch function from Redux

    // Reference to the container for auto-scrolling to the bottom
    const containerRef = useRef(null);

    // Scroll to the bottom when messages are updated
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [input]); // Trigger on input change

    // Handle sending the message
    const handleSend = async () => {
        if (input.trim() && activeSessionId) {
            // Dispatch user message to the active session
            dispatch(
                addMessageToSession({
                    sessionId: activeSessionId,
                    message: { sender: 'user', text: input },
                })
            );

            setLoading(true); // Set loading state to true while fetching response
            try {
                // Fetch response from Langflow API
                const response = await fetchLangflowResponse(input);

                // Convert Markdown response to HTML
                const html = marked.parse(response);

                // Replace newline characters with <br />
                const formattedText = html.replace(/\n/g, '<br />');

                // Dispatch Langflow response to the active session
                dispatch(
                    addMessageToSession({
                        sessionId: activeSessionId,
                        message: { sender: 'langflow', text: formattedText },
                    })
                );
            } catch {
                // If there's an error, send a default error message from Langflow
                dispatch(
                    addMessageToSession({
                        sessionId: activeSessionId,
                        message: { sender: 'langflow', text: 'Error fetching response.' },
                    })
                );
            }
            setLoading(false); // Set loading state to false once done
            setInput(''); // Clear the input field
        }
    };

    // Render default content when chat mode is disabled
    if (!chatMode) {
        return (
            <div
                className="flex w-4/5 h-[97%] items-center justify-between bg-black bg-opacity-20 backdrop-blur-xl rounded-lg mt-3 mr-3"
                style={{
                    boxShadow: '0px 0px 7px 0px #091c7d',
                }}
            >
                <div className="h-full w-[90%] p-4 ml-4 flex items-center justify-center">
                    <div className="rounded-lg p-8 max-w-lg text-left">
                        <h1 className="text-4xl font-bold text-blue-600 mb-4">Hi, {firstName || 'HackIT'}! 👋</h1>
                        <p className="text-lg text-gray-200 mb-4">
                            Welcome to our <span className="font-semibold">AI-powered chatbot!</span> 🚀
                        </p>
                        <p className="text-gray-300 text-md mb-6">
                            This intelligent assistant is built to deliver precise and context-aware responses from a dedicated dataset, powered by <span className="font-semibold text-blue-500">Langflow</span>. Whether you need quick insights or detailed answers, it's here to help.
                        </p>
                        <p className="text-gray-400 text-md">
                            <span>Dive in and explore the future of data-driven conversations!💡</span>
                        </p>
                    </div>
                </div>
                <div className="w-[60%] h-full mr-8 flex justify-center mb-20">
                    <Spline
                        style={{
                            width: '100%',
                            height: '100%',
                            transform: 'scale(0.7)',
                        }}
                        scene="https://prod.spline.design/bXgiiU7E4AYNQb5T/scene.splinecode" />
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                boxShadow: '0px 0px 7px 0px #091c7d',
            }}
            className="w-4/5 h-[97%] p-4 flex flex-col justify-between items-center bg-black bg-opacity-20 backdrop-blur-xl rounded-lg mt-3 mr-3"
        >
            {/* Chat interface */}
            <div ref={containerRef} className="h-[90%] w-[80%] overflow-y-auto hide-scrollbar p-4 mb-4">
                {activeSession?.messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'}`}
                    >
                        {message.sender !== 'user' && (
                            <span>
                                <img src="/chatbot.png" alt="Chatbot" className="h-7 mt-3 mr-2" />
                            </span>
                        )}

                        <div className={`p-2 rounded-lg mb-2 sm:w-2/3 ${message.sender === 'user' ? 'bg-white bg-opacity-5 backdrop-blur-xl text-right rounded-tr-none' : 'rounded-tl-none'}`}>
                            <strong>{message.sender === 'user' ? firstName || 'You' : 'HackIT '}</strong>
                            <p dangerouslySetInnerHTML={{ __html: message.text }} />
                        </div>
                        {message.sender === 'user' && (
                            <span>
                                <img src="/boy.png" alt="You" className="h-7 mt-0 ml-3" />
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex w-[80%] items-center justify-between">
                {/* Input field for user message */}
                <textarea
                    className="flex-grow p-2 rounded text-gray-200 bg-white bg-opacity-5 backdrop-blur-xl focus:outline-none focus:ring-1 focus:ring-blue-900 appearance-none resize-none min-h-[3rem] max-h-[12rem] overflow-y-auto"
                    placeholder="Type your message..."
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault(); // Prevent default Enter key action (line break)
                            handleSend(); // Call handleSend when Enter is pressed
                        }
                    }}
                />

                {/* Send button */}
                <button
                    className={`ml-2 px-8 h-[90%] text-gray-200 rounded ${loading ? "bg-indigo-600" : "bg-indigo-600 hover:bg-indigo-800"}`}
                    onClick={handleSend}
                    disabled={loading} // Disable button when loading
                >
                    {loading ? (
                        <>Sending...</>
                    ) : (
                        <>
                            Send&nbsp;
                            <FontAwesomeIcon icon={faArrowRight} /> {/* Right arrow icon */}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ChatMain;