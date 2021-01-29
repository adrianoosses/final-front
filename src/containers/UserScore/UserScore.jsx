import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment'
//import './Chat.css';
import {CURRENT_URL} from '../../App';
import {ProductContext} from '../ProductContext/ProductContext';
import { notification, Input } from 'antd'

import { StarOutlined  } from '@ant-design/icons';
const UserScore = () => {
    const [score, setScore] = useState('');
    const [stars, setStars] = useState(0);
    const [colorStarValue, setColorStarValue] = useState(['yellow', 'gray','gray', 'gray', 'gray']);
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();
    
    //const {dest} = useContext(ProductContext); // #context
    //const dest = localStorage.getItem('dest');

    const setUserScore = async(scoreValue)=> {
        const dest = localStorage.getItem('dest'); // #context
        try {
            //event.preventDefault();
            //const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
           // console.log("token", token);

            //let dest = localStorage.getItem('seller');
            console.log("dest1: ", dest)
            let email = localStorage.getItem('email');
            //let destObj = await axios.get(`http://127.0.0.1:3001/user?email=${email}`);
            let destObj = await axios.get(CURRENT_URL + `/user?email=${dest}`);
            console.log("id of score:",destObj );
            const itemScore = {
                userId: destObj.data[0].id, 
                uScore: scoreValue,
                createdAt:moment(currentDate).format(format),
                updatedAt:moment(currentDate).format(format)
            }
            
            let score = await axios.post(CURRENT_URL + `/userscore`, itemScore);
            console.log("score:", score);
            notification.success({ message: 'Added!', description: 'Score to user added correctly'});
            getUserScore();
            //setScore(score.data);
        } catch (error) {
            console.error(error)
        }
    }
    
    const getUserScore = async(event) => {
        const dest = localStorage.getItem('dest'); // #context
        try {
            console.log("sending msg");
            //event.preventDefault();
            //const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
            //console.log("token", token);
            console.log("GET SCORE !!!!!!!!!!!!!!");
            let email = localStorage.getItem('email');
            console.log('email', email);
            let score2 = await axios.get(CURRENT_URL + `/userscore?email=${dest}`);
            console.log("score2222", score2);
            console.log("scoreFinal: ", score2.data[0].score);
            let score3 = await score2.data[0].score;
            setScore(score3);
        
            if(score3 > 5 ) score3 = 5; 
            setStars(Math.floor(score3));
            console.log("NUMERO DE STARS:", Math.floor(score3));
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
            {console.log("score", score)}
                
            <StarOutlined onClick={() => setUserScore(1)} style={{ fontSize: '50px', color: colorStarValue[0] }}/>
            <StarOutlined onClick={() => setUserScore(2)} style={{ fontSize: '50px', color: colorStarValue[1] }}/>
            <StarOutlined onClick={() => setUserScore(3)} style={{ fontSize: '50px', color: colorStarValue[2] }}/>
            <StarOutlined onClick={() => setUserScore(4)} style={{ fontSize: '50px', color: colorStarValue[3] }}/>
            <StarOutlined onClick={() => setUserScore(5)} style={{ fontSize: '50px', color: colorStarValue[4] }}/>
                       
        </>
    )
}

export default UserScore;