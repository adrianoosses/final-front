import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { useHistory } from 'react-router-dom';
//import { notification } from 'antd'
import '../../App.css'
import { notification, Input } from 'antd'
import './Signup.css'


import {CURRENT_URL} from '../../App';

const Signup = () => {
    const history = useHistory();
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();
    const handleSubmit = async (event) => {
        //console.log("Registring");
        try {
            event.preventDefault();
            const form = event.target;
            const user = {         
                "name": form.name.value,
                "lastName": form.name.value,
                "password": form.password.value,
                "email": form.email.value ,
                "role": "Client",
                "birthDate": form.birthDate.value,
                "address": form.address.value,
                "phone": form.phone.value,
                "card": form.card.value,
                "createdAt": moment(currentDate).format(format), //new Date().getTime(),
                "updatedAt": moment(currentDate).format(format) //new Date().getTime()
            }
            //console.log("user: ", user);
            //console.log("type of user: ", typeof user);
            await axios.post(CURRENT_URL + '/user', user);
            //console.log("signup 1",  signupObj);
            notification.success({ message: 'Registered!', description: 'User successfully registered' })
            //history.push('/login')
            history.push('/login')
        } catch (error) {
            //console.log("signup 2",  signupObj);
            console.error("error", error);
            console.error("error.response.data.error", error.response.data.error);
            if (error.response.data.error==="weak password") notification.error({ message: 'Register failed', description: 'Weak password' })
            else notification.error({ message: 'Register failed', description: 'there was a problem trying to register the user' })
        }

    }
    return (
        <div className="generalContainerSignup">
            <div className="containerSignup">
                <div className="containerForm">
                    <form className="register" onSubmit={handleSubmit}>
                        <h2>Register:</h2>
                        <div className="textStyle"><div>Name: </div><Input className="box" type="text" name="name" placeholder="Name" /></div>
                        <div className="textStyle"><div>Last name: </div><Input className="box" type="text" name="lastName" placeholder="Last name" /></div>
                        <div className="textStyle"><div>Password:</div> <Input className="box" type="password" name="password" placeholder="Password" /></div>
                        <div className="textStyle"><div>Password must have 8-100 characteres, with uppercase and lowercase, and 2 numbers</div></div>
                        <div className="textStyle"><div>Email: </div><Input className="box" type="email" name="email" placeholder="Email" /></div>
                        <div className="textStyle"><div>Birth date: </div><Input className="box" type="text" name="birthDate" placeholder="yyyy/mm/dd" /></div>
                        <div className="textStyle"><div>Address:</div> <Input className="box" type="text" name="address" placeholder="Country Street Number" /></div>
                        <div className="textStyle"><div>Phone: </div><Input className="box" type="number" name="phone" placeholder="123 45 67 89" /></div>
                        <div className="textStyle"><div>Card:</div> <Input className="box" type="number" name="card" placeholder="1234 1234 1234 1234" /></div>
                        <button className="signupButton" type="submit">Register now!</button>
                        <p/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup