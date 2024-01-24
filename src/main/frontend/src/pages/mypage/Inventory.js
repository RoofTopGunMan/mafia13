import React, { useEffect, useState } from 'react';

const Inventory = () => {
  
  
  const [user, setUser] = useState({
    gameavatar: {
      head: "",
      outline: "",
      cloak: "",
    },
  });

//   useEffect(() => { 
//     fetch("http://localhost:8093/mypage/inventory")
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             setGameavatar(data)
//          });
// }, []);




  const [inventory, setInventory] = useState([
    { id: 1, name: "Headgear 1", type: "head" },
    { id: 2, name: "Headgear 2", type: "head" },
    { id: 3, name: "Headgear 3", type: "head" },
    { id: 4, name: "outline 1", type: "outline" },
    { id: 5, name: "outline 2", type: "outline" },
    { id: 6, name: "outline 3", type: "outline" },
    { id: 7, name: "Cloak 1", type: "cloak" },
    { id: 8, name: "Cloak 2", type: "cloak" },
    { id: 9, name: "Cloak 3", type: "cloak" },
    // ... 다양한 아이템 정보 추가
  ]);


  //   useEffect(() => { 
//     fetch("http://localhost:8093/mypage/item/{id}")
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             setInventory(data)
//          });
// }, []);


 


  // 아이템 장착 함수
  const equipItem = (item) => {
    setUser((prevUser) => ({
      ...prevUser,
      gameavatar: {
        ...prevUser.gameavatar,
        [item.type]: item,
      },
    }));
  };



  // 아이템 제거 함수
  const unequipItem = (itemType) => {
    setUser((prevUser) => ({
      ...prevUser,
      gameavatar: {
        ...prevUser.gameavatar,
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
        머리: {user.gameavatar.head ? user.gameavatar.head.name : '없음'}{' '}
        {user.gameavatar.head && (
          <button onClick={() => unequipItem('head')}>해제</button>
        )}
      </div>
      <div>
        몸: {user.gameavatar.outline ? user.gameavatar.outline.name : '없음'}{' '}
        {user.gameavatar.outline && (
          <button onClick={() => unequipItem('outline')}>해제</button>
        )}
      </div>
      <div>
        망토: {user.gameavatar.cloak ? user.gameavatar.cloak.name : '없음'}{' '}
        {user.gameavatar.cloak && (
          <button onClick={() => unequipItem('cloak')}>해제</button>
        )}
      </div>

    </>
  );
};

export default Inventory;