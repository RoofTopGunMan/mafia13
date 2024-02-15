import React from 'react';
import Header from '../components/lobby/Header';
import Notice from '../components/lobby/Notice';
import Gamerooms from '../components/lobby/Gamerooms';
import Chat from '../components/lobby/Chat';
import mafiaLogo from '../img/mafia_logo.webp';
import { Link } from 'react-router-dom';

const Lobby = () => {
    return (
        <>
        <div id='lobbyWrap'>

            <Header/>   
            <Chat />
            <Notice/>
            <Gamerooms />
            <img src={mafiaLogo} alt='Mafia13 Logo' className='mafiaLogo'/>
            <div className="gameroom">
                        <Link className='nav-link' to="/Ingame">방 생성하기</Link>
            </div>

        </div>
        </>
    );
};
export default Lobby;