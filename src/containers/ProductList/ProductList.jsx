import React, { Component } from 'react'
import axios from 'axios'
import ProductItem from '../../components/ProductItem/ProductItem'
//import LoaderPage from '../../components/LoaderPage/LoaderPage'
import './ProductList.css'

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
        axios.get(`http://127.0.0.1:3001/product`)
        .then((api) =>{
            console.log("product: ",api.data);
            this.setState({products: api.data });
        })
        .catch( (err) => console.log(err) ) ;
    }

    componentDidMount(){
        this.getProducts(this.state.page);
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
            <>
                <div>
                    <button onClick={this.onBeforePage}> Back </button>
                    <button onClick={this.onNextPage}> Next </button>
                    <input type="text" onChange={ event => this.onHandleChange(event) } />
                    <p>Page: {this.state.page}</p>
                </div> 
                
                <div className = "divGeneral">
                    {search.length === 0 && text === ''
                        ? products.map( item => <ProductItem item={item} history={this.props.history}/>)
                        : search.map( item => <ProductItem item={item} history={this.props.history}/>)
                    }
                </div>
                
                <button onClick={() => this.onViewMore()}> View more </button>
            </>
            //</LoaderPage>
        )
    }

}

export default ProductList;