import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageToSession } from '../redux/chatSlice';
import { fetchLangflowResponse } from '../utils/langflow';
import { marked } from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Spline from '@splinetool/react-spline';


const ChatMain = ({ username }) => {

    // const[firstName, setFirstName] = useState('');

    // const handleClick = () => {
    //     // Prompt the user for their first name
    //     const firstName = window.prompt('Please enter your first name:');
    //     setFirstName(firstName);
    // };



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
            <div
                className='  flex w-4/5 h-[97%] items-center justify-between bg-black bg-opacity-20 backdrop-blur-xl rounded-lg mt-3 mr-3'
                style={{
                    boxShadow: '0px 0px 7px 0px #091c7d',
                }}
            >
                <div className=" h-full w-[90%] p-4 ml-4 flex items-center justify-center">
                    <div class=" rounded-lg p-8 max-w-lg text-left">
                        <h1 class="text-4xl font-bold text-blue-600 mb-4">Hi, {username || 'Guest'}! 👋</h1>
                        <p class="text-lg text-gray-200 mb-4">
                            Welcome to our <span class="font-semibold">AI-powered chatbot!</span> 🚀
                        </p>
                        <p class="text-gray-300  text-md mb-6">
                            This intelligent assistant is built to deliver precise and context-aware responses from a dedicated dataset, powered by <span class="font-semibold text-blue-500">Langflow</span>. Whether you need quick insights or detailed answers, it's here to help.
                        </p>
                        <p class="text-gray-400 text-md">
                            <span>Dive in and explore the future of data-driven conversations!💡</span>
                        </p>
                    </div>
                </div>
                <div className='w-[60%] h-full mr-8 flex justify-center mb-20'>
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
            className="w-4/5 h-[97%] p-4 flex flex-col justify-between items-center bg-black bg-opacity-20 backdrop-blur-xl rounded-lg mt-3 mr-3">
            <div className="h-[90%] w-[80%] overflow-auto hide-scrollbar p-4 mb-4 rounded-lg  ">
                {activeSession?.messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${message.sender === 'user' ? 'flex justify-end' : ''}`}
                    >
                        <div className={`p-2 rounded-lg mb-2 sm:w-2/3 ${message.sender === 'user' ? 'bg-white bg-opacity-5 backdrop-blur-xl text-right rounded-tr-none' : 'rounded-tl-none'}`}>
                            <strong>{message.sender === 'user' ? 'You' : 'Langflow'}:</strong>
                            <p dangerouslySetInnerHTML={{ __html: message.text }} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex w-[80%] items-center justify-between">
                <textarea
                    className="flex-grow p-2 rounded text-gray-200 bg-white bg-opacity-5 backdrop-blur-xl focus:outline-none focus:ring-1 focus:ring-blue-900 appearance-none resize-none min-h-[3rem] max-h-[12rem] overflow-y-auto"
                    placeholder="Type your message..."
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />

                <button
                    className={`ml-2 px-8 h-[90%] text-gray-200 rounded ${loading ? "bg-indigo-600" : "bg-indigo-600 hover:bg-indigo-800"}`}
                    onClick={handleSend}
                    disabled={loading}
                >
                    {loading ? (
                        <>Sending...</>
                    ) : (
                        <>
                            Send&nbsp;
                            <FontAwesomeIcon icon={faArrowRight} />
                        </>
                    )}
                </button>
            </div>

        </div>
    );
};

export default ChatMain;
