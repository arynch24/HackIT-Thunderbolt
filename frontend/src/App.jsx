import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatMain from './components/ChatMain';

const App = () => {

//   const [firstName, setFirstName] = useState('');
//   const [hasPrompted, setHasPrompted] = useState(false);

//   useEffect(() => {
//     if (!hasPrompted) {  
//         const name = window.prompt('Please enter your first name:');
//         if (name) {
//             setFirstName(name);
//         }
//         setHasPrompted(true); 
//     }
// }, [hasPrompted]); 

  return (
    <div>
      <div style={{
        backgroundImage: 'linear-gradient(to right bottom, #0e1031, #0b102c, #090f27, #070e21, #060d1b, #050c1c, #050c1d, #040b1e, #050b25, #070b2c, #0b0a32, #110837)',
      }} className="flex h-screen bg-black text-gray-300">
        <Sidebar />
        <ChatMain/>
        {/* <ChatMain username={firstName}/> */}
      </div>
    </div>
  );
};

export default App;
