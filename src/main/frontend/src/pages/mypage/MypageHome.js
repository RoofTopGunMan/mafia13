import React from 'react';
import View from './View';
import { Link, Route, Routes } from 'react-router-dom';
import Modify from './Modify';
import Record from './Record';
import Inventory from './Inventory';
import Button from 'react-bootstrap/Button';
import "../css/mypage.css";

const MypageHome = () => {
    return (
        
            
<>            
        <div class="myPage">
                
        <div class="toHome">
                   <Link className='nav-link' to="/"> 로비로 돌아가기</Link>
                   <i class="fas fa-home"></i>
                </div>
                
                <h1>마이페이지</h1>
                <hr/>
                <div class="container-full">
                        <div class="container-left">
                            <div class="row">
                                <div class="col-md-3">
                                  <div class="mypageBtn">
                                    <button class="btn-outline-dark" onclick={View}>프로필 보기</button>
                                    <button class="btn-outline-dark" onclick={Modify}>프로필 수정</button>
                                    <button class="btn-outline-dark" onclick={Record}>전적</button>
                                    <button class="btn-outline-dark" onclick={Inventory}>인벤토리</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            
            
            </div>
        
        
        
        
        </>
    );
};

export default MypageHome;