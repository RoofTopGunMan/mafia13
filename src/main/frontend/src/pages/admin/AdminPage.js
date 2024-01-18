import React from 'react';
import Header from '../../components/Header';
import AdminHome from './AdminHome';
import { Route, Routes } from 'react-router-dom';
import Notice from './Notice';
import UserMng from './UserMng';
import SellMng from './SellMng';
import UserRecord from './UserRecord';

const AdminPage = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/admin' Component={AdminHome}></Route>   
                <Route path='/admin/notice' Component={Notice}></Route>
                <Route path='/admin/userMng' Component={UserMng}></Route>
                <Route path='/admin/sellMng' Component={SellMng}></Route>
                <Route path='/admin/userRecord' Component={UserRecord}></Route>
            </Routes>
        </>
    );
};

export default AdminPage;