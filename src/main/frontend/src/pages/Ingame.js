

import React,  {useEffect, useState} from 'react';
import * as StompJs from '@stomp/stompjs';
import * as axiosUtill from '../utill/axiosUtill';
import {createStore} from "redux";
import { Provider } from 'react';
import "./css/ingame.css";

const Ingame = ({roomData , myID}) => {       
    const [User, setUser] = useState(null);
    const connect = (UserData) => {
        setUser(UserData);
        const client = new StompJs.Client({
            brokerURL: 'ws://localhost:8093/ws'
        });
        
        client.onConnect = function() {


            client.subscribe("/sub/" + roomData.id);
            let jsonBody = JSON.stringify({sender: UserData.name, data: UserData.name + " Send test"});
            client.publish({
                    destination: "pub/subTest",
                    body: jsonBody
            });

        }
        client.activate();
    };
    useEffect(() => {
        axiosUtill.UtilGetAxios("api/getuser",{userId : myID}, 
        response => {
            connect(response.data);
        });
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