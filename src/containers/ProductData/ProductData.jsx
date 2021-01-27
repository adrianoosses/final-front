import React, { Component, Fragment } from 'react'
import './ProductData.css'

import UserScore from '../UserScore/UserScore';
import Offer from '../Offer/Offer';
import axios from 'axios'

import {CURRENT_URL} from '../../App';
class ProductData extends Component {
    constructor(props){
        super(props)

        this.state = { 
            email: "",
            product: [],
            //days: 0,
            msg: ""
         }
    }

    componentDidMount(){
        //console.log("item", props.item);
        let product = JSON.parse(localStorage.getItem('product'));
        this.setState({product})
        //this.props.subscribe(this);
        const email = localStorage.getItem('email');
        console.log("EMAIL: ", email);
        this.setState({email: email});
        console.log("buyerEmail3:", product.email);
        localStorage.setItem('seller', product.email);
    }

    openChat = () =>{
        let product = JSON.parse(localStorage.getItem('product'));
        localStorage.setItem('seller', product.email);
        this.props.history.push('/chat');
    }

    deleteProduct = () =>{
        let token = localStorage.getItem('tokenUsr');
        console.log("tokennnnnnnnnn");
        let product = JSON.parse(localStorage.getItem('product'));
        axios.delete(CURRENT_URL + `/product?id=${product.id}`,
        { headers: {authorization: token } })
        .then(() =>{
            console.log("product deleted");
        })

        this.props.history.push('/');
    }

    openChatBuyer2 = (destChat) =>{
        localStorage.setItem('seller', destChat);
        this.props.history.push('/chat');
    }

    /*
    rentMovie = async (days) =>{
        console.log("Rent a movie now!");
        try{
            
            //console.log("email", email);
            let token =  localStorage.getItem('tokenUsr');
            let reqUser = await axios.get(`https://backend-movie-service.herokuapp.com/user/profile?email=${this.state.email}`,
            { headers: {authorization: token} });
            let idUser = await reqUser.data._id;
            console.log(reqUser.data._id)
            const order = {
                "userId": idUser,
                "movieId": this.state.movie.id,
                "daysToRent": days
            }
            //console.log("order: ", order);
            let reqOrder = await axios.post(`https://backend-movie-service.herokuapp.com/order/`, order);
            console.log("reqorder: ", await reqOrder);
            this.setState({msg: await reqOrder.data.msg});
        }catch(e){
            console.log("error", typeof(e));
            console.log("error code", e.response.status);
            if(e.response.status === 400) this.setState({msg:"Not logged"});
            
        }
    }
    */
    render(){
        return (
            <>
            <div className='generalContainerProductData'>
                <div className='containerProductData'>
                
                    <div className="containerProduct">
                    <h2>{this.state.product.title}</h2>
                    <img className = 'imageProduct' src ={this.state.product.mainImage} alt=""></img>
                    <h2>{this.state.product.description}</h2>
                    </div>
                    
                    <div className="containerData">
                    <br></br>
                    <br></br>
                    <p>Sell by {this.state.product.name}</p>
                    <UserScore buyerEmail={this.state.product.email}/>
                    {console.log("proddd", this.state.product)}
                    {(this.state.product.email === localStorage.getItem('email')) ?
                    <>
                        <button onClick={this.deleteProduct}>DELETE PRODUCT</button>
                    </>:<>
                    <div><button onClick={() => this.openChat()}>Chat</button></div> 
                    </>
                    }
                    
                    
                    <h2>Status: {this.state.product.productStatus}</h2>
                    
                    <p>{this.state.product.price} €</p>

                    <Offer />

                    
                    </div>
                </div>
            </div>
            </>
            
        )
    }
}

export default ProductData;