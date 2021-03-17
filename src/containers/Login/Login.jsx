import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { notification, Input } from 'antd';
import PropTypes from 'prop-types';
import './Login.css';
import CURRENT_URL from '../../constants/constants';

const Login = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [testCode, setTestCode] = useState('');
    const handleSubmit = async (event) => {
        // console.log("Logging");
        try {
            event.preventDefault();
            const msgReceived = await axios.post(`${CURRENT_URL}/user/login`, { email, password },
            { headers: { testcode: testCode } });
            const token = await msgReceived.data.token;
            // console.log("msgReceived: ", msgReceived);
            localStorage.setItem('tokenUsr', token);
            localStorage.setItem('email', email);
            // console.log("Email: ", email);
            // console.log("token rec: ", token);
            props.setUser(email);
            notification.success({ message: 'Logged!', description: 'User logged' });
            history.push('/');
        } catch (error) {
            console.error(error);
            notification.error({ message: 'Login failed', description: 'there was a problem loging' });
        }
    };
    return (
        <div className="generalContainerLogin">
            <div className="containerLogin">
            <div className="containerForm">
                <form onSubmit={handleSubmit}>
                    <h2>Login:</h2>
                    <div className="textStyle">
						<div>Email:</div>
						<Input className="box" type="text" onChange={(event) => setEmail(event.target.value)} name="email" placeholder="user@domain.com" />
                    </div>
                    <div className="textStyle">
						<div>Password:</div>
						<Input className="box" type="password" onChange={(event) => setPassword(event.target.value)} name="password" placeholder="8 or more characters" />
                    </div>
                    <div className="textStyle">
						<div>Test code:</div>
						<Input className="box" type="text" onChange={(event) => setTestCode(event.target.value)} name="text" placeholder="Test code" />
                    </div>
                    <button className="loginButton" type="submit">Login</button>
                    <p />
                </form>
                <div className="textStyle">
					Don&apos;t you have an account yet?
					<a href="/signup">Signup now!</a>
                </div>
            </div>
            </div>
        </div>
    );
};

Login.propTypes = {
	setUser: PropTypes.func.isRequired,
};

export default Login;
