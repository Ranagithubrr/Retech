import { useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../contexts/AuthContexts';

const Protected = ({ children }) => {
    const {currentUser} = useContext(AuthContext);    
    const navigate = useNavigate();

    if (!currentUser || currentUser === undefined) {
        navigate('/admin')
    }
    return (
        children
    );
};

export default Protected;