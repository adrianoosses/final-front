import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment'
//import './Chat.css';
import { useHistory } from 'react-router-dom';
import {CURRENT_URL} from '../../App';
import {ProductContext} from '../ProductContext/ProductContext';
import { notification, Input } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const ProductFavorite = () => {
    const history = useHistory();
    const [added, setAdded] = useState(false);
    const [colorFav, setColorFav] = useState('gray');
    const [sellerEmail, setSellerEmail] = useState('');
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();
    //const {dest, setDest, productSelected, setProductSelected} = useContext(ProductContext) #context
    const {dest, setDest} = useContext(ProductContext)

    const setProductFavorite = async(event)=> {
        try {
            setAdded(true);
            setColorFav('red');
            event.preventDefault();
            const form = event.target;
            let token =  localStorage.getItem('tokenUsr')
           // console.log("token", token);
            let productSelected = localStorage.getItem('productSelected'); // #context
            let buyerEmail = localStorage.getItem('email');
            console.log("dest1: ", buyerEmail)
            let product = JSON.parse(productSelected);
            console.log("product", product);
            const itemFavorite = {
                userEmail: buyerEmail, 
                productId: product.id,
                createdAt:moment(currentDate).format(format),
                updatedAt:moment(currentDate).format(format)
            }
            console.log("itemFavorite", itemFavorite);
            let favorite = await axios.post(CURRENT_URL + '/productfavorite', itemFavorite);
            console.log("favorite:", favorite);
            notification.success({ message: 'Add!', description: 'Add to favorites correctly'});
            //setScore(score.data);
        } catch (error) {
            console.error(error)
        }
    }

    const deleteProductFavorite = async (event) =>{
        try{
            setAdded(false);
            setColorFav('gray');
            event.preventDefault();
            let token = localStorage.getItem('tokenUsr');
            console.log("tokennnnnnnnnn");
            let productSelected = localStorage.getItem('productSelected'); // #context
            let product = JSON.parse(productSelected);
            await axios.delete(CURRENT_URL + `/productfavorite?productid=${product.id}`,
            { headers: {authorization: token } })
            .then(() =>{
                console.log("product deleted");
            })
            notification.success({ message: 'Deleted!', description: 'Deleted from favorites correctly'});
        } catch (error) {
            console.error(error)
        }
    }

    const handleFavButton = async(event) =>{
        event.preventDefault();
        (!added)?setProductFavorite(event):deleteProductFavorite(event);
    }
    

    return (
        <>
        {added?
        <HeartFilled onClick = {handleFavButton} style={{ fontSize: '50px', color: colorFav }}/>
        :
        <HeartOutlined onClick = {handleFavButton} style={{ fontSize: '50px', color: colorFav }}/>
        }   
        </>
    )
}

export default ProductFavorite;