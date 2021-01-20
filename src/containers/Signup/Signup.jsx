import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { useHistory } from 'react-router-dom';
//import { notification } from 'antd'
import '../../App.css'

const Signup = () => {
    const history = useHistory();
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();
    const handleSubmit = async (event) => {
        console.log("Registring");
        try {
            event.preventDefault();
            const form = event.target;
            const user = {         
                "name": form.name.value,
                "lastName": form.name.value,
                "password": form.password.value,
                "email": form.email.value ,
                "role": form.role.value,
                "birthDate": form.birthDate.value,
                "address": form.address.value,
                "phone": form.phone.value,
                "card": form.card.value,
                "createdAt": moment(currentDate).format(format), //new Date().getTime(),
                "updatedAt": moment(currentDate).format(format) //new Date().getTime()
            }
            console.log("user: ", user);
            console.log("type of user: ", typeof user);
            await axios.post('http://127.0.0.1:3001/user', user)
            //notification.success({ message: 'Registered!', description: 'User successfully registered' })
            //history.push('/login')
            history.push('/')
        } catch (error) {
            console.error(error)
            //notification.error({ message: 'Register failed', description: 'there was a problem trying to register the user' })
        }

    }
    return (
        <div className="contentStyle">
            <form className="register" onSubmit={handleSubmit}>
                <h2>Register:</h2>
                <p>Name: <input type="text" name="name" placeholder="Name" /></p>
                <p>Last name: <input type="text" name="lastName" placeholder="Name" /></p>
                <p>Password: <input type="password" name="password" placeholder="Password" /></p>
                <p>Email: <input type="email" name="email" placeholder="Email" /></p>
                <p>Role: <input type="text" name="role" placeholder="Role" /></p>
                <p>Birth date: <input type="text" name="birthDate" placeholder="yyyy/mm/dd" /></p>
                <p>Address: <input type="text" name="address" placeholder="Country Street Number" /></p>
                <p>Phone: <input type="number" name="phone" placeholder="123 45 67 89" /></p>
                <p>Card: <input type="number" name="card" placeholder="1234 1234 1234 1234" /></p>
                <button type="submit">Register now!</button>
                <p/>
            </form>
        </div>
    )
}

export default Signup