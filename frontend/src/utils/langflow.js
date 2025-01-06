export const fetchLangflowResponse = async (inputValue) => {
    // Simulating a mock API response
    const endpoint = 'https://jsonplaceholder.typicode.com/posts'; 
  
    const headers = {
      "Content-Type": "application/json",
    };
  
    const body = {
      input_value: inputValue,
      input_type: "chat",
      output_type: "chat",
      tweaks: {}, // Add any needed tweaks here
    };
  
    try {
      // Making the fetch call to a mock API (replace with actual endpoint if needed)
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
  
      // Simulating response for the example:
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseData)}`);
      }
  
      // Return some mock output
      return `Received from mock API: ${responseData[0]?.title || "No response"}`; // Adjust based on your response structure
    } catch (error) {
      console.error("Error fetching response:", error.message);
      throw error;
    }
  };
  