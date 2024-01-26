import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import IngameTest from './pages/IngameTest';
import MypageHome from './pages/mypage/MypageHome';

import AdminPage from './pages/admin/AdminPage';
import AdminNotice from './pages/admin/AdminNotice';
import AdminNoticeDetail from './pages/admin/AdminNoticeDetail';
import UserMng from './pages/admin/UserMng';
import SellMng from './pages/admin/SellMng';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import NoticeUpdate from './components/admin/notice/noticeUpdate';

import Lobby from './pages/Lobby';
import Inventory from './pages/mypage/Inventory';

function App() {
    return (
      <>
        <Routes>
            <Route path='/' Component={IngameTest}>인게임테스트</Route>

            {/* 어드민 페이지  */}
            <Route path='/admin' Component={AdminPage}></Route> {/* 관리자 홈 */}
            <Route path='/admin/notice' Component={AdminNotice}></Route> {/* 관리자 공지 */}
            <Route path='/admin/notice/:id' Component={AdminNoticeDetail}></Route> {/* 관리자 공지,알림 상세 */}
            <Route path='/admin/updateNotice/:id' Component={NoticeUpdate}></Route> {/* 관리자 공지 수정 */}
            <Route path='/admin/userMng' Component={UserMng}></Route> {/* 관리자 유저관리 */}
            <Route path='/admin/sellMng' Component={SellMng}></Route> {/* 관리자 상품관리 */}

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