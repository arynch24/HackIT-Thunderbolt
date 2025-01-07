import React from 'react';
import Sidebar from './components/Sidebar';
import ChatMain from './components/ChatMain';

const App = () => {
  return (
    <div>
      <div style={{
        backgroundImage: 'linear-gradient(to right bottom, #0e1031, #0b102c, #090f27, #070e21, #060d1b, #050c1c, #050c1d, #040b1e, #050b25, #070b2c, #0b0a32, #110837)',
      }} className="flex h-screen bg-black text-gray-300">
        <Sidebar />
        <ChatMain />
      </div>
    </div>
  );
};

export default App;
