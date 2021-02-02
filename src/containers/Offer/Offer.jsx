import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
//import './Chat.css';
import { useHistory } from 'react-router-dom';
import {CURRENT_URL} from '../../App';
import { notification, Input } from 'antd'
import './Offer.css'

const Offer = (props) => {
    const history = useHistory();
    const [offer, setOffer] = useState('');
    const [sellerEmail, setSellerEmail] = useState('');
    // const [setSellerEmail] = useState('');
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();

    const addOffer = async(event)=> {
        try {
            let token =  localStorage.getItem('tokenUsr')
            event.preventDefault();
            const form = event.target;
            let buyerEmail = localStorage.getItem('email');
            //console.log("dest1: ", buyerEmail)
            let product = props.productSel;
            //console.log("product", product);
            const itemOffer = {
                userEmail: buyerEmail, 
                productId: product.id,
                offerValue: form.addoffer.value,
                createdAt:moment(currentDate).format(format),
                updatedAt:moment(currentDate).format(format)
            }
            //console.log("itemOffer", itemOffer);
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
            //console.log("GETTING OFER!!");
            //let email = localStorage.getItem('email');
            //console.log('email', email);
            let product = props.productSel;
            let sellerEmailRec = product.email;
            setSellerEmail(sellerEmailRec);
            //console.log("product.id :::",product.id)
            let itemOffer = await axios.get(CURRENT_URL + `/offer?productid=${product.id}`, 
            { headers: {authorization: token } });
            //console.log("itemOffer", itemOffer);
            //console.log("itemOffer2: ", itemOffer.data[0].offer);
            setOffer(itemOffer.data);
        } catch (error) {
            //history.push('/');
            //notification.error({ message: 'Unauthorized', description: 'Log in first' })
            console.error(error)
        }
    }

    const openChatBuyer2 = (destChat) =>{
        //console.log("ABRI CHAT A: ", destChat);
        localStorage.setItem('dest', destChat);
        history.push('/chat');
    }

    useEffect(() => {
        getOffer();
    }, []);


    return (
        <>
        {props.productSel.email === localStorage.getItem('email') ?
        
        <>
            {offer ?
                <>
                    <p>Offers received: </p>
                    <button onClick={getOffer}>Show</button>
                    {/*console.log(offer)*/}
                    {offer.map( item => <>
                    <span>Product title: {item.title}-</span>
                    <span>Value: {item.offerValue}-</span>
                    <span>Email: {item.email}</span>
                    <button onClick = {() => openChatBuyer2(item.email)}>Chat</button>
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