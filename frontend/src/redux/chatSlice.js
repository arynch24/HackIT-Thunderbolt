import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessions: [], // Array of chat sessions, each with a unique id and messages
  activeSessionId: null, // ID of the currently active session
  chatMode: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addSession: (state) => {
      const newSession = { id: Date.now(), messages: [] };
      state.sessions.push(newSession);
      state.activeSessionId = newSession.id;
    },
    setActiveSession: (state, action) => {
      state.activeSessionId = action.payload;
    },
    addMessageToSession: (state, action) => {
      const { sessionId, message } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);
      if (session) {
        session.messages.push(message);
      }
    },
    setChatMode: (state, action) => {
      state.chatMode = action.payload;
    },
  },
});

export const { addSession, setActiveSession, addMessageToSession, setChatMode } = chatSlice.actions;

export default chatSlice.reducer;
