import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
//import './Chat.css';
import { useHistory } from 'react-router-dom';
import {CURRENT_URL} from '../../App';
import { notification, Input } from 'antd'
import './Offer.css'
import { MessageOutlined } from '@ant-design/icons';

const Offer = (props) => {
    const history = useHistory();
    const [offer, setOffer] = useState('');
    const [sellerEmail, setSellerEmail] = useState('');
    const [product, setProduct] = useState('');
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();

    const addOffer = async(event)=> {
        try {
            let token =  localStorage.getItem('tokenUsr')
            event.preventDefault();
            const form = event.target;
            let product = props.productSel;
            const itemOffer = {
                productId: product.id,
                offerValue: form.addoffer.value,
                createdAt:moment(currentDate).format(format),
                updatedAt:moment(currentDate).format(format)
            }
            await axios.post(CURRENT_URL + '/offer', itemOffer, 
            { headers: {authorization: token } });
            notification.success({ message: 'Sent!', description: 'Offer sent correctly'});
        } catch (error) {
            history.push('/');
            notification.error({ message: 'Unauthorized', description: 'Log in first' })
            console.error(error)
        }
    }
    async function getOffer() {
        try {
            let token =  localStorage.getItem('tokenUsr')
            if(props.productSel){
                let sellerEmailRec = props.sellerSel.email;
                setSellerEmail(sellerEmailRec);
                if(props) {
                    let itemOffer = await axios.get(CURRENT_URL + `/offer?productid=${props.productSel.id}`, 
                    { headers: {authorization: token } });
                    setOffer(itemOffer.data);
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const openChatBuyer2 = (destChat) =>{
        localStorage.setItem('dest', destChat);
        history.push('/chat');
    }

    useEffect(() => {
        getOffer();
    }, []);


    return (
        <>
        {props.sellerSel.email === localStorage.getItem('email') ?
        
        <>
            {offer ?
                <>
                    <p>Offers received: </p>
                    <button className='offerButton' onClick={getOffer}>Show</button>
                    <p/>
                    {offer.map( item => <>
                    <span>Product title: {item.title}-</span>
                    <span>Value: {item.offerValue}-</span>
                    <span>Email: {item.User.email}</span>
                    <MessageOutlined style={{ fontSize: '50px', color: 'gray' }} onClick={() => openChatBuyer2(item.User.email)}>Chat</MessageOutlined>
                    <p></p>
                    
                    </>
                    )}
                </>:<>
                    <p>No offer yet</p>
                </>
            }
        </>:<>
            <form className="send" onSubmit={addOffer}>
                <div className="textStyle"> <Input type="number" name="addoffer"/>
                <button className="offerButton" type="submit">Make an offer</button></div>
            </form>        
        </>
        }
        </>
    )
}

export default Offer;