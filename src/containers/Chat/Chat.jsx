import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import './Chat.css';

const Chat = () => {
    const [chats, setChat] = useState('');
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();
    const getChat = async()=> {
        try {
            let token =  localStorage.getItem('tokenUsr')
            console.log("token", token);
            console.log("get profile");
            let email = localStorage.getItem('email');
            let dest = localStorage.getItem('seller');
            //let destObj = await axios.get(`http://127.0.0.1:3001/user?email=${dest}`);
            let chat = await axios.get(`http://127.0.0.1:3001/chat?srcemail=${email}&dstemail=${dest}`,
            { headers: {authorization: token} });
            //let chat = await axios.get(`http://127.0.0.1:3001/chat?userid=${destObj.data[0].id}`, 
            
            //console.log("chat2:", chat);
            setChat(chat.data);
        } catch (error) {
            console.error(error)
        }
    }
    
    const sendMessage = async(event) => {
        try {
            console.log("sending msg");
            event.preventDefault();
            const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
            console.log("token", token);
            console.log("get profile");
            let email = localStorage.getItem('email');
            let srcObj = await axios.get(`http://127.0.0.1:3001/user?email=${email}`);
            console.log("srcObj", srcObj);
            const srcId = srcObj.data[0].id;
            let dest = localStorage.getItem('seller');
            let destObj = await axios.get(`http://127.0.0.1:3001/user?email=${dest}`);
            console.log("destObj", destObj);
            const destId = destObj.data[0].id;
            const chatItem = { 
                source:srcId , 
                destination:destId,
                chatDate: moment(currentDate).format(format),
                message:form.message.value,
                createdAt: moment(currentDate).format(format),
                updatedAt: moment(currentDate).format(format)
            }
            console.log("chatItem", chatItem);
            await axios.post(`http://127.0.0.1:3001/chat`, chatItem);
            
                //document.title = `You clicked ${count} times`;
            getChat();
            
            //this.setState({chats: await chat.data})
            //history.push('/');
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        //document.title = `You clicked ${count} times`;
        getChat();
    }, []);

    return (
        <>
            <h2>Chat</h2>
            <div className = "generalContainerChat">
            <div className = "containerChat">
                {chats.length ?
                    <>
                        <div className="chatsContainer">
                        {chats.map((item) => <>  
                                <span>{/*item.sourceemail*/} </span> 
                                <span> {/*item.destinationemail*/}</span>
                                <div className={((item.sourceemail===localStorage.getItem('email'))?'messageSource':'messageDestination')}> {item.message} </div>
                                <div className={((item.sourceemail===localStorage.getItem('email'))?'messageSource':'messageDestination')}> {item.chatDate}</div> 
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
                    <p>Message: <input type="text" name="message"/></p>
                    <button type="submit">Send</button>
                </form>  
                </div>
            </div>       
        </>
    )
}

export default Chat;

