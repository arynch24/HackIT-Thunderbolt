import React from 'react';
import Sidebar from './components/Sidebar';
import ChatMain from './components/ChatMain';

const App = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <ChatMain />
        </div>
    );
};

export default App;
