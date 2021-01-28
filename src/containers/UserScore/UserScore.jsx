import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
//import './Chat.css';
import {CURRENT_URL} from '../../App';

const UserScore = () => {
    const [score, setScore] = useState('');
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();

    const setUserScore = async(event)=> {
        try {
            event.preventDefault();
            const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
           // console.log("token", token);

            let dest = localStorage.getItem('seller');
            console.log("dest1: ", dest)
            let email = localStorage.getItem('email');
            //let destObj = await axios.get(`http://127.0.0.1:3001/user?email=${email}`);
            let destObj = await axios.get(CURRENT_URL + `/user?email=${dest}`);
            const itemScore = {
                userId: destObj.data[0].id, 
                uScore: form.sentScore.value,
                createdAt:moment(currentDate).format(format),
                updatedAt:moment(currentDate).format(format)
            }
            let score = await axios.post(CURRENT_URL + `/userscore`, itemScore);
            console.log("score:", score);
            //setScore(score.data);
        } catch (error) {
            console.error(error)
        }
    }
    
    const getUserScore = async(event) => {
        try {
            console.log("sending msg");
            //event.preventDefault();
            //const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
            //console.log("token", token);
            let email = localStorage.getItem('email');
            console.log('email', email);
            let dest = localStorage.getItem('seller');
            let score2 = await axios.get(CURRENT_URL + `/userscore?email=${dest}`);
            console.log("score2222", score2);
            console.log("scoreFinal: ", score2.data[0].score);
            setScore(score2.data[0].score);
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
                {score ?
                    <>
                        <p>User score: {score}</p>
                    </>:<>
                        <p>No score yet</p>
                    </>
                }
                <form className="send" onSubmit={setUserScore}>
                    <span>Score: <input type="number" name="sentScore"/></span>
                    <button type="submit">Send</button>
                </form>         
        </>
    )
}

export default UserScore;