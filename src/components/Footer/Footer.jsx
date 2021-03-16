import React from 'react';
import './Footer.css';
import { LinkedinOutlined, GithubOutlined } from '@ant-design/icons';

export default function Footer() {
    return (
        <div className="footerContainer">
            <div className="contentFooter">
                <div style={{ fontSize: '18px', color: 'rgb(86, 79, 153)' }}>All rights reserved</div>
                <div style={{ fontSize: '18px', color: 'rgb(86, 79, 153)' }}>
					<LinkedinOutlined />
					https://www.linkedin.com/in/adriano-osses/
				</div>
                <div style={{ fontSize: '18px', color: 'rgb(86, 79, 153)' }}>
					<GithubOutlined />
					https://github.com/adrianoosses
				</div>
            </div>
        </div>
    );
}
