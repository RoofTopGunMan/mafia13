import React, { useEffect, useState } from 'react';
import NoticeCard from './noticeCard';
import NoticeSave from './noticeSave';

const Notice = () => {

    // 공지들 받아오기
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8093/admin/notice")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setNotices(data);
        });
    }, []);

    return (
        <>
            <h3 className='m-3'>
                <strong>공지사항</strong>
            </h3>

            {/* 공지사항 값들을 받아와 Card로 정렬하기 */}
            {notices.map(notice => <NoticeCard key={notice.id} notice={notice}/>)}

            <hr style={{width: '90%', margin: 'auto'}}/>
            <NoticeSave/>
        </>
    );
};

export default Notice;