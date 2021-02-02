import React, { Component } from 'react'
import axios from 'axios'
import ProductItem from '../../components/ProductItem/ProductItem'
import { Input } from 'antd'
import './ProductList.css'
import {CURRENT_URL} from '../../App';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
class ProductList extends Component {
    constructor(props){
        super(props)

        this.state = { 
            products: [],
            page: 1,
            text: '',
            search: []
         }
    }

    getProducts(page){
        axios.get(CURRENT_URL + `/product?page=${page}`)
        .then((api) =>{
            //console.log("productssssssss: ",api.data);
            this.setState({products: api.data });
        })
        .catch( (err) => console.log(err) ) ;
    }

    getMyProducts = () => {
        //const page = (this.state.page);
        const page = 1;
        const email = localStorage.getItem('email');
        axios.get(CURRENT_URL + `/product?page=${page}&email=${email}`)
        .then((api) =>{
            this.setState = this.setState.bind(this);
            this.setState({products: api.data });
        })
        .catch( (err) => console.log(err) ) ;
    }

    getMyProductsFavorites = () => {
        //const page = (this.state.page);
        let token =  localStorage.getItem('tokenUsr')
        const page = 1;
        const email = localStorage.getItem('email');
        axios.get(CURRENT_URL + `/productfavorite?page=${page}&email=${email}`, 
        { headers: {authorization: token } })
        .then((api) =>{
            this.setState = this.setState.bind(this);
            this.setState({products: api.data });
            //console.log("products to favorite: ", api.data)
        })
        .catch( (err) => {
            this.setState({products: []});
            console.log(err)
        }  ) ;
    }

    componentDidMount(){
        this.getProducts(this.state.page);
    }

    handleAllProducts =() =>{
        this.getProducts(this.state.page);
    }

    handleMyProducts(){
        this.getMyProducts(this.state.page);
    }

    handleMyProductsFavorites(){
        this.getMyProductsFavorites(this.state.page);
    }
   

    onNextPage = () => {
        this.setState( prevState => ({ page: prevState.page + 1}), () => {
            this.getProducts(this.state.page);
            //console.log(this.state.page)
        });
    }

    onBeforePage = () => {
        if(this.state.page > 1){
            this.setState( prevState => ({ page: prevState.page - 1}), () => {
                this.getProducts(this.state.page);
                //console.log(this.state.page)
            });
        }else{
            console.log(this.state.page)
        }
    }

    onHandleChange = (event) => {
        this.setState({ text: event.target.value }, () => {
            //console.log("event.target.value", event.target.value)
            const data = this.state.products
                .filter( item => item.title.toLowerCase().includes(this.state.text.toLowerCase()) )
            this.setState({ search: data});   
        });      
    }

    render(){
        const { search, text, products } = this.state;
        return (
            <>
            {/*console.log("products::", products)*/}
            <div className="buttonGeneral">
                <div className="searchAndButtonsNav">
                    <div className="searchNav">
                        <LeftOutlined onClick={this.onBeforePage} style={{ fontSize: '50px', color: 'gray' }}/> 
                        <div className="defaultText">{this.state.page}</div>
                        <RightOutlined onClick={this.onNextPage} style={{ fontSize: '50px', color: 'gray' }}/>
                        <Input className="defaultText" type="text" onChange={ event => this.onHandleChange(event) } />
                    </div>
                    <div className="searchNav">
                        <button className="productsButton" onClick={this.getMyProducts}>My Products</button>
                        <button className="productsButton" onClick={this.handleAllProducts}>All Products</button>
                        <button className="productsButton" onClick={this.getMyProductsFavorites}>Favorites</button>
                    </div>
                </div> 
                
                <div className = "divGeneral">
                
                    {search.length === 0 && text === ''
                        ? products.map( item => <div className="containerItem" key={item.id}><ProductItem item={item} history={this.props.history}/></div>)
                        : search.map( item => <div><ProductItem item={item} history={this.props.history}/></div>)
                    }
                </div>
                
            </div>   
        </>
            //</LoaderPage>
        )
    }

}

export default ProductList;