import React from 'react';
import "../css/mypage.css";

const View = (props) => {
    const user = props.user;

    // user가 배열이 아닌 경우 배열로 변환하여 처리
    const usersArray = Array.isArray(user) ? user : [user];

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
                        <div className="answer">{user.password}</div>
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
                        <div className="answer" >{user.createAt}</div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default View;
