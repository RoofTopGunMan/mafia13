

import React,  {useEffect, useState} from 'react';
import * as StompJs from '@stomp/stompjs';

const Ingame = ({ myName}) => {       
    const connect = () => {
        const client = new StompJs.Client({
            brokerURL: 'ws://localhost:8093/ws'
        });
        
        client.onConnect = function() {
            client.subscribe("/sub/");
            console.log('success');
            let jsonBody = JSON.stringify({sender: myName, data: "test"});
            client.publish({
                    destination: "pub/subTest",
                    body: jsonBody
            });

        }
        client.activate();
    };
    useEffect(() => {
        connect();
    }, []);
    return (
        <>
            <div>
                인게임 테스트입니다. {myName}
            </div>
        </>
    );
}

export default Ingame;