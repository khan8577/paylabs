import React, { useEffect, useState } from 'react';
import { getMessage } from './api';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    getMessage().then(res => setMessage(res.data.message));
  }, []);

  return (
    <div>
      <h1>Hello PAYLABS</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
