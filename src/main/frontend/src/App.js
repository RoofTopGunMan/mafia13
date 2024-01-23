import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import IngameTest from './pages/IngameTest';
import MypageHome from './pages/mypage/MypageHome';

import AdminPage from './pages/admin/AdminPage';
import AdminNotice from './pages/admin/AdminNotice';
import UserMng from './pages/admin/UserMng';
import SellMng from './pages/admin/SellMng';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import Lobby from './pages/Lobby';
import Inventory from './pages/mypage/Inventory';

function App() {
    return (
      <>
        <Routes>
            <Route path='/' Component={IngameTest}>인게임테스트</Route>
            {/* 어드민 페이지  */}
            <Route path='/admin' Component={AdminPage}></Route>
            <Route path='/admin/notice' Component={AdminNotice}></Route>
            <Route path='/admin/userMng' Component={UserMng}></Route>
            <Route path='/admin/sellMng' Component={SellMng}></Route>

            {/* 로그인 및 회원가입 */}
            <Route path="/user/login" Component={LoginPage}/>
            <Route path="/user/login/:id" Component={LoginPage}/>
            <Route path="/user/register" Component={RegisterPage}/>
            
            {/* 마이페이지 */}
          <Route path='/mypage' Component={MypageHome}>마이페이지홈</Route>
          <Route path='/mypage/inventory' Component={Inventory}></Route>
          
          {/* 로비페이지 */}
          <Route path="/lobby" Component={Lobby}>로비페이지</Route>
         </Routes>
      </>
      );
}

export default App;