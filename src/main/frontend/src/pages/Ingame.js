

import React,  {useEffect, useState} from 'react';
import * as StompJs from '@stomp/stompjs';
// import {createStore} from "redux";
// import { Provider } from 'react';

import * as axiosUtill from '../utill/axiosUtill';
import * as webSocketUtill from '../utill/webSocketUtill';
import { Button } from 'react-bootstrap';
import PlayScene from "../components/game/playScene";
import IngameHeader from "../components/game/ingameHeader";
import "./css/ingame.css";

const Ingame = ({roomData , myID}) => {       
    const [User, setUser] = useState(null);
    const [UserList, setUserList] = useState(null);

    
    const initiateAPI = () => {
        axiosUtill.UtilGetAxios("api/getuser",{userId : myID},  response => { 
            connect(response.data);
        });

    }
    const connect = (UserData) => {
        setUser(UserData);

        webSocketUtill.createClient();
        webSocketUtill.subscribeClient("sub/room/entrance/" + roomData.id, function(currentUserList){                        
            setUserList(JSON.parse(currentUserList.body));
        })
        let jsonBody = JSON.stringify({sender: UserData.name, senderType: 2,data: "", roomId: roomData.id, userId: myID });
        webSocketUtill.publishClient(jsonBody,"pub/entrance");
    }
    useEffect(() => {
        initiateAPI();
    }, []);
    return (
        <>
        {User &&
        (
            <IngameHeader roomData={roomData} myName={User.name}/>
        )}
            <div>
                {UserList && 
                (
                    <PlayScene myId = {myID} UserList={UserList} roomData = {roomData} />
                )}
            </div>
        </>
    );
}

export default Ingame;