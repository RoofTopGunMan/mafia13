import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import './sellInfo.css'
import SellSaveItem from './sellSaveItem';
import SellItemCard from './sellItemCard';

const SellInfo = () => {

    // 상품 값들 받아오기
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8093/admin/sellMng")
        .then(response => response.json())
        .then(data => {
            setItems(data);
        });
    }, []);

    return (
        <>
            <div className='mx-3 my-3 clearfix'>
                <h3 className='mb-3'>
                    <strong>상품 관리</strong>
                </h3>

                {/* 상품 타입별로 정렬하기 */}
                {/* 값이 변할 때마다 새로 정렬되어야 함 */}
                <Form.Select className='typeSelect' size='sm'>
                    <option value="">전체 상품</option>
                    <option value="1">테두리</option>
                    <option value="2">모자</option>
                    <option value="3">의상</option>
                    <option value="4">망토</option>
                </Form.Select>

                {/* 상품 값 뿌리기 */}
                {items.map(item => <SellItemCard key={item.id} item={item}/>)}
            </div>
            <hr style={{width: '90%', margin: 'auto'}}/>
            <SellSaveItem/>
        </>
    );
};

export default SellInfo;