import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import moment from 'moment'
import {CURRENT_URL} from '../../App';

const ControlPanel = () => {
    const [usersList, setUsersList] = useState('');
    const getUsersList = async(event) => {
        try {
            let token =  localStorage.getItem('tokenUsr')
            let usersListData = await axios.get(CURRENT_URL + '/user/list', 
            { headers: {authorization: token } });
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
                {usersList ?
                    <>
                    <p>Users received: </p>
                    {usersList.map( item => <>
                    <span>Email: {item.email}</span>
                    {item.Products.map(prod => <>
                        <br/>
                        <t></t><span>Product title: {prod.title}-</span>
                        <t></t><span>Value: {prod.price}-</span>
                    </>
                    )}
                    
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