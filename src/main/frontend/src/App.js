import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Ingame from './ingame/Ingame';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'; // 꼭 import를 해와야한다

function App() {
   const [hello, setHello] = useState('')
   const [clientIngame,setIngame] = useState(false)
   const [Number, setNumber] =useState(2)
   function buttonEvent(value) {
    axios.get('/api/button',
    {
      params:{
      debug : value
     }
    })
    .then(response => setIngame(response.data))
    .catch(err=> console.log(err));
  }
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
      <>
      
        {clientIngame ? (
          <>
            <div>
              인게임 페이지입니다.
            </div>
            <Ingame 
             myNumber = {Number}
            />
          <div className="App">
            <Button as="input" type="button" value="Input" onClick={()=>buttonEvent(false)}/>{' '}
          </div>
          </>
        )
        : (
          <>
          <div>
              백엔드에서 가져온 데이터입니다 : {hello}
          </div>
          
          <div className="App">
            <Button as="input" type="button" value="Input" onClick={()=>buttonEvent(true)}/>{' '}
          </div>
        </>
        )}
      </>
      );
}

export default App;