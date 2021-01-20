import React, { Component, Fragment } from 'react'
import './ProductData.css'
import axios from 'axios'
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
        let product = JSON.parse(localStorage.getItem('product'));
        this.setState({product})
        //this.props.subscribe(this);
        const email = localStorage.getItem('email');
        console.log("EMAIL: ", email);
        this.setState({email: email});
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
                <h2>{this.state.product.title}</h2>
                <p>Sell by {this.state.product.name}</p>
                <img className = 'imageProduct' src ={this.state.product.path} alt=""></img>
                <h2>Status: {this.state.product.productStatus}</h2>
                <h2>{this.state.product.description}</h2>
                <p>{this.state.product.price} €</p>
            </>
            
        )
    }
}

export default ProductData;