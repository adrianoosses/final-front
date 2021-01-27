import React, { Component } from 'react';
import axios from 'axios';
//import { useHistory } from 'react-router-dom';

import ProductToSell from '../ProductToSell/ProductToSell';
import OffersProfile from '../OffersProfile/OffersProfile';

import './Profile.css';
export default class Profile extends Component {
    constructor(){
        super();
        this.state = { 
            users: [],
            orders: [],
            products: []
         }
    }

    async getUser(){
        try {
            let token =  localStorage.getItem('tokenUsr')
            console.log("token", token);
            console.log("get profile");
            let email = localStorage.getItem('email');
            let reqUser = await axios.get(`http://127.0.0.1:3001/user?email=${email}`, 
            { headers: {authorization: token} });
            this.setState({users: await reqUser.data[0]})
            //history.push('/');
        } catch (error) {
            console.error(error)
        }
    }

    getEmail = () =>{
        return localStorage.getItem('email');
    }

    getProduct = async () =>{
        console.log("Showing products...");
        let token =  localStorage.getItem('tokenUsr')
        const email = this.getEmail();
        if(!email){
            console.log("Log In first")
            return false;
        }

        let reqProduct = await axios.get(`http://127.0.0.1:3001/product?email=${email}`, 
        { headers: {authorization: token} });
        //console.log("products: ", await reqProduct);
        this.setState({products: await reqProduct.data})
    }

    componentDidMount(){
        this.getUser();
        this.getProduct();
    }

    render() {
        let userObj = this.state.users;
        let productsObj = this.state.products;
        console.log("productsObj:", productsObj);
        return (
            <>
                
                <h2>Profile</h2>
                    {userObj ?
                        <>
                            <p>Name: {userObj.name} </p>
                            <p>Email: {userObj.email} </p>
                        </>:<>
                            <p>No user login</p>
                        </>
                    }
                    
                    
                    {productsObj.length ?
                        <>
                            {productsObj.map((item) => <>
                                    <p>Title: {item.title}</p>
                                    <p>Product status: {item.productStatus}</p>
                                    <p>Price: {item.price}</p>
                                </>
                                )
                            }
                        </>:<>
                            <p>No orders to show</p>
                        </>
                    }            
            </>
        )
    }
}
