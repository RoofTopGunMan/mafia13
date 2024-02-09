import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Inventory = () => {
  const { userId } = useSelector((store) => store);
  const [inventory, setInventory] = useState([]);
  const [gameavatar, setGameavatar] = useState({
    head: 0,
    outline: 0,
    cloak: 0,
  });
  const gameavatarsArray = Array.isArray(gameavatar) ? gameavatar : [gameavatar];


  useEffect(() => { 
    fetch(`http://localhost:8093/mypage/inventory/item/`+ userId)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setInventory(data);
      });
  }, []);



    useEffect(() => { 
      fetch("http://localhost:8093/mypage/inventory/gameavatar/"+ userId)
        .then(response => response.json())
        .then(data => {
          setGameavatar(data);
          console.log(data);
        });
    }, []);

  

  const equipItem = (item)  => {
    setGameavatar((gameavatar) => ({
      ...gameavatar,
      [item.type]: item.id,
    }));
  };


const changeValue = (e) => {
  setGameavatar({
    ...gameavatar,
    [e.target.name]: e.target.value,
  });
};

  const saveGameavatar = (e) => {
    e.preventDefault();
    
 
    
    // put request
    fetch("http://localhost:8093/mypage/inventory/gameavatar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(gameavatar),
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

  return (
    <>
      
      {/* 인벤토리 아이템 목록 */}
      <h2>인벤토리</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item.id} onClick={() => equipItem(item)}>
            {item.name}
          </li>
        ))}
      </ul>



      {/* 유저 아바타 표시 */}
      <h2>유저 아바타</h2>
     
      <Form onSubmit={saveGameavatar}>
        <Form.Label>머리</Form.Label>
          <Form.Control className='input' type="number" onChange={changeValue} name="head" value={gameavatar.head} />
          <Form.Label>외형</Form.Label>
          <Form.Control className='input' type="number" onChange={changeValue} name="outline" value={gameavatar.outline} />
          <Form.Label>망토</Form.Label>
          <Form.Control className='input' type="number"  onChange={changeValue} name="cloak" value={gameavatar.cloak} />
        <Button variant="primary" type="submit">장착하기</Button>  
      </Form>
     
    </>
  );
};

export default Inventory;
