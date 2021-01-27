import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
//import './Chat.css';
import {CURRENT_URL} from '../../App';
export default function ProductToSell() {
    const [productToSell, setProductToSell] = useState('');
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();
    const uploadProduct = async(event) =>{
        try {
            event.preventDefault();
            const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
           // console.log("token", token);

            let email = localStorage.getItem('email');
            console.log("dest1: ", email)
            const itemProduct = {
                sellerEmail: email, 
                title: form.productTitle.value,
                description: form.productDescription.value,
                price: form.priceDescription.value,
                sellDate:moment(currentDate).format(format),
                productStatus: form.productStatus.value,
                createdAt:moment(currentDate).format(format),
                updatedAt:moment(currentDate).format(format),
                mainImage: form.productImage.value,
            }
            let product = await axios.post(CURRENT_URL + `/product`, itemProduct);

            console.log("product:", product);
            //setScore(score.data);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        
        <div>
            <p>Product to sell</p>

            <form className="send" onSubmit={uploadProduct}>
                    <p>Title: <input type="text" name="productTitle"/></p>
                    <p>Description: <input type="text" name="productDescription"/></p>
                    <p>Price: <input type="number" name="priceDescription"/></p>
                    <p>Product Status: <input type="text" name="productStatus"/></p>
                    <p>Image URL: <input type="text" name="productImage"/></p>
                    <button type="submit">Send</button>
                </form> 
        </div>
    )
}
