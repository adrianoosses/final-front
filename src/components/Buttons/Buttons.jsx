import React from 'react'
import {NavLink} from 'react-router-dom'
import './Buttons.css';
import Header from '../Header/Header';

const Buttons = (props) => {
    return (
        <>
            <div className="buttonContainer">
            <NavLink to="/"><Header /></NavLink>
            <NavLink to="/profilelist">Profile List</NavLink>
            {console.log("props user", props.user)}
            {props.user ?
                <>
                    <span class="logoutText">Hi, {localStorage.getItem('email')}</span>
                    <NavLink to="/profile">Profile</NavLink>
                    
                    <NavLink to="/logout">Logout</NavLink>
                </> :
                <>
                    <NavLink to="/login">Log In</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                </>
            }
            </div>
            
        </>
    )
}
export default Buttons;