import { ApiError } from "./ApiError.js";

async function fetchLangflowResponse(inputValue) {
    
    const endpoint = `${process.env.BASEURL}/lf/${process.env.LANGFLOWID}/api/v1/run/${process.env.FLOWID}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.APPLICATION_TOKEN}`
    };
    const body = {
        input_value: inputValue,
        input_type: "chat",
        output_type: "chat",
        tweaks: {
            "ChatInput-iEo9Z": {},
            "Agent-kpv3W": {},
            "AstraDBToolComponent-rqWoP": {},
            "ChatOutput-Wl5Vn": {},
            "Prompt-g8a7d": {}
        }
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new ApiError(response.status, `${response.status} ${response.statusText} - ${JSON.stringify(responseData)}`);
        }

        // Extract the output
        const outputMessage = responseData?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message?.text;
        if (!outputMessage) {
            throw new ApiError(401, "Couldn't retrieve response from langflow");
        }

        return outputMessage;
    } catch (error) {
        console.error("Error fetching response:", error.message);
        throw error;
    }
}

export {
    fetchLangflowResponse
};