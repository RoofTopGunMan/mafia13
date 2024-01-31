import React from 'react';
import Header from '../components/lobby/Header';
import Notice from '../components/lobby/Notice';
import Gamerooms from '../components/lobby/Gamerooms';
import Chat from '../components/lobby/Chat';
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
            <Chat />
        </>
    );
};
export default Lobby;