
import React,  {useEffect, useState} from 'react';
import { Col, Card ,Button} from 'react-bootstrap';
import * as webSocketUtill from '../../utill/webSocketUtill';

    /* props : playerAccount, updateState
     * 플레이어 비주얼 카드 입니다.
     * playerAccount : 해당 플레이어의 정보입니다.
     * updateState : 현재 게임 내 해당 플레이어의 상태입니다. ( 없음 , 사망 , 생존 등)
     */
const PlayerCard = ({player, enableVoteBtn}) => {
    const [VoteBtn, setVoteBtn] = useState(false);
    function votePlayer(value) {
      
      console.log("dd");
      // let jsonBody = JSON.stringify({sender: "roomMaster", senderType: 2, data: "", roomId: roomData.id });
      // webSocketUtill.publishClient(jsonBody,"pub/Play");
    }
    useEffect(() => {
        console.log(enableVoteBtn);
        setVoteBtn(enableVoteBtn);

    },[]);
    return (
        <>
            <Col md={3}>
                <div className ="mb-2">
                    <Card style={{width: '18rem', height: '12rem'}}>
                        <Card.Body>
                            <Card.Title>{player.id}
                                <Card.Text>
                                    {player.userName}   
                                </Card.Text>
                                    {player.roomMaster && (
                                        <Card.Text> 방장
                                                            
                                        </Card.Text>    
                                    )}   
                                    {VoteBtn && (
                                        <Button as="input" type='button' value= "투표" onClick={()=>votePlayer()}/> 
                                    )}
                            </Card.Title>  
                        </Card.Body>
                    </Card>
                </div>
            </Col>
            </> 
        )
}

export default PlayerCard;

