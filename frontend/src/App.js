import React, { useState } from 'react';
import './App.css';
import myImage from './images/sciComp.png';
import axios from 'axios';

// 1️⃣ Define API call function here, outside the component
const apicall = (username,setMessage) => {
  axios.get(`http://localhost:8000/secret?user=${username}`)
     .then(res => {setMessage(res.data)
     })
     .catch(err => {setMessage('error: '+err.message)

     });

};

function App() {
  const [username,setUsername] = useState(''); // input value
  const [message,setMessage] = useState(''); // server response
  return (
    <div className="App">
      <header className="App-header">
        //
        <p>Welcome to My first interactive React app!
        
          {/* Input for dynamic username */}
          <input
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />

          Edit <code>src/App.js</code> and save to reload.
        </p>

          {/* 1️⃣ Button added here */}
          <button onClick={() => apicall(username,setMessage)}>Fetch Secret Message</button>

           {/* Show backend response */}
           {message && <p>{message}</p>}

       <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
