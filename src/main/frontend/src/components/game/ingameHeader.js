import React,  {useEffect, useState} from 'react';
import * as webSocketUtill from '../../utill/webSocketUtill';

    /* props : roomdata
     * 인 게임 방에 대한 헤더 설정입니다.
     * 해당 방에 대한 정보가 담겨있고, 출력됩니다.
     */
const IngameHeader = ({roomData}) => {
    const {currentTimer,  setTimer} = useState(null);
    const {id, subject} = roomData;
useEffect(() => {
    webSocketUtill.subscribeClient("sub/room/roundState/" + roomData.id, function(currentUserList){                        
        setTimer(JSON.parse(currentUserList.body));
    })
}, []);
    return (
        <div>
        인게임 테스트입니다.<br/>
        방 번호 : {id}<br/>
        방 이름 : {subject}<br/>
        {currentTimer &&(

            <div>
                방 이름 : {currentTimer}<br/>
            </div>
        )}
            
        </div>
    );
}

export default IngameHeader;
