
import * as axiosUtill from './axiosUtill';
import * as StompJs from '@stomp/stompjs';
import React,  { useState} from 'react';




let myClient = null;
let activateTrigger = false;
// getMapping 시 해당 함수로 호출하면 됩니다.

export function createClient() {
    const client = new StompJs.Client({
        brokerURL: 'ws://localhost:8093/ws'
    });

    myClient = client;
    myClient.activate();
}

let connectedDelayFunction = [];

//let jsonBody = JSON.stringify({sender: User.name, senderType: 2,data: "", roomId: roomData.id });
//webSocketUtill.publishClient(jsonBody,"pub/entrance");
export function activateIngame(roomId) {
    myClient.onConnect = function() {
        connectedDelayFunction.map(fnc =>{
            fnc();
        })
    }
    myClient.activate();
}
export function subscribeClient(dest, subFunction) {
    const subscribeFunc = myClient.subscribe(dest, (message) => {
        subFunction(message);
    });
    if(myClient.onConnect){ 
        subscribeFunc()
    }
    else
        connectedDelayFunction.push(subscribeFunc);
}
export function publishClient(JsonBody, dest) {
    myClient.publish({
        destination: dest,
        body: JsonBody
    });

}
export function publishStart(Client, ) {

}
