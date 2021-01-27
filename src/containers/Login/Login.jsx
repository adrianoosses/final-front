import React, {useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { notification } from 'antd'

import './Login.css'


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
        <div className="generalContainerLogin">
            <div className="containerLogin">
            <div className="containerForm">
                <form onSubmit={handleSubmit}>
                    <h2>Login:</h2>
                    <div className="textStyle" ><div>Email:</div> <input className="box" type="text" onChange={event=>setEmail(event.target.value)} name="email" placeholder="user@domain.com" /></div>
                    <div className="textStyle" ><div>Password:</div> <input className="box" type="password" onChange={event=>setPassword(event.target.value)} name="password" placeholder="8 or more characters" /></div>
                    <button className="loginButton" type="submit">Login</button>
                    <p/>
                    
                </form>
                <div className="textStyle" >Don't you have and account yet? <a href='/signup'>Signup now!</a></div>
                </div>
            </div>
            
        </div>
    )
}

export default Login