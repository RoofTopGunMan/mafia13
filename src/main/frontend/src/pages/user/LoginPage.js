import React from 'react';
import Login from '../../components/user/Login';
import { useParams } from 'react-router-dom';

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