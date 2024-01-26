import React, { useState } from 'react';
import { Await, useNavigate } from 'react-router-dom';
import "../../pages/css/user.css"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submit = async(event) => {
    event.preventDefault();
    const logInfo = { username, password };

    try {
      const response = await fetch("http://localhost:8093/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logInfo),
      });

      if (!response.ok) {
        throw new Error('로그인 실패. 다시 시도하세요.');
      }  

      const data = await response.json();
      localStorage.setItem('token', data.token)

      alert("로그인 성공");
      navigate("/");  


    } catch (error) {
      console.log("알 수 없는 이유로 로그인 실패.", error);
      // 에러 메세지 출력      
    }
  };

  return (
    <div id='loginWrap'>

      <div id='formBorder'>

        <form onSubmit={submit} name="frm">

          <br></br>

          <h2 id="login">Mafia13</h2>

          <div>
            <label class="logInfo" id='id'>  아이디  : </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div>
            <label class="logInfo" id='password'>비밀번호 : </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" id='loginBtn'> 로그인 </button>

        </form>

      </div>

    </div>
  );
}

export default Login;