import React from 'react';

    /* props : roomdata
     * 인 게임 방에 대한 헤더 설정입니다.
     * 해당 방에 대한 정보가 담겨있고, 출력됩니다.
     */
function ingameHeader(roomData) {
    return (
        <div>
        인게임 테스트입니다.<br/>
        방 번호 : {roomData.id}<br/>
        방 이름 : {roomData.subject}<br/>
            
        </div>
    );
}

export default ingameHeader;
