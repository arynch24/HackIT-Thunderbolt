import { createSlice } from '@reduxjs/toolkit'; 

// Initial state for the chat slice
const initialState = {
  sessions: [], // Array of chat sessions, each with a unique id and messages
  activeSessionId: null, // ID of the currently active session
  chatMode: false, // Boolean to track if chat mode is enabled or not
};

const chatSlice = createSlice({
  name: 'chat', // Name of the slice
  initialState, // Initial state
  reducers: {
    // Action to add a new chat session
    addSession: (state) => {
      const newSession = { id: Date.now(), messages: [] }; // Create a new session with a unique id and empty messages
      state.sessions.push(newSession); // Add the new session to the sessions array
      state.activeSessionId = newSession.id; // Set the newly created session as active
    },

    // Action to set the active chat session
    setActiveSession: (state, action) => {
      state.activeSessionId = action.payload; // Set the active session id from the payload
    },

    // Action to add a new message to a specific chat session
    addMessageToSession: (state, action) => {
      const { sessionId, message } = action.payload; // Extract sessionId and message from the payload
      const session = state.sessions.find((s) => s.id === sessionId); // Find the session by id
      if (session) {
        session.messages.push(message); // If session exists, push the message into the messages array
      }
    },

    // Action to enable or disable chat mode
    setChatMode: (state, action) => {
      state.chatMode = action.payload; // Set the chat mode based on the payload (true or false)
    },
  },
});

// Export actions so they can be used elsewhere
export const { addSession, setActiveSession, addMessageToSession, setChatMode } = chatSlice.actions;

// Export the reducer to be used in the store
export default chatSlice.reducer;
