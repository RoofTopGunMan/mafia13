

import React,  {useEffect, useState} from 'react';
import * as StompJs from '@stomp/stompjs';
import * as axiosUtill from '../utill/axiosUtill';
// import {createStore} from "redux";
// import { Provider } from 'react';
import PlayerCard from "../components/game/playerCard";

import * as webSocketUtill from '../utill/webSocketUtill';
import { Button } from 'react-bootstrap';
import PlayScene from "../components/game/Playscene";
import IngameHeader from "../components/game/ingameHeader";
import "./css/ingame.css";

const Ingame = ({roomData , myID}) => {       
    const [User, setUser] = useState(null);
    const [UserList, setUserList] = useState(null);
    const initiateAPI = () => {
        axiosUtill.UtilGetAxios("api/getuser",{userId : myID},  response => { 
            connect(response.data);
        });
        axiosUtill.UtilGetAxios("api/getRoomInUser",{roomId : roomData.id}, response => {
        });

    }
    const connect = (UserData) => {
        setUser(UserData);
        const client = new StompJs.Client({
            brokerURL: 'ws://localhost:8093/ws'
        });
        
        client.onConnect = function() {


            client.subscribe("/sub/" + roomData.id);
            client.subscribe("sub/room/entrance/" + roomData.id, function(currentUserList){
                setUserList(JSON.parse(currentUserList.body));
                console.log(JSON.parse(currentUserList.body));
            });
            let jsonBody = JSON.stringify({sender: UserData.name, senderType: 2,data: "", roomId: roomData.id });
            client.publish({
                    destination: "pub/entrance",
                    body: jsonBody
            });

        }
        client.activate();
    };
    useEffect(() => {
        initiateAPI();
    }, []);
    return (
        <>
            <IngameHeader roomData={roomData}/>
            <div>
                {UserList && 
                (
                    <PlayScene UserList={UserList}/>
                )}
            </div>
          <div className="App">
            <Button as="input" type="button" value="Input" onClick={()=>buttonEvent(false)}/>{' '}
          </div>
        </>
    );
}

export default Ingame;