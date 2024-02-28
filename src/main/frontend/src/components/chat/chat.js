import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import "./chat.css";
import { Button } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as webSocketUtill from '../../utill/webSocketUtill';
    /* props : ChatState
     * 채팅방 정보입니다.
     * 로비 / 방 두 위치에 존재해야하며 이를위해 반환값에 대응되는 분기점을 넣어야합니다.
     * ChatState : 0 = 로비, 1 = 방, 2.. = 그외 추가되는 경우 직접 인덱싱 해야합니다.
     */
export default function ChatRoom({SubDesc,  userName, userId, chatId}) {
    const PubDesc = "pub/chatRoom";
    const [chatContent, setChat] = useState("")
    const [arrChat, setArrayChat] = useState(Array)
    const [newChat, setNewChat] = useState([])
    const scrollRef = useRef();

    useEffect(()=>{      
        webSocketUtill.createClient();

        webSocketUtill.subscribeClient(SubDesc, function(msg) {
            let sender = JSON.parse(msg.body);
            setNewChat({
                name : sender.sender,
                content : sender.data
            })
        });  
    },[]);
    useEffect(()=>{       
        scrollRef.current.scrollToBottom();
    },[arrChat]);
    
    useEffect(()=>{
        if(newChat !== "") {
            const newArray = arrChat.concat(newChat);
            setArrayChat(newArray);
            setNewChat("");
            console.log("중복 실행 체크 로그");
        }
    },[newChat]);
    function publishMyChat() {
        let jsonBody = JSON.stringify({sender: userName, senderType: 2, data: chatContent, roomId: chatId, userId: userId });
        webSocketUtill.publishClient(jsonBody, PubDesc);
        console.log(jsonBody);
        setChat("");

    }
    function updateText(e){
        if(e.target.value.charAt(e.target.value.length - 1) === '\n') {
            publishMyChat();
        }
        else
            setChat(e.target.value);
    }
    return (
        <>
            <Container id='chatContainer'>
                <Row className='chatRow'>
                    <Scrollbars  
                    ref = {scrollRef}
                    className='chatMain'
                    style={{ width: 390, height: 350 }}>
                    {arrChat &&
                        arrChat.map(it => {
                            return(
                                <>
                                <p className='chatText'>{it.name} : {it.content}</p>
                                </>
                            )
                        })
                    }
                    </Scrollbars>
                </Row>

                <Row className='chatRow' >
                    <Col className="chatCol">
                        <Form.Control  className = "chatInput" value={chatContent} onChange={updateText} as="textarea" style={{ height: '50px', width: '100%' }} />  
                    </Col>
                        <Button variant="dark" className = "chatBtn" as="input" type="button" value="입력" onClick={()=>publishMyChat() }/>{' '}

                </Row>

                
            </Container>
        </>
        
    );
}
