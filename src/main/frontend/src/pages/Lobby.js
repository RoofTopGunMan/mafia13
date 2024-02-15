import React, { useEffect, useState } from 'react';
import Header from '../components/lobby/Header';
import Notice from '../components/lobby/Notice';
import Gamerooms from '../components/lobby/Gamerooms';
import mafiaLogo from '../img/mafia_logo.webp'
import ChatRoom from '../components/chat/chat';
import { Link } from 'react-router-dom';
import Chat from '../components/lobby/Chat';
import { useSelector } from 'react-redux';

const Lobby = () => {
    
    const { userId, userStatus } = useSelector((state) => state);

    const [user, setUser] = useState([]);

    useEffect(() => { 
        fetch("http://localhost:8093/mypage/" + userId  )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data)
             });
    }, []);



    
    if (user.status === 1) {
        alert("접근이 불가능합니다. 회원 탈퇴 상태입니다.");
        window.location.href = '/user/login';
    }
    
    return (
        <>
        <div id='lobbyWrap'>


            
            <Header />   
            <Notice/>
            <Gamerooms />
            <img src={mafiaLogo} alt='Mafia13 Logo' className='mafiaLogo'/>
            <div className="gameroom">
                        <Link className='nav-link' to="/Ingame">방 생성하기</Link>
            </div>
            <Chat/>

        </div>
        </>
    );
};
export default Lobby;