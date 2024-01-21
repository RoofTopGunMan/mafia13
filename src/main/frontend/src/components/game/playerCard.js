
import React,  {useEffect, useState} from 'react';

    /* props : playerAccount, updateState
     * 플레이어 비주얼 카드 입니다.
     * playerAccount : 해당 플레이어의 정보입니다.
     * updateState : 현재 게임 내 해당 플레이어의 상태입니다. ( 없음 , 사망 , 생존 등)
     */
const PlayerCard = (UserList) => {
    console.log(UserList); 
    return (
        <>
        
        {UserList &&            
         
         UserList.UserList.map(it => {
            return (
                <>
                    <div class = "card">
                        <div class = "card-body">
                            <div class = "card-title">
                                <div class = "card-text">
                                    {it.userName}
                                </div>
                            </div>  
                        </div>
                    </div>
                </>
            )
         })
        }
        </>
    );
}

export default PlayerCard;

