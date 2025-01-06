import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ChatHistory from "./components/ChatHistory";
import ChatMain from "./components/ChatMain";

const App = () => {
    return (
        <Provider store={store}>
            <div className="flex h-screen">
                <ChatHistory />
                <ChatMain />
            </div>
        </Provider>
    );
};

export default App;
