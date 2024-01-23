import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import PlayerCard from "./playercard";

export default function PlayScene(UserList) {
  return (
    <>
        <Container>
            <Row  md={2}>
                <PlayerCard UserList={UserList.UserList}/>
            </Row>
        </Container>
    </>
  )
}

