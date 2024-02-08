import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Await, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import "../../pages/css/user.css"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const submit = async (event) => {
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

       // Flux 패턴을 사용하여 데이터를 전달
      dispatch({ type: "LOGIN_SUCCESS", userId: data.user.id });

      alert("로그인 성공");
      navigate("/lobby");  
    

    } catch (error) {
      console.log("존재하지 않는 계정.", error);
      alert("존재하지 않는 ID 입니다.")    
    }
  };

  const StyledIcon = styled(FontAwesomeIcon)`
    color: red;
    font-size: 24px;
    margin-right: 10px;
  `;




  return (
    <div id='loginWrap'>

        <form onSubmit={submit} name="frm">

          <br></br>

          <h2 id="login"> Mafia13</h2>

          <div>
            <label htmlFor="inputId1">   
              <StyledIcon icon={faUser} /> 
            </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='ID' 
              id="inputId1" name="inputName1" required />
          </div>

          <div>
            <label htmlFor="inputId2">   
              <StyledIcon icon={faLock} />
            </label> 
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='PASSWORD'
              id="inputId2" name="inputName2" required />
          </div>

          <button type="submit" id='loginBtn'> 로그인 </button>
          
          <div id="moveTo"> 계정이 없다면 ? 
            <Link to="/user/register" className='moveTo'>  회원가입 </Link> 
          </div>

        </form>


    </div>
  );
}

export default Login;