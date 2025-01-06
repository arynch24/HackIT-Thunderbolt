import React from 'react';
import ChatMain from './components/ChatMain';

const App = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col items-center p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center">Chat Application</h1>
      <ChatMain />
    </div>
  );
};

export default App;
