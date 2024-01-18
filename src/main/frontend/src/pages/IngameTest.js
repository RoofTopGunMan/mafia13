import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ingame from './Ingame';
import * as AxiosUtill from '../utill/axiosUtill';
import { Button } from 'react-bootstrap';

const IngameTest = () => {

    const [hello, setHello] = useState('')
    const [clientIngame,setIngame] = useState(false)
    const [UserName, setName] = useState("이름")
    const [buttonflag, setBtnFlag] = useState(false)
    const [roomNumber, setRoomNumber] = useState(2)
    function buttonEvent(value) {
      AxiosUtill.UtilGetAxios('/api/button',{ debug : value }, response => setIngame(response.data));
    }

    function connectRoom(name) {
      if(!buttonflag)
      {
        setBtnFlag(true);
        AxiosUtill.UtilGetAxios('api/room/connect',{userName : name, roomId : roomNumber}, response => {setIngame(response.data); setBtnFlag(false)});
      }
    }
    useEffect(() => {
    AxiosUtill.UtilGetAxios('/api/hello', null, response => setHello(response.data));
    }, []);

    return (
        <>
            {clientIngame ? (
          <>
            <div>
              인게임 페이지입니다.
            </div>
            <Ingame 
             myName = {UserName}
            />
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
            입장 방 번호 :  
            <input value={roomNumber} onChange = {(e)=>{ setRoomNumber(e.target.value);}}/>
          </div>
          <div className="App">
            <input value={UserName} onChange = {(e)=>{ setName(e.target.value);}}/>            
            <Button as="input" type="button" value="connect" onClick={()=>connectRoom(UserName)}/>{' '}
            
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