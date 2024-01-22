

import React,  {useEffect, useState} from 'react';
import * as StompJs from '@stomp/stompjs';

// import {createStore} from "redux";
// import { Provider } from 'react';
import PlayerCard from "../components/game/playerCard";

import * as axiosUtill from '../utill/axiosUtill';
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

    }
    const connect = (UserData) => {
        setUser(UserData);

        webSocketUtill.createClient();
        webSocketUtill.subscribeClient("/sub/" + roomData.id);
        webSocketUtill.subscribeClient("sub/room/entrance/" + roomData.id, function(currentUserList){                        
            console.log(currentUserList);
            setUserList(JSON.parse(currentUserList.body));
        })
    }
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
        </>
    );
}

export default Ingame;