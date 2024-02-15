import React, { useEffect, useState } from 'react';
import ChatRoom from '../chat/chat';
import { useSelector } from 'react-redux';

const Chat = () => {
    const [user, setUser] = useState([]);
    
    const { userId } = useSelector((state) => state);

    useEffect(() => { 
        fetch("http://localhost:8093/mypage/" + userId  )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data)
             });
    }, []);


    
    return (
        <>
       
            

            <h2>로비 채팅</h2>
            <ChatRoom userName={user.name} userId={user.id} chatId={-1} SubDesc={"sub/lobby/chat"} id='lobbyChat'/>
        </>
    );
};

export default Chat;