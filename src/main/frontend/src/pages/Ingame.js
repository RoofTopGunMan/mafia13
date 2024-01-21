

import React,  {useEffect, useState} from 'react';
import * as StompJs from '@stomp/stompjs';
import * as axiosUtill from '../utill/axiosUtill';
import {createStore} from "redux";
import { Provider } from 'react';
import {playerCard} from "../components/game/playerCard";
import "./css/ingame.css";

const Ingame = ({roomData , myID}) => {       
    const [User, setUser] = useState(null);
    const [UserList, setUserList] = useState(null);
    const Users = [
        {
            userId : 1,
            userName : "dd",
        },
        {
            userId : 2,
            userName : "ss",
        },
        {
            userId : 3,
            userName : "cc",
        }
    ];

    const initiateAPI = () => {
        axiosUtill.UtilGetAxios("api/getuser",{userId : myID},  response => { 
            connect(response.data);
        });
        axiosUtill.UtilGetAxios("api/getRoomInUser",{roomId : roomData.id}, response => {
            setUserList(response.data); 
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
                setUserList(currentUserList.body);
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
            <div>
                인게임 테스트입니다.<br/>
                방 번호 : {roomData.id}<br/>
                방 이름 : {roomData.subject}<br/>
                {User ? (
                    <>
                    유저 이름 : {User.username}
                    </>
                ):(<></>)
                }
            </div>
        </>
    );
}

export default Ingame;