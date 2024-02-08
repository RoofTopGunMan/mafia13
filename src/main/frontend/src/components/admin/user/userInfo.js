import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import './userInfo.css';
import UserTable from './userTable';


const UserInfo = () => {

    // 선택된 유저들
    const [users, setUsers] = useState([]);

    const SelectUser = (e) => {

    }


    // 유저 검색 기능

    // 유저 정렬 기능

    // 유저 정보 변경 기능


    return (
        <>
            <div className='m-2'>
                <h3><strong>전체 회원 관리</strong></h3>

                <Form>
                    <div className='my-5 mb-2'>
                        <label>유저검색: </label>
                        {/* onClick 으로 정렬되게 만들기 */}
                        <input className='userSearch' onClick={""}/>
                        <button className='searchButton'>검색</button>
                        {/* onChange로 정렬되게 하기 */}
                        <Form.Select className='usertype' size='sm' onChange={""}>
                            <option value="">전체</option>
                            <option value="1">ADMIN</option>
                            <option value="2">MEMBER</option>
                            <option value="3">DELETE</option>
                        </Form.Select>
                    </div>
                </Form>
        
                <div className='mb-2'>
                    <UserTable/>
                </div>

                <div className='changeUserInfo'>
                    {/* onSubmit 하면 변경값이 반영되게 하기 */}
                    <Form onSubmit={""}>
                        <input className='userSearch' type='number' name="gamemoney"/>
                        <select className='userSearch'name='authority'>
                            <option value="MEMBER">MEMBER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                        {/* onClick 만들기 */}
                        <Button className='searchButton' variant='secondary' size='sm' type='submit'>반영</Button>
                        <Button className='searchButton' variant='danger' size='sm' onClick={""}>탈퇴</Button>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default UserInfo;

function SelectUser() {
    return 
}