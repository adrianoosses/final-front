import React, { Component} from 'react'


import UserScore from '../UserScore/UserScore';
import Offer from '../Offer/Offer';
import ProductFavorite from '../ProductFavorite/ProductFavorite'
import axios from 'axios'
import { MessageOutlined, DeleteOutlined } from '@ant-design/icons';

import {CURRENT_URL} from '../../App';
import {ProductContext} from '../ProductContext/ProductContext';
import './ProductData.css'
class ProductData extends Component {
    static contextType = ProductContext;
    constructor(props){
        super(props)

        this.state = { 
            email: '',
            product: [],
            //days: 0,
            msg: '',
            value: '',
            sellerData: '',
         }
    }
    getProductById(id){
        let token = localStorage.getItem('tokenUsr');
        axios.get(CURRENT_URL + `/product/details?id=${id}`, 
        { headers: {authorization: token } })
        .then((api) =>{
            this.setState({product: api.data[0] });
            this.setState({sellerData: api.data[0].User})
            localStorage.setItem('dest', api.data[0].User.email);
        })
        .catch( (err) => console.log(err) ) ;
    }

    componentDidMount(){
        this.getProductById(this.props.match.params.id);
        const email = localStorage.getItem('email');
        this.setState({email: email});
    }

    openChat = () =>{
        localStorage.setItem('dest', this.state.sellerData.email); // #context
        this.props.history.push('/chat');
    }

    deleteProduct = () =>{
        let token = localStorage.getItem('tokenUsr');
        axios.delete(CURRENT_URL + `/product?id=${this.state.product.id}`,
        { headers: {authorization: token } })
        this.props.history.push('/');
    }
    

    openChatBuyer2 = (destChat) =>{
        localStorage.setItem('dest', destChat); // #context
        this.props.history.push('/chat');
    }

    render(){
        return (
            <>   
            <div className='generalContainerProductDataView'>
                <div className='containerProductDataView'>
                
                    <div className="containerProductView">
                        <h2>{this.state.product.title}</h2>
                        <img className = 'imageProduct' src ={this.state.product.mainImage} alt=""></img>
                        <p style={{ fontSize: '18px', color: 'gray' }}>{this.state.product.description}</p>
                    </div>
                    
                    <div className="containerDataView">
                        <br></br>
                        <br></br>
                        
                        <div className="dataSeller">
                            <div style={{ fontSize: '20px', color: 'black' }}>Sell by {this.state.sellerData.name}</div> 
                            <UserScore buyerEmail={this.state.sellerData.email}/>
                        </div>
                        <MessageOutlined style={{ fontSize: '50px', color: 'gray' }} onClick={() => this.openChat()}>Chat</MessageOutlined>
                        <ProductFavorite productSel={this.state.product}/>
                        
                        {((this.state.sellerData.email === localStorage.getItem('email')) || localStorage.getItem('email') === 'admin@example.com') ?
                        <>
                            <DeleteOutlined style={{ fontSize: '50px', color: 'gray' }} onClick={this.deleteProduct}/>
                        </>:<>
                        
                        </>
                        }
                        <h2>Status: {this.state.product.productStatus}</h2>
                        <p className="textStyle">{this.state.product.price} €</p>
                        <Offer productSel={this.state.product} sellerSel={this.state.sellerData}/>
                    </div>
                </div>
            </div>
            
            </>
            
        )
    }
}

export default ProductData;