import React, { useState } from "react";
import {fetchLangflowResponse} from "../utils/langflow"

const LangflowComponent = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const handleFetchResponse = async () => {
        try {
            const response = await fetchLangflowResponse(input);
            setOutput(response);
        } catch (error) {
            setOutput("Error fetching response. Please try again.");
        }
    };

    return (
        <div class="flex min-h-screen w-full items-center  justify-center">

            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Langflow Chat</h1>
                <div className="flex justify-center gap-2">
                    <input
                        className="w-[75%] bg-blue-950 p-2 border rounded"
                        placeholder="Enter your message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></input>
                    <button
                        className="w-[25%] bg-blue-950 p-2 border rounded"
                        onClick={handleFetchResponse}
                    >
                        Send
                    </button>
                </div>
                {output && (
                    <div className="mt-4 p-4 border rounded bg-blue-500">
                        <h2 className="text-lg font-semibold">Response:</h2>
                        <p>{output}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LangflowComponent;
