import React, { useState } from 'react';
import { Await, useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submit = async(event) => {
    event.preventDefault();
    const logInfo = {id, password};

    try {
      const response = await fetch("http://localhost:8093/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logInfo),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token)

        alert("로그인 성공");
        navigate("/");
      }


      if (!response.ok) {
        throw new Error('로그인 실패. 다시 시도하세요.');
      }

      const data = await response.json();
      console.log("Server Response", data);

      // Redirect URL
  
    } catch (error) {
      console.log("알 수 없는 이유로 로그인 실패.", error);
      // 에러 메세지 출력      
    }
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