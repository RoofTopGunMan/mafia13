import React from 'react';
import Header from '../components/lobby/Header';
import Notice from '../components/lobby/Notice';
import Gamerooms from '../components/lobby/Gamerooms';
import ChatRoom from '../components/chat/chat';
import { Link } from 'react-router-dom';

const Lobby = () => {
    return (
        <>
            <Header/>   
            <Notice/>
            <Gamerooms />
            <div className="gameroom">
                        <Link className='nav-link' to="/Ingame">방 생성하기</Link>
            </div>
            <ChatRoom  userName ={"UserName"} userId = {1} chatId={-1} SubDesc = {"sub/lobby/chat"}/>
        </>
    );
};
export default Lobby;