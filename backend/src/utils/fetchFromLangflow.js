async function fetchLangflowResponse(inputValue) {
    const baseURL = 'https://api.langflow.astra.datastax.com';
    const flowId = 'c0121d0a-69f8-4808-b10f-e0c55f30cf23';
    const langflowId = '0a91d8f3-bfe2-4bfb-8d23-7a3966ba7691';
    const applicationToken = 'AstraCS:xuiMtuKGfufpnRxivMrZaUtY:7447553dfd55ad1b432c5b5b23bcf443c1c41bd5b071a73220de452b04054dc9';

    // const endpoint = `${baseURL}/lf/${langflowId}/api/v1/run/${flowId}`;
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
            console.log("Some error");
            throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseData)}`);
        }

        // Extract the output
        const outputMessage = responseData?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message?.text;
        return outputMessage;
    } catch (error) {
        console.error("Error fetching response:", error.message);
        throw error;
    }
}

export {
    fetchLangflowResponse
};