import React, { useEffect, useState } from 'react';
import "./lobby.css";
import { Button, Col, Row } from 'react-bootstrap';
import { UseSelector, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Gamerooms = () => {
    const[game_room,SetGame_room] = useState([]);
    const { userId } = useSelector((state) => state);



    const [user, setUser] = useState([]);

    useEffect(() => { 
        fetch("http://localhost:8093/mypage/" + userId  )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data)
             });
    }, []);
      


      useEffect(() => { 
        fetch("http://localhost:8093/lobby/gameroom")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                SetGame_room(data)
             });
    }, []);
    
    
    return (
        <>
               
                <Row>
                    <Col>   
                        <div className='room-container'>
                            {game_room.map((game_room) => (
                                <div className='room' key={game_room.id}>
                                    <h3>
                                        <label className='roomid'>{game_room.id}.
                                            방 이름:{game_room.subject}
                                        </label>
                                        <br/>
                                        <label className='num'>
                                            {game_room.room_num}/{game_room.max_player}
                                        </label>
                                        <div className='into'>
                                            <Link to={"/Ingame/" +game_room.id} className='nav-link'> 방 입장</Link>
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