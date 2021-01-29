import React, { Component, useContext } from 'react'
import './ProductData.css'
import { notification, Input } from 'antd'

import UserScore from '../UserScore/UserScore';
import Offer from '../Offer/Offer';
import ProductFavorite from '../ProductFavorite/ProductFavorite'
import axios from 'axios'
import { MessageOutlined } from '@ant-design/icons';

import {CURRENT_URL} from '../../App';
import {ProductContext} from '../ProductContext/ProductContext';
class ProductData extends Component {
    static contextType = ProductContext;
    constructor(props){
        super(props)

        this.state = { 
            email: "",
            product: [],
            //days: 0,
            msg: "",
            value: ''
         }
    }

    componentDidMount(){
        //const {dest, setDest, productSelected} = this.context;
        //const {dest, setDest} = this.context;
        let productSelected = localStorage.getItem('productSelected');
        let product = JSON.parse(productSelected);
        this.setState({product})
        //this.props.subscribe(this);
        const email = localStorage.getItem('email');
        console.log("EMAIL: ", email);
        this.setState({email: email});
        console.log("buyerEmail3:", product.email);
        //setDest(product.email);
        localStorage.setItem('dest', product.email); // #context
    }

    openChat = () =>{
        //const {dest, setDest, productSelected} = this.context; // #context
        //const {dest, setDest} = this.context; // #context
        let productSelected = localStorage.getItem('productSelected');
        let product = JSON.parse(productSelected);
        //setDest(product.email); // #context
        localStorage.setItem('dest', product.email); // #context
        this.props.history.push('/chat');
    }

    deleteProduct = () =>{
        //const {dest, setDest, productSelected} = this.context;
        let productSelected = localStorage.getItem('productSelected');
        let token = localStorage.getItem('tokenUsr');
        console.log("tokennnnnnnnnn");
        let product = JSON.parse(productSelected);
        axios.delete(CURRENT_URL + `/productfavorite?id=${product.id}`,
        { headers: {authorization: token } })
        .then(() =>{
            console.log("product deleted");
        })
        this.props.history.push('/');
    }
    

    openChatBuyer2 = (destChat) =>{
        localStorage.setItem('dest', destChat); // #context
        this.props.history.push('/chat');
    }

    render(){
        return (
            <>
            
            <div className='generalContainerProductData'>
                <div className='containerProductData'>
                
                    <div className="containerProduct">
                        <h2>{this.state.product.title}</h2>
                        <img className = 'imageProduct' src ={this.state.product.mainImage} alt=""></img>
                        <p style={{ fontSize: '18px', color: 'gray' }}>{this.state.product.description}</p>
                    </div>
                    
                    <div className="containerData">
                    <br></br>
                    <br></br>
                     
                    <span className="textStyle">Sell by {this.state.product.name} <UserScore buyerEmail={this.state.product.email}/></span>
                    <MessageOutlined style={{ fontSize: '50px', color: 'gray' }} onClick={() => this.openChat()}>Chat</MessageOutlined>
                    <ProductFavorite />
                    
                    
                    {console.log("proddd", this.state.product)}
                    {(this.state.product.email === localStorage.getItem('email')) ?
                    <>
                        <button onClick={this.deleteProduct}>DELETE PRODUCT</button>
                    </>:<>
                    
                    </>
                    }
                    
                    
                    <h2>Status: {this.state.product.productStatus}</h2>
                    
                
                    <p className="textStyle">{this.state.product.price} €</p>

                    <Offer />
                    
                    
                    </div>
                </div>
            </div>
            
            </>
            
        )
    }
}

export default ProductData;