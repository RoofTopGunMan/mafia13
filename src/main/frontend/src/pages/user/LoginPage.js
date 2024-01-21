import React from 'react';
import { useParams } from 'react-router-dom';
import Login from '../../components/user/Login';

const LoginPage = () => {

    let params = useParams();  
    console.log(params.id);

    return (
        <div>
        <Login/>
        </div>
    );
};

export default LoginPage;