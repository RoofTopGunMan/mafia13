import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Ingame from './Ingame';
import * as AxiosUtill from '../utill/axiosUtill';
import { Button } from 'react-bootstrap';

const IngameTest = () => {

    const [hello, setHello] = useState('')
    const [clientIngame,setIngame] = useState(false)
    const [Number, setNumber] =useState(2)
    const [UserName, setName] = useState("")
    function buttonEvent(value) {
      AxiosUtill.UtilGetAxios('/api/button',{ debug : value }, response => setIngame(response.data));
    }

    function connectRoom(name) {
        AxiosUtill.UtilGetAxios('api/room/connect',{userName : name}, response => setIngame(response.data));
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
          
          <div className="App">
            <input value={UserName}
            onChange = {(e)=>{
              setName(e.target.value);
            }}/>
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