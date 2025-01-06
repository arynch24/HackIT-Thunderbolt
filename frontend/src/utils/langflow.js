export const fetchLangflowResponse = async (inputValue) => {
  const endpoint = 'https://hackit.up.railway.app/api/v1/getResponse'; 
  
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    msg: inputValue
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    // Parse the JSON response
    const responseData = await response.json();

    if (!responseData?.success) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}\nResponse Body: ${JSON.stringify(responseData)}`);
    }

    // Log the response for debugging
    console.log("API Response:", responseData);
    console.log("Msg:", responseData?.data);

    return responseData?.data || "No response"; 
  } catch (error) {
    console.error("Error fetching response:", error.message);
    throw error;
  }
};
