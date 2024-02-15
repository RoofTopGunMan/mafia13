import React,  {useEffect,useState} from 'react';
import { Button,  Container, Row } from 'react-bootstrap';
import PlayerCard from "./playerCard";
import * as webSocketUtill from '../../utill/webSocketUtill';
import * as axiosUtill from '../../utill/axiosUtill';

export default function PlayScene({UserList,roomData,  myId }) {
  const [playGame, setPlayGame] = useState(null);
  const [currentStateTimer, setCurrentTimer] = useState(null);
  const [enableVoteBtn, setEnableVoteBtn] = useState(false);
  const [selfVote, setSelfVote] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [CurrentState,  setCurrentState] = useState("시작 전")
  function votePlayer(value) {
    
    console.log("dd");
    // let jsonBody = JSON.stringify({sender: "roomMaster", senderType: 2, data: "", roomId: roomData.id });
    // webSocketUtill.publishClient(jsonBody,"pub/Play");
  }
  function buttonEvent(value) {
    
    let jsonBody = JSON.stringify({sender: "roomMaster", senderType: 2, data: "", roomId: roomData.id });
    webSocketUtill.publishClient(jsonBody,"pub/Play");
  }
  function buttonGameEnd(value) {
    
    let jsonBody = JSON.stringify({sender: "roomMaster", senderType: 2, data: "", roomId: roomData.id });
    webSocketUtill.publishClient(jsonBody,"pub/End");
  }

  useEffect(() => {
    webSocketUtill.subscribeClient("sub/room/Play/" + roomData.id, function(sender){                
      setPlayGame("게임 시작함");
    })
    webSocketUtill.subscribeClient("sub/room/End/" + roomData.id, function(sender){                
      setPlayGame("게임 종료");
      setEnableVoteBtn(false);
    })
    webSocketUtill.subscribeClient("sub/" + roomData.id,function(a){
    });
    webSocketUtill.subscribeClient("sub/room/tick/" + roomData.id,function(a){
      setCurrentTimer(a.body);
    });
    webSocketUtill.subscribeClient("sub/room/roundState/" + roomData.id, function(msg){  
        setCurrentState(msg.body);    
    })
    webSocketUtill.subscribeClient("sub/room/isVoteState/" + myId, function(msg){     
        setEnableVoteBtn(msg.body === "true");
    })
    webSocketUtill.subscribeClient("sub/room/userInfo/" + myId, function(msg){     
      setUserInfo(JSON.parse(msg.body));
    }) 
               
    console.log("sub/room/Play/" + roomData.id);

}, []);
  return (
    <>
        <Container>
            <Row  md={2}>
            {UserList &&    
                UserList.map(it => {
                    return (
                    <>
                    <PlayerCard myId = {myId} roomId = {roomData.id} player={it} enableVoteBtn = {enableVoteBtn} onClick={()=>votePlayer()}/> 
                    </> 
            )})}
            </Row>
            <Button as="input" type="button" value="게임 시작" onClick={()=>buttonEvent(true)}/> 
            <br/>
            <br/>
            <Button as="input" type="button" value="게임 종료" onClick={()=>buttonGameEnd(true)}/> 
            {playGame && (
              <>
                <h6 className>{playGame}</h6>
                <h6 className>{currentStateTimer}</h6>
              </>

            )}
            { userInfo && (
            <h6 className>{userInfo.job}</h6>
            )}
            {CurrentState && (
    
                <div>
                    방 상태 : {CurrentState}<br/>
                </div>
            )}
        </Container>
    </>
  )
}

