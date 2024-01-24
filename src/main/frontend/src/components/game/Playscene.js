
import React,  {useEffect,useState} from 'react';
import { Button,  Container, Row } from 'react-bootstrap';
import PlayerCard from "./playerCard";
import * as webSocketUtill from '../../utill/webSocketUtill';
import * as axiosUtill from '../../utill/axiosUtill';

export default function PlayScene({UserList,roomData }) {
  const [playGame, setPlayGame] = useState(null);
  function buttonEvent(value) {
    
    let jsonBody = JSON.stringify({sender: "roomMaster", senderType: 2, data: "", roomId: roomData.id });
    webSocketUtill.publishClient(jsonBody,"pub/Play");
  }

  useEffect(() => {
    webSocketUtill.subscribeClient("sub/room/Play/" + roomData.id, function(sender){                
      setPlayGame("게임 시작함");
    })
    webSocketUtill.subscribeClient("sub/" + roomData.id,function(a){
        console.log("subTEST");
    });
    console.log("sub/room/Play/" + roomData.id);

}, []);
  console.log(roomData);
  return (
    <>
        <Container>
            <Row  md={2}>
              <PlayerCard UserList={UserList}/> 
            </Row>
            <Button as="input" type="button" value="게임 시작" onClick={()=>buttonEvent(true)}/> 
            {playGame &&(
              <h1 className>{playGame}</h1>
            )}
        </Container>
    </>
  )
}

