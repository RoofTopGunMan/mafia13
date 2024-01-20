import React from 'react';
import "../css/mypage.css";
const View = (props) => {
    const user = props.user;
    console.log(user);
    return (
        <>
          
        
            {user.map(user =>
                
                    
                    <div className='showMyPage'>
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
                    </div> 
                
                
                
                )}
        
            </>
    );
};

export default View;