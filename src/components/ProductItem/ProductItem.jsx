import React, {Component} from 'react'
import './ProductItem.css'

class ProductItem extends Component {
    constructor(props){
        super(props);
    }

    clickSelectProduct(product){
        //console.log(movie.original_title)
        console.log("product set storage",product)
        localStorage.setItem('product', JSON.stringify(product));
        //console.log("this",this);
        //console.log("this.props",this.props);
        //console.log("this.props.history",this.props.history);
        //console.log("props",props);

        // this.props.history.push('/productdata');
        
    }
    render(){
        return(
            <div key={this.props.item.id}>
            <p>{this.props.item.title}</p>
            <img className = 'imageMovie' onClick={() => this.clickSelectMovie(this.props.item)}
            src ={this.props.item.path} alt=""></img>
            <p>Price: {this.props.item.price}</p>
            </div>
            //<img className = 'imageMovie' onClick={() => this.clickSelectMovie(this.props.item)}
            //src ={'https://image.tmdb.org/t/p/w500' + this.props.item.poster_path} alt=""></img>
        )
    }
}

export default ProductItem;