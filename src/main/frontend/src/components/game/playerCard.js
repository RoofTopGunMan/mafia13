
import React,  {useEffect, useState} from 'react';
import { Col, Card ,Button, CardText} from 'react-bootstrap';
import * as webSocketUtill from '../../utill/webSocketUtill';

    /* props : playerAccount, updateState
     * 플레이어 비주얼 카드 입니다.
     * playerAccount : 해당 플레이어의 정보입니다.
     * updateState : 현재 게임 내 해당 플레이어의 상태입니다. ( 없음 , 사망 , 생존 등)
     */
const PlayerCard = ({player, roomId, enableVoteBtn, myId}) => {
    const [VoteBtn, setVoteBtn] = useState(false);
    const [isDead,setDead] = useState(false);
    const [cardJob,setCardJob] = useState(false);

    function votePlayer(value) {
      
    
    let jsonBody = JSON.stringify({sender: myId , senderType: 2, roomId : roomId, data: value });
    webSocketUtill.publishClient(jsonBody,"pub/Vote");
      // let jsonBody = JSON.stringify({sender: "roomMaster", senderType: 2, data: "", roomId: roomData.id });
      // webSocketUtill.publishClient(jsonBody,"pub/Play");
    }
    useEffect(()=>{            
        webSocketUtill.subscribeClient("sub/room/dead/" + player.id, function(msg) {                 
            setDead("true"=== msg.body);
        });
        webSocketUtill.subscribeClient("sub/room/search/" + myId, function(msg) {                 
            setCardJob(JSON.parse(msg.body));
            console.log(JSON.parse(msg.body));
        });
    },[]);
    useEffect(() => {
        setVoteBtn(enableVoteBtn);
    },[enableVoteBtn,isDead]);
    return (
        <>
            <Col md={3}>
                <div className ="mb-2">
                    <Card style={{width: '18rem', height: '12rem'}}>
                        <Card.Body>
                            <Card.Title>
                                {player.id}
                                {player.roomMaster && (
                                    <> (방장) </>
                                )}

                                <Card.Text>
                                    {player.userName} 
                                    
                                    {cardJob.id === player.id && (
                                        <> {cardJob.job} </>
                                    )}

                                    {isDead ? 
                                    (<>
                                        <CardText>
                                            -사망-
                                        </CardText>
                                    </>) 
                                    : (
                                    <>
                                        {VoteBtn && (
                                            <>
                                                <br/>
                                                <Button as="input" type='button' value= "투표" onClick={()=>votePlayer(player.id)}/> 
                                            </>
                                        )}
                                    </>
                                    )}
                                </Card.Text>   
                            </Card.Title>  
                        </Card.Body>
                    </Card>
                </div>
            </Col>
            </> 
        )
}

export default PlayerCard;

