import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faEnvelope, faIdBadge, faKey, faUserSecret } from '@fortawesome/free-solid-svg-icons';


function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 중복검사
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checkComplete, setCheckComplete] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const userData = { name, username, email, password };

    try {
        const response = await fetch("http://localhost:8093/user/register", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if(!response.ok) {
            throw new Error("회원가입 실패")
        }

        const data = await response.json();
        console.log("Registration successful", data);
        alert("회원가입 성공")
        navigate('/user/login');

    } catch (error) {
        console.error("필수 입력 사항 미기재", error);
    }
  };


  

  const checkUsernameDuplication = async () => {
    setChecking(true);
    setCheckComplete(false);

    try {
        const response = await fetch(`http://localhost:8093/user/register?username=${username}`);
        const data = await response.json();
        setIsDuplicate(data.isDuplicate);
    } catch (error) {
        console.error("중복 여부 검사", error);
    } finally {
        setChecking(false);
        setCheckComplete(true);
    }

  };



  const StyledIcon = styled(FontAwesomeIcon)`
    color: red;
    font-size: 25px;
    margin-right: 10px;
    width: 25px;      
    height: 25px;      
    line-height: 25px; 
    display: inline-block; 
  `;

  return (
    <div id='RegWrap'>

      <form onSubmit={handleSubmit} name='frm'>

        <h2 id='Register'>Join <span id='mafia13'>Mafia13</span></h2>

        <div>
          <span className='regInfo'> 아이디 </span> <br></br>
          <label htmlFor="regId1">
            <StyledIcon icon={faIdBadge} />
          </label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} 
            onBlur={checkUsernameDuplication} id='regId1' name="regName1" required />
            {checking && <p className='dupId'>중복 여부 확인중</p>}
            {checkComplete && isDuplicate && username && <p className='dupId' id='fail'>이미 존재하는 아이디 입니다.</p>}
            {checkComplete && !isDuplicate && username && <p className='dupId' id='ok'>사용 가능한 아이디 입니다.</p>}
        </div>



        <div>
          <span className='regInfo'> 비밀번호 </span> <br></br>
          <label htmlFor="regId3">
            <StyledIcon icon={faKey} />
          </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
            name='regId3' required />
        </div>
    
        <div>
          <span className='regInfo'> 이메일 </span> <br></br>
          <label htmlFor="regId4">
            <StyledIcon icon={faEnvelope} />
          </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
            name='regId4' required />

        <div>
          <span className='regInfo'> 닉네임 </span> <br></br>
          <label htmlFor="regId2">
            <StyledIcon icon={faUserSecret} />
          </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
            name='regId2' required />
        </div>
        </div>

        <button type="submit" id='regBtn'>가입하기</button>
        <div id="moveTo"> 계정이 있다면 ? 
            <Link to="/user/login" className='moveTo'>  로그인 </Link> 
        </div>

      </form>

    </div>
  );
}

export default Register;
