import React from 'react';
import './Header.css';
// import titleLogo from '../../images/title.png';
import titleLogo from '../../images/title.svg';

export default function Header() {
    return (
        <div className="headerItem">
            <img className="imageProps" src={titleLogo} alt="Logo" />
        </div>
    );
}
