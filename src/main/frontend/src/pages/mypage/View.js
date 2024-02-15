import React from 'react';
import "../css/mypage.css";
import { Button } from 'react-bootstrap';

const View = (props) => {
    const user = props.user;

    // user가 배열이 아닌 경우 배열로 변환하여 처리
    const usersArray = Array.isArray(user) ? user : [user];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}년${month}월${day}일`;
    };

    return (
        <> 
            {usersArray.map((user, index) => (
                <div key={index} className='showMyPage'>
                    <div className="label">
                        <div className="input">아이디:</div>
                        <div className="answer" >{user.username}</div>
                    </div>
                    <div className="label">
                        <div className="input">비밀번호:</div>
                        <div className="answer">
                          <div style={{ visibility: 'hidden' }} >{user.password}</div>
                        </div>
                    </div>
                    <div className="label">
                        <div className="input">이름:</div>
                        <div className="answer">{user.name}</div>
                    </div>
                    <div className="label">
                        <label className="input">이메일:</label>
                        <div className="answer" >{user.email}</div>
                    </div>
                    <div className="label">
                        <label className="input">가입일:</label>
                        {formatDate(user.createAt)} {/* createAt 값을 'yyyy년MM월dd일' 형식으로 표시 */}
                    </div>
            

                
                </div>
            ))}
        </>
    );
};

export default View;
