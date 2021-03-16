import React from 'react';
import { NavLink } from 'react-router-dom';
import './Buttons.css';
import {
	LoginOutlined, PlusOutlined, LogoutOutlined, UserOutlined,
} from '@ant-design/icons';
import Header from '../Header/Header';

const Buttons = ({ user }) => {
    const styleButtons = {
		fontSize: '65px', color: 'white', marginTop: '10px', marginRight: '10px',
	};
    return (
        <>
            <div className="buttons">
            <div><NavLink to="/"><Header /></NavLink></div>
            <div>
                {user ?
                    <>
                        <span className="logoutText">
							Hi,
							{localStorage.getItem('email')}
						</span>
                        <NavLink to="/profile"><UserOutlined style={styleButtons} /></NavLink>
                        <NavLink to="/sellproduct"><PlusOutlined style={styleButtons} /></NavLink>
                        <NavLink to="/logout"><LogoutOutlined style={styleButtons} /></NavLink>
                    </> :
                    <>
                        
                        <NavLink to="/login"><LoginOutlined style={styleButtons}/></NavLink>
                        
                    </>
                }
                </div>
            </div>
        </>
    );
};

export default Buttons;
