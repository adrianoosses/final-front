import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
//import './Chat.css';
import {CURRENT_URL} from '../../App';

const OffersProfile = () => {
    const [offer, setOffer] = useState('');
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();

    
    const getOffer = async(event) => {
        try {

            console.log("GETTING OFER!!");
            //event.preventDefault();
            //const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
            //console.log("token", token);
            let email = localStorage.getItem('email');
            console.log('email', email);
            let destEmail = localStorage.getItem('seller');
            let product = JSON.parse(localStorage.getItem('product'));
            console.log("product.id ::",product.id)
            let itemOffer = await axios.get(CURRENT_URL + `/offer?productid=${product.id}`);
            console.log("itemOffer", itemOffer);
            console.log("itemOffer: ", itemOffer.data[0].offer);
            setOffer(itemOffer.data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getOffer();
    }, []);

    return (
        <>
            {console.log("offer", offer)}
                {offer ?
                    <>
                        <p>Offer prodffffuct: </p>
                        {console.log(offer)}
                        {offer.map( item => {
                            <>
                            {console.log("item",item.title)}
                            <span>Title:{item.title}</span>
                            </>
                        })}
                    </>:<>
                        <p>No offer yet</p>
                    </>
                }
                      
        </>
    )
}

export default OffersProfile;