import React, { useState } from 'react';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const submit = (event) => {
    event.preventDefault();
    console.log('Id:', id, 'Password:', password);
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h2>Login</h2>
        <div>
          <label>Id:</label>
          <input
            type="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;