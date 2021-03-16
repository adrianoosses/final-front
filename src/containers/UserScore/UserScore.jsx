import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
// import './Chat.css';
import { StarOutlined } from '@ant-design/icons';
// import { useHistory } from 'react-router-dom';
import { notification } from 'antd';
import CURRENT_URL from '../../App';

const UserScore = () => {
    const [score, setScore] = useState('');
    const [colorStarValue, setColorStarValue] = useState(['yellow', 'gray', 'gray', 'gray', 'gray']);
    const format = 'YYYY-MM-DD HH:mm:ss';
    const currentDate = new Date().getTime();
    // const history = useHistory();

	const getUserScore = async () => {
        const dest = localStorage.getItem('dest'); // #context
        try {
            const score2 = await axios.get(`${CURRENT_URL}/userscore?email=${dest}`);
            let score3 = await score2.data[0].score;
            setScore(score3);
            if (score3 > 5) score3 = 5;
            const arrStars = ['gray', 'gray', 'gray', 'gray', 'gray'];
            for (let i = 0; i < Math.floor(score3); i = i + 1) {
                arrStars[i] = 'yellow';
            }
            setColorStarValue(arrStars);
        } catch (error) {
            console.error(error);
        }
    };

    const setUserScore = async (scoreValue) => {
        const dest = localStorage.getItem('dest'); // #context
        const token = localStorage.getItem('tokenUsr');
        try {
            const destObj = await axios.get(`${CURRENT_URL}/user?email=${dest}`,
            { headers: { authorization: token } });
            const itemScore = {
                userReceive: destObj.data[0].id,
                uScore: scoreValue,
                createdAt: moment(currentDate).format(format),
                updatedAt: moment(currentDate).format(format),
            };
            await axios.post(`${CURRENT_URL}/userscore`, itemScore,
            { headers: { authorization: token } });
            notification.success({ message: 'Added!', description: 'Score to user added correctly' });
            getUserScore();
            // setScore(score.data);
        } catch (error) {
			if (error.response.data.error === 'Cannot set score yourself') notification.error({ message: 'Set score failed', description: 'Cannot set score yourself' });
            console.error(error);
        }
    };
    useEffect(() => {
        getUserScore();
    }, []);

    return (
        <>
            <div className="scoreMarker">
                <StarOutlined onClick={() => setUserScore(1)} style={{ fontSize: '30px', color: colorStarValue[0] }} />
                <StarOutlined onClick={() => setUserScore(2)} style={{ fontSize: '30px', color: colorStarValue[1] }} />
                <StarOutlined onClick={() => setUserScore(3)} style={{ fontSize: '30px', color: colorStarValue[2] }} />
                <StarOutlined onClick={() => setUserScore(4)} style={{ fontSize: '30px', color: colorStarValue[3] }} />
                <StarOutlined onClick={() => setUserScore(5)} style={{ fontSize: '30px', color: colorStarValue[4] }} />
            </div>
        </>
    );
};

export default UserScore;
