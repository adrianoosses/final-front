import React, { Component } from 'react'
import axios from 'axios'
import ProductItem from '../../components/ProductItem/ProductItem'
//import LoaderPage from '../../components/LoaderPage/LoaderPage'
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
            console.log("productssssssss: ",api.data);
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
            console.log("productssssssss: ",api.data);
            this.setState = this.setState.bind(this);
            this.setState({products: api.data });
        })
        .catch( (err) => console.log(err) ) ;
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
   
    /*
    addMovies = (page) => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=b5138e06a3a9125b8c326498bbeae997&language=en-US&page=${page}`)
        .then( api => {
            console.log(api.data.results)
            this.setState( prevState => ({ movies: prevState.movies.concat(api.data.results) }))
            console.log("this.state.movies",this.state.movies)
        })
        .catch( err => console.log(err));
    }
    

    onViewMore = () => {
        this.setState( prevState => ({ page: prevState.page + 1}), () => {
            this.addMovies(this.state.page);
            console.log(this.state.page)
        }); 
    }
    */

    onNextPage = () => {
        this.setState( prevState => ({ page: prevState.page + 1}), () => {
            this.getProducts(this.state.page);
            console.log(this.state.page)
        });
    }

    onBeforePage = () => {
        if(this.state.page > 1){
            this.setState( prevState => ({ page: prevState.page - 1}), () => {
                this.getProducts(this.state.page);
                console.log(this.state.page)
            });
        }else{
            console.log(this.state.page)
        }
    }

    onHandleChange = (event) => {
        this.setState({ text: event.target.value }, () => {
            console.log("event.target.value", event.target.value)
            const data = this.state.products
                .filter( item => item.title.toLowerCase().includes(this.state.text.toLowerCase()) )
            this.setState({ search: data});   
        });      
    }

    render(){
        const { search, text, products } = this.state;
        return (
            //<LoaderPage condiction={movies.length === 0} > 
            //<img src ={''} alt=""></img>
            <>

            {console.log("products::", products)}
            <div className="buttonGeneral">
                <div>
                    <LeftOutlined onClick={this.onBeforePage} style={{ fontSize: '50px', color: 'gray' }}/> 
                    <span className="defaultText">{this.state.page}</span>
                    <RightOutlined onClick={this.onNextPage} style={{ fontSize: '50px', color: 'gray' }}/> 
                    <input className="defaultText" type="text" onChange={ event => this.onHandleChange(event) } />
                    <button className="productsButton" onClick={this.getMyProducts}>My Products</button>
                    <button className="productsButton" onClick={this.handleAllProducts}>All Products</button>
                </div> 
                
                <div className = "divGeneral">
                
                    {search.length === 0 && text === ''
                        ? products.map( item => <div className="containerItem"><ProductItem item={item} history={this.props.history}/></div>)
                        : search.map( item => <div><ProductItem item={item} history={this.props.history}/></div>)
                    }
                </div>
                
                <button onClick={() => this.onViewMore()}> View more </button>
            </div>   
        </>
            //</LoaderPage>
        )
    }

}

export default ProductList;