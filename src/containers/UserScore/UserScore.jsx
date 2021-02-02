import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
//import './Chat.css';
import {CURRENT_URL} from '../../App';
import { notification } from 'antd'
import { useHistory } from 'react-router-dom';

import { StarOutlined  } from '@ant-design/icons';
const UserScore = () => {
    const [score, setScore] = useState('');
    const [colorStarValue, setColorStarValue] = useState(['yellow', 'gray','gray', 'gray', 'gray']);
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();
    const history = useHistory();

    const setUserScore = async(scoreValue)=> {
        const dest = localStorage.getItem('dest'); // #context
        let token =  localStorage.getItem('tokenUsr')
        try {
            let destObj = await axios.get(CURRENT_URL + `/user?email=${dest}`, 
            { headers: {authorization: token} });
            //console.log("id of score:",destObj );
            const itemScore = {
                userId: destObj.data[0].id, 
                uScore: scoreValue,
                createdAt:moment(currentDate).format(format),
                updatedAt:moment(currentDate).format(format)
            }
            
            await axios.post(CURRENT_URL + `/userscore`, itemScore,
            { headers: {authorization: token} });
            //console.log("score:", score);
            notification.success({ message: 'Added!', description: 'Score to user added correctly'});
            getUserScore();
            //setScore(score.data);
        } catch (error) {
            history.push('/');
            notification.error({ message: 'Unauthorized', description: 'Log in first' })
            console.error(error)
        }
    }
    
    const getUserScore = async(event) => {
        const dest = localStorage.getItem('dest'); // #context
        try {
            let score2 = await axios.get(CURRENT_URL + `/userscore?email=${dest}`);
            let score3 = await score2.data[0].score;
            setScore(score3);
        
            if(score3 > 5 ) score3 = 5; 
            //console.log("NUMERO DE STARS:", Math.floor(score3));
            let arrStars = ['gray', 'gray', 'gray', 'gray', 'gray'];
            for(let i = 0; i < Math.floor(score3); i++){
                arrStars[i] = 'yellow';
            }
            setColorStarValue(arrStars);
        } catch (error) {
            console.error(error)
        }
    }

    

    useEffect(() => {
        getUserScore();
    }, []);

    return (
        <>
            {/*console.log("score", score)*/}
            <div className="scoreMarker">
                <StarOutlined onClick={() => setUserScore(1)} style={{ fontSize: '30px', color: colorStarValue[0] }}/>
                <StarOutlined onClick={() => setUserScore(2)} style={{ fontSize: '30px', color: colorStarValue[1] }}/>
                <StarOutlined onClick={() => setUserScore(3)} style={{ fontSize: '30px', color: colorStarValue[2] }}/>
                <StarOutlined onClick={() => setUserScore(4)} style={{ fontSize: '30px', color: colorStarValue[3] }}/>
                <StarOutlined onClick={() => setUserScore(5)} style={{ fontSize: '30px', color: colorStarValue[4] }}/>
            </div>   
        </>
    )
}

export default UserScore;