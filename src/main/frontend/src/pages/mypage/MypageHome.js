import React, { useEffect, useState } from 'react';
import View from './View';
import { Link } from 'react-router-dom';
import Modify from './Modify';
import Record from './Record';
import Inventory from './Inventory';
import Button from 'react-bootstrap/Button';
import "../css/mypage.css";
import { useSelector } from 'react-redux';

const MypageHome = () => {
    const { userId, userStatus } = useSelector((state) => state);

    const [Mypage, setMypage] = useState('');
    const [user, setUser] = useState([]);

    useEffect(() => { 
        fetch("http://localhost:8093/mypage/" + userId  )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data)
             });
    }, []);

    const handleButtonClick = (page) => {
        setMypage(page);
    };

    if (user.status === 1) {
    alert("접근이 불가능합니다. 회원 탈퇴 상태입니다.");
    window.location.href = '/user/login';
    }

    return (
        <>
            <div className="myPage">
                <div className="toHome">
                    <Link className='nav-link' to="/lobby"> 로비로 돌아가기</Link>
                </div>
                <h1>마이페이지</h1>
                <hr />
                <div className="container-full">
                    <div className="container-left">
                        <div className="row">
                            <div className="mypageBtn">
                                <Button className="btn-outline-dark" onClick={() => handleButtonClick('View')}>프로필 보기</Button>
                                <Button className="btn-outline-dark" onClick={() => handleButtonClick('Modify')}>프로필 수정 및 탈퇴</Button>
                                <Button className="btn-outline-dark" onClick={() => handleButtonClick('Record')}>전적</Button>
                                <Button className="btn-outline-dark" onClick={() => handleButtonClick('Inventory')}>인벤토리</Button>
                            </div> 
                        </div>      
                    </div>
                </div>
                <div className="container-right">
                    {Mypage === 'View' && <View user={user} />}
                    {Mypage === 'Modify' && <Modify user={user} />}
                    {Mypage === 'Record' && <Record />}
                    {Mypage === 'Inventory' && <Inventory />}
                </div>  
            </div>
        </>
    );
};

export default MypageHome;
