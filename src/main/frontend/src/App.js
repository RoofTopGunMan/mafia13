import { Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import AdminPage from './pages/admin/AdminPage';
import IngameTest from './pages/IngameTest';
import MypageHome from './pages/mypage/MypageHome';

function App() {
    return (
      <>
        <Routes>
            <Route path='/' Component={IngameTest}>인게임테스트</Route>
          <Route path='/admin' Component={AdminPage}>홈</Route>
          <Route path='/mypage' Component={MypageHome}>마이페이지홈</Route>
        </Routes>
      </>
      );
}

export default App;