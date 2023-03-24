import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../contexts/AuthContexts';

const Protected = ({ children }) => {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    const navigate = useNavigate();

    if (!currentUser || currentUser === undefined) {
        navigate('/admin')
    }
    return (
        children
    );
};

export default Protected;