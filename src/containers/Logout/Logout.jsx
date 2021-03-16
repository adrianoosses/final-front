import React, { useEffect }  from 'react';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';

const Logout = (props) => {
    const history = useHistory();
        localStorage.clear();
        props.setUser(null);
        history.push('/');
        const printMsg = () =>{
            try {
                notification.success({ message: 'Logged out!', description: 'Logged out!'});
            } catch (error) {
                console.error(error);
                notification.error({ message: 'Logout failed', description: 'there was a problem loging out' });
            }
    };
    useEffect(() => {
        printMsg();
    }, [])    

    return (
        <div className="contentStyle">
            <p>Logging out...</p>
        </div>
    )
}

export default Logout;