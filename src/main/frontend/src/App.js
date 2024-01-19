import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import IngameTest from './pages/IngameTest';
import AdminPage from './pages/admin/AdminPage';
import AdminNotice from './pages/admin/AdminNotice';
import UserMng from './pages/admin/UserMng';
import SellMng from './pages/admin/SellMng';

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
        </Routes>
      </>
      );
}

export default App;