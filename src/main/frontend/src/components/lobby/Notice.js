import React, { useEffect, useState } from 'react';
import "./lobby.css";
import { Accordion } from 'react-bootstrap';
const Notice = () => {
    const[notice,Setnotice] = useState([]);
    
    useEffect(() => { 
        fetch("http://localhost:8093/lobby/notice")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                Setnotice(data)
             });
    }, []);
    
    
    
    
    return (
        <>  
            
           
    <Accordion defaultActiveKey="0" className='ntc'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>공지사항 입니다.</Accordion.Header>
        <Accordion.Body>
        {notice.map((notice) => (
            <div  key={notice.id}>
                
                    {notice.content}
                
            </div>
        ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
            
          
        </>
      
    
    
    
    );
};

export default Notice;