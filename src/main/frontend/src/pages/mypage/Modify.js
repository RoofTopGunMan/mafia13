import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Modify = () => {
    const [user, setUser] = useState({
        name: "",
        password: "",
        state: 0,
    });
    const { userId } = useSelector((state) => state);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}년${month}월${day}일`;
    };

    useEffect(() => { 
        fetch("http://localhost:8093/mypage/" + userId  )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUser(data)
             });
    }, []);

    // 프로필 수정 
    const changeValue = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value,
        });
    }
    
    const submitUser = (e) => {
        e.preventDefault();
        // put request
        fetch("http://localhost:8093/mypage", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(user),
        }).then(response => {
            console.log('response', response);
            if (response.status === 200) {
                return response.json();
            } else {
                return null;
            }
        }).then(data => {
            if (data != null) {
                console.log(data);
            } else {
                alert("등록실패");
            }
        })
    };



    // 회원 탈퇴
    const deleteUser = (e) => {
        e.preventDefault();
        setUser({
            ...user,
            status: 1
        });
        // put request
        fetch("http://localhost:8093/mypage", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(user),
        }).then(response => {
            console.log('response', response);
            if (response.status === 200) {
                return response.json();
            } else {
                return null;
            }
        }).then(data => {
            if (data != null) {
                console.log(data);
                alert("회원 탈퇴 성공.");
            } else {
                alert("탈퇴실패");
            }
        })
    };





    return (
        <>
            <Form onSubmit={submitUser}>
            <div className='showMyPage'>
                <div className="label">
                    <div className="input">아이디:</div>
                    <div className="answer" >{user.username}</div>
                </div>
                <div className="label">
                        <div className="input">비밀번호:</div>
                        <div className="answer">
                          <div>{user.password}</div>
                        </div>
                    </div>
                <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>이름</Form.Label>
                    <Form.Control type="text"  onChange={changeValue} name="name" value={user.name} />
                </Form.Group>
                <div className="label">
                        <label className="input">이메일:</label>
                        <div className="answer" >{user.email}</div>
                    </div>
                    <div className="label">
                        <label className="input">가입일:</label>
                        {formatDate(user.createAt)} {/* createAt 값을 'yyyy년MM월dd일' 형식으로 표시 */}
                    </div>
                <br/>
                <div className="button-container">
                    <Button variant="primary" type="submit" className="mr-2">
                        수정하기
                    </Button>
                    &nbsp;&nbsp;
                    <Button variant="primary" type="submit" onClick={deleteUser}>
                        회원 탈퇴
                    </Button>
                </div>
            </div>    

            
            </Form>  
            
        </>
    );
};

export default Modify;