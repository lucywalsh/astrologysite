import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/hello").then(res => res.json()).then(data => {
      setMessage(data.message);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        The message is {message}
      </header>
    </div>
  );
}

export default App;
