import React from 'react'
import { notification } from 'antd'
import { useHistory } from 'react-router-dom';
const Logout = (props) => {
    const history = useHistory();
    console.log("logging out");
    try {
        localStorage.clear();
        props.setUser(null)
        
        notification.success({ message: 'Logged out!', description: 'Logged out!'});
        history.push('/');
    } catch (error) {
        console.error(error)
        notification.error({ message: 'Logout failed', description: 'there was a problem loging out' })
    }
    return (
        <div className="contentStyle">
            <p>Logging out...</p>
        </div>
    )
}

export default Logout;