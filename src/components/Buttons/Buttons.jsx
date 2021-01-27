import React from 'react'
import {NavLink} from 'react-router-dom'
import './Buttons.css';
import Header from '../Header/Header';

import loginLogo from '../../images/login2.svg';

const Buttons = (props) => {
    return (
        <>
            
            <div className="buttons">
            <div><NavLink to="/"><Header /></NavLink></div>
            <div>
                {console.log("props user", props.user)}
                {props.user ?
                    <>
                        <span class="logoutText">Hi, {localStorage.getItem('email')}</span>
                        <NavLink to="/profile">Profile</NavLink>
                        <NavLink to="/logout">Logout</NavLink>
                        <NavLink to="/sellproduct">Sell a product</NavLink>
                    </> :
                    <>
                        <div className='loginLogo'>
                        <NavLink to="/login"><img className='loginImage' src={loginLogo} alt="logoLogin" /></NavLink>
                        </div>
                    </>
                }
                </div>
            </div>
        </>
    )
}
export default Buttons;