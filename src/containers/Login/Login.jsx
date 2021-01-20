import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { notification } from 'antd'


const Login = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        console.log("Logging");
        try {
            event.preventDefault();
            let msgReceived = await axios.post('http://127.0.0.1:3001/user/login', {email, password});
            let token = await msgReceived.data.token;
            console.log("msgReceived: ", msgReceived);
            localStorage.setItem('tokenUsr', token);
            localStorage.setItem('email', email);
            console.log("Email: ", email);
            //console.log("token rec: ", token);
            props.setUser(email);
            notification.success({ message: 'Logged!', description: 'User logged'});
            history.push('/');
        } catch (error) {
            console.error(error)
            notification.error({ message: 'Login failed', description: 'there was a problem loging' })
        }
    }
    return (
        <div className="contentStyle">
            <form className="register" onSubmit={handleSubmit}>
                <h2>Login:</h2>
                <p>Email: <input type="text" onChange={event=>setEmail(event.target.value)} name="email" placeholder="user@domain.com" /></p>
                <p>Password: <input type="password" onChange={event=>setPassword(event.target.value)} name="password" placeholder="8 or more characters" /></p>
                <button type="submit">Login</button>
                <p/>
            </form>
        </div>
    )
}

export default Login