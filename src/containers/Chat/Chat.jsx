import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Chat.css';
import { useHistory } from 'react-router-dom';
import { notification, Input } from 'antd'
import { CURRENT_URL } from '../../constants/constants';
// const WebSocket = require('ws');

const Chat = () => {
    const [chats, setChat] = useState('');
    const format = 'YYYY-MM-DD HH:mm:ss';
    const currentDate = new Date().getTime();
    const history = useHistory();

    // Create WebSocket connection.
    // const socket = new WebSocket('ws://'+ CURRENT_URL);
    const socket = new WebSocket('ws://localhost:3001');
    let ctr = 0;
    let prevTs = 0;
    // Connection opened
   /* socket.addEventListener('open', function (event) {
        socket.send('Hello Server!');
    }); */

    // Listen for messages
    socket.addEventListener('message', function (event) {
        // console.log('Message from server ', event.data);
        // console.log('All of event: ', event);
        // console.log("event.data", typeof(event.data))
        let objChat = [];
        if (event) objChat = JSON.parse(event.data);
        // console.log("objRec: ", objChat);
        // ctr++;
        // console.log("CTR", ctr);
        // console.log("event.timeStamp", event.timeStamp);
        // console.log("objChat.chatDate", objChat.chatDate);
        // console.log("prevTs ", prevTs);
        
        if (objChat.chatDate !== prevTs) {
            //getChat(); // #Firefox: comment
            prevTs = objChat.chatDate;
        }
    });

    const getChat = async()=> {
        try {
            const token = localStorage.getItem('tokenUsr');
            const dest = localStorage.getItem('dest');
            const email = localStorage.getItem('email');
            const destEmail = dest;
            const chat = await axios.get(`${CURRENT_URL}/chat?srcemail=${email}&dstemail=${destEmail}`,
            { headers: { authorization: token } });
            setChat(chat.data);
        } catch (error) {
            history.push('/');
            notification.error({ message: 'Unauthorized', description: 'Log in first' });
            console.error(error);
        }
    };
    
    const sendMessage = async(event) => {
        try {
            event.preventDefault();
            const form = event.target;
            // sendMessage2(form.message.value);
            socket.send(form.message.value);
            const token = localStorage.getItem('tokenUsr')
            const email = localStorage.getItem('email');
            const srcObj = await axios.get(`${CURRENT_URL}/user?email=${email}`);
            const srcId = srcObj.data[0].id;
            const dest = localStorage.getItem('dest'); // #context
            const destEmail = dest
            const destObj = await axios.get(`${CURRENT_URL}/user?email=${destEmail}`,
            { headers: { authorization: token } });
            const destId = destObj.data[0].id;
            const chatItem = { 
                source: srcId,
                destination: destId,
                chatDate: moment(currentDate).format(format),
                message:form.message.value,
                createdAt: moment(currentDate).format(format),
                updatedAt: moment(currentDate).format(format)
            }
            // socket.send(chatItem);
            socket.send(JSON.stringify(chatItem));
            await axios.post(`${CURRENT_URL}/chat`, chatItem,
            { headers: { authorization: token } });        
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getChat();
    }, []);

    return (
        <>
            <h2>
				Chat with: 
				{ localStorage.getItem('dest') }
			</h2>
            {/*<div>{value}</div>*/}
            <div className ="generalContainerChat">
            <div className ="containerChat">
            {/* console.log("CHATSSS:", chats) */}
                {chats.length ?
                    <>
                        <div className="chatsContainer">
                        {chats.map((item) => <>  
                                <div className={((item.User.email===localStorage.getItem('email'))?'messageSource':'messageDestination')}> {item.message} </div>
                                <div className={((item.User.email===localStorage.getItem('email'))?'messageSource':'messageDestination')}> {item.chatDate}</div> 
                                <p/>
                            </>
                            )
                        }
                        </div>
                    </>:<>
                        <p>No chat yet</p>
                    </>
                }
                <form className="send" onSubmit={sendMessage}>
                    <p>
						Message: 
						<Input type="text" name="message"/>
					</p>
                    <button type="submit">Send</button>
                </form>  
                </div>
            </div>       
        </>
    )
};

export default Chat;
