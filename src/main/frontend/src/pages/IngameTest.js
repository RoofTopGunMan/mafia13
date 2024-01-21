import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ingame from './Ingame';
import * as AxiosUtill from '../utill/axiosUtill';
import { Button } from 'react-bootstrap';

const IngameTest = () => {

    const [hello, setHello] = useState('')
    const [clientIngame,setIngame] = useState(false)
    const [UserId, setName] = useState(1)
    const [roomName, setRoomName] = useState("")
    function buttonEvent(value) {
      AxiosUtill.UtilGetAxios('/api/button',{ debug : value }, response => setIngame(response.data));
    }

    function connectRoom(Id,roomSubject) {
        AxiosUtill.UtilGetAxios('api/room/connect',{userId : Id, roomName : roomSubject}, response => {
        setIngame(response.data);
        console.log(response.data);
      });
    }
    useEffect(() => {
    AxiosUtill.UtilGetAxios('/api/hello', null, response => setHello(response.data));
    }, []);

    return (
        <>
            {clientIngame ? (              
          <>
            <Ingame roomData={clientIngame} myID = {UserId} />
          <div className="App">
            <Button as="input" type="button" value="Input" onClick={()=>buttonEvent(false)}/>{' '}
          </div>
          </>
        )
        : (
          <>
          <div>
              백엔드에서 가져온 데이터입니다 : {hello}
          </div>
          <div>
            입장 방 제목 :  
            <input value={roomName} onChange = {(e)=>{ setRoomName(e.target.value);}}/>
          </div>
          <div className="App">
            <input value={UserId} onChange = {(e)=>{ setName(e.target.value);}}/>            
            <Button as="input" type="button" value="connect" onClick={()=>connectRoom(UserId, roomName)}/>{' '}
            
          </div>
          <div className="App">
            <Button as="input" type="button" value="Input" onClick={()=>buttonEvent(true)}/>{' '}
          </div>
        </>
        )}
        </>
    );
};

export default IngameTest;