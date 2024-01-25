import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const Inventory = (props) => {

  const { userId } = useSelector((store) => store);
  
  const [inventory, setInventory] = useState([
  ]);


    useEffect(() => { 
    fetch("http://localhost:8093/mypage/inventory/item/"+ userId )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setInventory(data)
         });
}, []);


  const [gameavatar, setGameavatar] = useState({
    cloak: "",
    head: "",
    outline: "",
    
  });

//   useEffect(() => {
//     fetch("http://localhost:8080/mypage/inventory/gameavatar/10") 
//     .then(response => response.json())
//     .then(data => {
//         setGameavatar(data);
//     })
// }, []);


  // 아이템 장착 함수
  const equipItem = (item) => {
    setGameavatar((prevUser) => ({
      ...prevUser,
      gameavatar: {
        ...prevUser.gameavatar,
        [item.type]: item,
      },
    }));
  };



  // 아이템 제거 함수
  const unequipItem = (itemType) => {
    setGameavatar((gameavatar) => ({
      ...gameavatar,
      gameavatar: {
        ...gameavatar,
        [itemType]: null,
      },
    }));
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
      <div>
        머리: {gameavatar.head ? gameavatar.head.name : '없음'}{' '}
        {gameavatar.head && (
          <button onClick={() => unequipItem('head')}>해제</button>
        )}
      </div>
      <div>
        몸: {gameavatar.outline ? gameavatar.outline.name : '없음'}{' '}
        {gameavatar.outline && (
          <button onClick={() => unequipItem('outline')}>해제</button>
        )}
      </div>
      <div>
        망토: {gameavatar.cloak ? gameavatar.cloak.name : '없음'}{' '}
        {gameavatar.cloak && (
          <button onClick={() => unequipItem('cloak')}>해제</button>
        )}
      </div>

    </>
  );
};

export default Inventory;