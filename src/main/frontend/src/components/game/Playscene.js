import React from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import PlayerCard from "./playerCard";

export default function PlayScene({UserList}) {
  return (
    <>
        <Container>
            <Row  md={2}>
                <PlayerCard UserList={UserList}/>
            </Row>
            <Button as="input" type="button" value="게임 시작"/> 
        </Container>
    </>
  )
}

