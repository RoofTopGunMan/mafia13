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

function App() {
    return (
      <>
        <Routes>
            <Route path='/' Component={IngameTest}>인게임테스트</Route>
            <Route path='/mypage' Component={MypageHome}>마이페이지홈</Route>
            
            {/* 어드민 페이지  */}
            <Route path='/admin' Component={AdminPage}></Route>
            <Route path='/admin/notice' Component={AdminNotice}></Route>
            <Route path='/admin/userMng' Component={UserMng}></Route>
            <Route path='/admin/sellMng' Component={SellMng}></Route>

            {/* 로그인 및 회원가입 */}
            <Route path="/login" Component={LoginPage}/>
            <Route path="/login/:id" Component={LoginPage}/>
            <Route path="/register" Component={RegisterPage}/>
        </Routes>
      </>
      );
}

export default App;