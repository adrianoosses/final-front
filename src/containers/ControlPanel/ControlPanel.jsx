import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import moment from 'moment'
import {CURRENT_URL} from '../../App';

const ControlPanel = () => {
    const [usersList, setUsersList] = useState('');
    const getUsersList = async(event) => {
        try {

            console.log("GETTING OFER!!");
            //event.preventDefault();
            //const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
            //console.log("token", token);
            let email = localStorage.getItem('email');
            console.log('email', email);
            
            let usersListData = await axios.get(CURRENT_URL + '/user/list', 
            { headers: {authorization: token } });
            console.log("usersList", usersListData);
            console.log("usersList: ", usersListData.data[0].offer);
            setUsersList(usersListData.data);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getUsersList();
    }, []);


    return (
        <>
        {console.log("usersList",usersList)}
        
                {usersList ?
                    <>
                    <p>Users received: </p>
                    {console.log(usersList)}
                    {usersList.map( item => <>
                    <span>Product title: {item.name}-</span>
                    <span>Value: {item.title}-</span>
                    <span>Email: {item.email}</span>
                    <p></p>
                        
                        </>
                        )}
                    </>:<>
                        <p>No users yet</p>
                    </>
                } 
        </>
    )
}

export default ControlPanel;