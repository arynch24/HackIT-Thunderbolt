import React from 'react';
import ChatHistory from './components/ChatHistory';
import ChatMain from './components/ChatMain';

const App = () => {
  return (
    <div className="h-screen flex flex-col p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">Chat Application</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-4 h-full">
        <ChatHistory />
        <ChatMain />
      </div>
    </div>
  );
};

export default App;
