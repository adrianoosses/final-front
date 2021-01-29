import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment'
//import './Chat.css';
import { useHistory } from 'react-router-dom';
import {CURRENT_URL} from '../../App';
import {ProductContext} from '../ProductContext/ProductContext';
import { notification, Input } from 'antd'
import './Offer.css'

const Offer = () => {
    const history = useHistory();
    const [offer, setOffer] = useState('');
    const [sellerEmail, setSellerEmail] = useState('');
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();
    // const {dest, setDest, productSelected, setProductSelected} = useContext(ProductContext) // #context

    const addOffer = async(event)=> {
        try {
            event.preventDefault();
            const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
           // console.log("token", token);

            let buyerEmail = localStorage.getItem('email');
            console.log("dest1: ", buyerEmail)
            let productSelected = localStorage.getItem('productSelected');
            let product = JSON.parse(productSelected);
            console.log("product", product);
            const itemOffer = {
                userEmail: buyerEmail, 
                productId: product.id,
                offerValue: form.addoffer.value,
                createdAt:moment(currentDate).format(format),
                updatedAt:moment(currentDate).format(format)
            }
            console.log("itemOffer", itemOffer);
            let offer = await axios.post(CURRENT_URL + '/offer', itemOffer);
            console.log("offer:", offer);
            //setScore(score.data);
        } catch (error) {
            console.error(error)
        }
    }
    const getOffer = async(event) => {
        try {

            console.log("GETTING OFER!!");
            //event.preventDefault();
            //const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
            //console.log("token", token);
            let email = localStorage.getItem('email');
            console.log('email', email);
            let productSelected = localStorage.getItem('productSelected'); // #context
            let product = JSON.parse(productSelected);
            let sellerEmailRec = product.email;
            setSellerEmail(sellerEmailRec);
            console.log("product.id ::",product.id)
            let itemOffer = await axios.get(CURRENT_URL + `/offer?productid=${product.id}`);
            console.log("itemOffer", itemOffer);
            console.log("itemOffer: ", itemOffer.data[0].offer);
            setOffer(itemOffer.data);
        } catch (error) {
            console.error(error)
        }
    }

    const openChatBuyer2 = (destChat) =>{
        console.log("ABRI CHAT A: ", destChat);
        localStorage.setItem('dest', destChat);
        // setDest(destChat);
        history.push('/chat');
    }

    useEffect(() => {
        getOffer();
    }, []);


    return (
        <>
        {console.log("offer", offer)}
        {sellerEmail === localStorage.getItem('email') ?
        <>
                {offer ?
                    <>
                        <p>Offers received: </p>
                        {console.log(offer)}
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