
import * as axiosUtill from './axiosUtill';
import * as StompJs from '@stomp/stompjs';
import React,  { useState} from 'react';




let myClient = null;
// getMapping 시 해당 함수로 호출하면 됩니다.

export function createClient() {
    if(myClient !== null)return;
    const client = new StompJs.Client({
        brokerURL: 'ws://localhost:8093/ws'
    });

    myClient = client;
    myClient.onConnect = function() {
        console.log("active");
        connectedDelayFunction.forEach(fnc => {
            console.log("checkFunctions");
            fnc();
        })
        PublishFunctionQueue.forEach(fnc => {
            console.log("checkPubFunctions");
            fnc();
        })
    }

    myClient.activate();
}

let connectedDelayFunction = [];
let PublishFunctionQueue = [];

//let jsonBody = JSON.stringify({sender: User.name, senderType: 2,data: "", roomId: roomData.id });
//webSocketUtill.publishClient(jsonBody,"pub/entrance");
export function activateIngame(roomId) {

    myClient.activate();
}
export function subscribeClient(dest, subFunction) {

    console.log("addSubscribe");
    if(myClient && myClient.connected){  
        console.log("subsc-conneted");
        myClient.subscribe(dest, (message) => {
        subFunction(message);
    });
    }
    else
        connectedDelayFunction.push(function() {
            console.log("subsc-delayed");
                myClient.subscribe(dest, (message) => {
                subFunction(message);
            });
    });
}
export function publishClient(JsonBody, dest) {
    console.log("addPublish");
    if(myClient && myClient.connected){  
        console.log("Publish-conneted");
        myClient.publish({
            destination: dest,
            body: JsonBody
        });
    }
    else{
        console.log("Publish-delayed");
        PublishFunctionQueue.push(function() {            
            myClient.publish({
                destination: dest,
                body: JsonBody
            });
        })
    }

}
export function publishStart(Client, ) {

}
