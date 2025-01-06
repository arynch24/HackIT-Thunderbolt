export async function fetchLangflowResponse(inputValue) {
    const baseURL = 'https://api.langflow.astra.datastax.com';
    const flowId = 'c0121d0a-69f8-4808-b10f-e0c55f30cf23';
    const langflowId = '0a91d8f3-bfe2-4bfb-8d23-7a3966ba7691';
    const applicationToken = 'AstraCS:JygFWBtgmTjpZKWnPPytpdfG:b1edc43fe23542deeeff3bd2d8b9ca0a98dfa8a74f774526eaa11da8ba15d572'; // Replace with your token

    const endpoint = `${baseURL}/lf/${langflowId}/api/v1/run/${flowId}`;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${applicationToken}`,
    };
    const body = {
        input_value: inputValue,
        input_type: "chat",
        output_type: "chat",
        tweaks: {},
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseData)}`);
        }

        const outputMessage = responseData?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message?.text;
        return outputMessage;
    } catch (error) {
        console.error("Error fetching response:", error.message);
        throw error;
    }
}
