import React, { useEffect, useState } from 'react';
import "./lobby.css";
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Gamerooms = () => {
    const [game_Room, setGame_Room] = useState([]); // Initialize with an empty array
    const { userId } = useSelector((state) => state);

    useEffect(() => {
        fetch("http://localhost:8093/mypage/"+userId)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // setUser(data);
            });
    }, []);
    
    useEffect(() => { 
        fetch("http://localhost:8093/lobby/gameroom")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGame_Room(data)
             });
    }, []);





    return (
        <>
            <Row>
                <Col>
                    <div className='room-container'>
                        {game_Room.map((game_Room) => (
                            <div className='room' key={game_Room.id}>
                                <h3>
                                    <label className='roomid'>{game_Room.id}.
                                        방 이름:{game_Room.subject}
                                    </label>
                                    <br />
                                    <label className='num'>
                                        {game_Room.room_num}/{game_Room.max_player}
                                    </label>
                                    <div className='into'>
                                        <Link to={`/Ingame/${game_Room.id}`} className='nav-link'> 방 입장</Link>
                                    </div>
                                </h3>
                            </div>
                        ))}
                    </div>
                  
                </Col>
            </Row>
        </>
    );
};

export default Gamerooms;
