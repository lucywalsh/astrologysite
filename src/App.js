import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import BirthDetailsForm from './components/BirthDetailsForm';
import BirthChart from './components/BirthChart';

function App() {
  const [message, setMessage] = useState("");
  {/* add state for birth chart results from API */}
  const [results, setResults] = useState(null);
  console.log('Results=', results);

  useEffect(() => {
    fetch("/hello").then(res => res.json()).then(data => {
      setMessage(data.message);
    });
  }, []);

  return (
    <Container fluid className="App">
      <header>  
        {/* <h1>The message is {message}</h1> */}
        <h1 className="title">ASTERIA</h1>
      </header>
      <BirthDetailsForm onFormSubmit={setResults}></BirthDetailsForm>
      {results && <BirthChart {...results}></BirthChart>}
    </Container>
  );
}

export default App;
