import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { Accordion, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './sellInfo.css'

const SellSaveItem = () => {

    const navigate = useNavigate();

    const [item, setItem] = useState({
        name: "",
        type: "",
        price: "",
        state: "",
        attachment: [],
    });

    // 이미지 저장용
    const [img, setImg] = useState([]);


    const submitItem = (e) => {
        e.preventDefault();

        // 값 보내기
        fetch("http://localhost:8093/admin/sellMng", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(item),
        })
        .then(response => {
            if(response.status === 201) {
                return response.json();
            } else return null;
        })
        .then(data => {
            if(data !== null) {
                alert("아이템이 정상적으로 등록되었습니다!");
                window.location.replace("/admin/sellMng");
            } else alert("아이템을 등록하지 못했습니다.");
        })

    }

    const changeValue = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value,
        })
    }

    // 이미지용 onChange
    const onChange = (imageList, addUpdateIndex) => {
        // 확인용
        console.log(imageList, addUpdateIndex);
        setImg(imageList);
    }

    return (
        <>
            <Accordion className='accordion' defaultActiveKey="0">
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>상품 추가</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={submitItem}>
                            <Form.Group className='mb-3'>
                                <ImageUploading multiple value={img} onChange={onChange} dataURLKey='data_url' name='attachment'>
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    <div>
                                      <button className='btn btn-secondary mb-2'
                                        style={isDragging ? { color: 'navy' } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                      >
                                        Click or Drop here your Img
                                      </button>
                                      &nbsp;
                                      {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                          <img src={image['data_url']} alt="" width="100" />
                                          <div className="image-item__btn-wrapper">
                                            <Button size='sm' onClick={() => onImageUpdate(index)}>O</Button>
                                            <Button variant='danger' size='sm' onClick={() => onImageRemove(index)}>X</Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                    )}
                                </ImageUploading>
                                <Form.Label>상품 이름</Form.Label>
                                <Form.Control className='input' type='text' placeholder='상품 이름 입력란' onChange={changeValue} name='name'/>
                                <Form.Label>가격</Form.Label>
                                <Form.Control className='input' type='number' placeholder='가격 입력란' onChange={changeValue} name='price'/>
                                <Form.Label>아이템부위</Form.Label>
                                <Form.Select className='input' onChange={changeValue} name='type'>
                                    <option value="OUTLINE">테두리</option>
                                    <option value="HEAD">머리</option>
                                    <option value="BODY">몸</option>
                                    <option value="CLOAK">망토</option>
                                </Form.Select>
                                <Form.Label>아이템분류</Form.Label>
                                <Form.Select className='input' onChange={changeValue} name='state'>
                                    <option value={0}>상품아이템</option>
                                    <option value={1}>인게임아이템</option>
                                </Form.Select>
                            </Form.Group>
                            {/* 버튼 누르면 입력된 값이 DB에 추가되도록 하기 */}
                            <Button variant='secondary' size="sm" type='submit'>등록하기</Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default SellSaveItem;