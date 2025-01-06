import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history: [], // Stores chat history
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.history.push(action.payload);
        },
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
