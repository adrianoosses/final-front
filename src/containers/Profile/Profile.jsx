import React, { Component } from 'react';
import axios from 'axios';

import './Profile.css';
import {CURRENT_URL} from '../../App';
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
            // console.log("token", token);
            // console.log("get profile");
            let email = localStorage.getItem('email');
            let reqUser = await axios.get(CURRENT_URL + `/user?email=${email}`, 
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
        // console.log("Showing products...");
        let token =  localStorage.getItem('tokenUsr')
        const email = this.getEmail();
        if(!email){
            //console.log("Log In first")
            return false;
        }

        let reqProduct = await axios.get(CURRENT_URL + `/product?email=${email}`, 
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
        //console.log("productsObj:", productsObj);
        return (
            <>
            <div className='generalContainerProductData'>
            <h2>Profile</h2>
            <div className='containerProductData'>
                
                
                <div className="containerProduct">
                    {userObj ?
                        <>
                            <p className="textStyle">Name: {userObj.name} </p>
                            <p className="textStyle">Email: {userObj.email} </p>
                        </>:<>
                            <p>No user login</p>
                        </>
                    }
                </div>
                <div className="containerData">
                <p className="textStyle">Products to sell</p>
                    {productsObj.length ?
                        <>
                        <div className="itemProduct">
                            {productsObj.map((item) => <>
                                    <span className="textStyle">Title: {item.title}</span>
                                    <span className="textStyle">Product status: {item.productStatus}</span>
                                    <span className="textStyle">Price: {item.price}</span>
                                </>
                                )
                            }
                            </div>
                        </>:<>
                            <p>No orders to show</p>
                        </>
                    }  
                    </div>      
                </div>  
                </div>  
            </>
        )
    }
}
