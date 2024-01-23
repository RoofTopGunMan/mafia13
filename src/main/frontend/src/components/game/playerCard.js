
import React,  {useEffect, useState} from 'react';
import { Col, Card ,Button} from 'react-bootstrap';

    /* props : playerAccount, updateState
     * 플레이어 비주얼 카드 입니다.
     * playerAccount : 해당 플레이어의 정보입니다.
     * updateState : 현재 게임 내 해당 플레이어의 상태입니다. ( 없음 , 사망 , 생존 등)
     */
const PlayerCard = ({UserList}) => {
    console.log(UserList); 
    return (
        <>
            {UserList &&    
                UserList.map(it => {
                    return (
                    <>
                    <Col md={3}>
                        <div class="mb-2">
                            <Card style={{width: '18rem', height: '12rem'}}>
                                <Card.Body>
                                    <Card.Title>{it.id}
                                        <Card.Text>
                                            {it.userName}   
                                        </Card.Text>
                                            {it.roomMaster && (
                                                <Card.Text> 방장
                                                                    
                                                </Card.Text>    
                                            )}   
                                    </Card.Title>  
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    </> 
            )})}
        </>
        )
}

export default PlayerCard;

