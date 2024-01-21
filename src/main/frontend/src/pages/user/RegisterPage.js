import React from 'react';
import Register from '../../components/user/Register';
import { useParams } from 'react-router-dom';

const RegisterPage = () => {

    let params = useParams();  
    console.log(params.id);

    return (
        <div>
            <Register/>
        </div>
    );
};

export default RegisterPage;