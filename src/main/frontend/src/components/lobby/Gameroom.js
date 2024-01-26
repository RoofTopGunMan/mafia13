import React from 'react';
import "./lobby.css";
import { Col, Row } from 'react-bootstrap';
const gameroom = () => {
    const gameRooms = [
        { id: 1, title:"방 이름 " ,name: '내용1' },
        { id: 2, title:"방 이름 " ,name: '내용2' },
        { id: 3, title:"방 이름 " ,name: '내용3' },
        { id: 4, title:"방 이름 " ,name: '내용4' },
        { id: 5, title:"방 이름 " ,name: '내용5' },
        { id: 6, title:"방 이름 " ,name: '내용6' },
        // ... 추가 게임 룸 데이터
      ];
    
    
    
    
    return (
        <>
               
                <Row>
                    <Col>   
                        <div className='room-container'>
                            {gameRooms.map((room) => (
                                <div className='room' key={room.id}>
                                    <h2>
                                        {room.id}.
                                        {room.title}
                                    </h2>
                                    {room.name}
                                </div>
                                
                            ))}
                        </div>
                    </Col>   
                </Row>
             
            </>
    );
};

export default gameroom;