import React from 'react'
import {NavLink} from 'react-router-dom'
import './Buttons.css';
import Header from '../Header/Header';
import { LoginOutlined, PlusOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import loginLogo from './login2.svg'

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
                        <NavLink to="/profile"><UserOutlined style={{ fontSize: '65px', color: 'white' }}/></NavLink>
                        <NavLink to="/sellproduct"><PlusOutlined style={{ fontSize: '65px', color: 'white' }}/></NavLink>
                        <NavLink to="/logout"><LogoutOutlined style={{ fontSize: '65px', color: 'white' }}/></NavLink>
                    </> :
                    <>
                        
                        <NavLink to="/login"><LoginOutlined style={{ fontSize: '65px', color: 'white' }}/></NavLink>
                        
                    </>
                }
                </div>
            </div>
        </>
    )
}
export default Buttons;