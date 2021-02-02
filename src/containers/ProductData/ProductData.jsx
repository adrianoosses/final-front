import React, { Component} from 'react'
import './ProductData.css'

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
    getProductById(id){
        //console.log("id!!!!!!!--------", id);
        axios.get(CURRENT_URL + `/product/details?id=${id}`)
        .then((api) =>{
            //console.log("api.data: ",api.data);
            //console.log("api.data[0]: ",api.data[0]);
            this.setState({product: api.data[0] });
            //console.log("DESSSSSSSSST", api.data[0].email);
            localStorage.setItem('dest', api.data[0].email);
        })
        .catch( (err) => console.log(err) ) ;
    }

    componentDidMount(){
        this.getProductById(this.props.match.params.id);
        const email = localStorage.getItem('email');
        this.setState({email: email});
    }

    openChat = () =>{
        localStorage.setItem('dest', this.state.product.email); // #context
        this.props.history.push('/chat');
    }

    deleteProduct = () =>{
        let token = localStorage.getItem('tokenUsr');
        axios.delete(CURRENT_URL + `/product?id=${this.state.product.id}`,
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
                     
                    <div className="dataSeller">
                        <div style={{ fontSize: '20px', color: 'black' }}>Sell by {this.state.product.name}</div> 
                        <UserScore buyerEmail={this.state.product.email}/>
                    </div>
                    <MessageOutlined style={{ fontSize: '50px', color: 'gray' }} onClick={() => this.openChat()}>Chat</MessageOutlined>
                    <ProductFavorite productSel={this.state.product}/>
                    
                    
                    {/*console.log("proddd", this.state.product)*/}
                    {(this.state.product.email === localStorage.getItem('email')) ?
                    <>
                        <button onClick={this.deleteProduct}>DELETE PRODUCT</button>
                    </>:<>
                    
                    </>
                    }
                    
                    
                    <h2>Status: {this.state.product.productStatus}</h2>
                    <p className="textStyle">{this.state.product.price} €</p>
                    <Offer productSel={this.state.product}/>
                    </div>
                </div>
            </div>
            
            </>
            
        )
    }
}

export default ProductData;