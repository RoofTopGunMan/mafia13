import React, { useEffect, useState } from 'react';
import View from './View';
import { Link, Route, Routes } from 'react-router-dom';
import Modify from './Modify';
import Record from './Record';
import Inventory from './Inventory';
import Button from 'react-bootstrap/Button';
import "../css/mypage.css";

const MypageHome = () => {
    
    
    const [Mypage, setMypage] = useState('');
    
    const [user, setUser] = useState({id: "", username: "", password: "", name: "", email:""});

    useEffect(() => {
        // 다운로드 하여 setBoards 호출
        let data = [
            { id: 1, username: "user1", password: "1234", name: "유저1", email: "1234@naver.com" },
        ];

        setUser([...data]);
    }, []);
        const handleButtonClick = (page) => {
            setMypage(page);

        };
    
    
        return (
            <>
                <div class="myPage">
                
                    <div class="toHome">
                        <Link className='nav-link' to="/"> 로비로 돌아가기</Link>
                    </div>
                
                    <h1>마이페이지</h1>
                    <hr />
                    <div className="container-full">
                        <div className="container-left">
                            <div className="row">
                                
                                    <div className="mypageBtn">
                                        <Button className="btn-outline-dark" onClick={() => handleButtonClick('View')}>프로필 보기</Button>
                                        <Button className="btn-outline-dark" onClick={() => handleButtonClick('Modify')}>프로필 수정</Button>
                                        <Button className="btn-outline-dark" onClick={() => handleButtonClick('Record')}>전적</Button>
                                        <Button className="btn-outline-dark" onClick={() => handleButtonClick('Inventory')}>인벤토리</Button>
                                    </div> 
                            
                            </div>
                                       
                       
                        </div>
                            
                        
                    </div>
                        <div className="container-right">
                                  
                                  {Mypage === 'View' && <View user={user} />}
                                  {Mypage === 'Modify' && <Modify />}
                                  {Mypage === 'Record' && <Record />}
                                  {Mypage === 'Inventory' && <Inventory />}
                              
                         </div>  
                               
        
                    
            
             </div>

                    
                    

                    


            
                

                
                
                
               
        
        
            </>
        );
    };

export default MypageHome;