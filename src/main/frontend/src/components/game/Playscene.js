import React from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import PlayerCard from "./playerCard";
import * as webSocketUtill from '../../utill/webSocketUtill';
import * as axiosUtill from '../../utill/axiosUtill';

export default function PlayScene({UserList,roomData }) {
  function buttonEvent(value) {
    
    let jsonBody = JSON.stringify({sender: "roomMaster", senderType: 2, data: "", roomId: roomData.id });
    webSocketUtill.publishClient(jsonBody,"pub/Play");
  }

  console.log(roomData);
  return (
    <>
        <Container>
            <Row  md={2}>
              <PlayerCard UserList={UserList}/> 
            </Row>
            <Button as="input" type="button" value="게임 시작" onClick={()=>buttonEvent(true)}/> 
        </Container>
    </>
  )
}

