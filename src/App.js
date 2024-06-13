import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import BirthDetailsForm from './components/BirthDetailsForm';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/hello").then(res => res.json()).then(data => {
      setMessage(data.message);
    });
  }, []);

  return (
    <Container fluid className="App">
      {/* move into own container if it gets more complex */}
      <header>  
        {/* <h1>The message is {message}</h1> */}
        <h1 className="title">ASTERIA</h1>
      </header>
      <BirthDetailsForm></BirthDetailsForm>
    </Container>
  );
}

export default App;
