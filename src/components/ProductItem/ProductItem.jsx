import React, {Component} from 'react'
import './ProductItem.css'

class ProductItem extends Component {
    /*constructor(props){
        super(props);
    }*/

    clickSelectProduct(product){
        //console.log(movie.original_title)
        console.log("product set storage",product)
        localStorage.setItem('product', JSON.stringify(product));
        //console.log("this",this);
        //console.log("this.props",this.props);
        //console.log("this.props.history",this.props.history);
        //console.log("props",props);

        this.props.history.push('/productdata');
        
    }
    render(){
        return(
            <div className="itemProduct" onClick={() => this.clickSelectProduct(this.props.item)} key={this.props.item.id}>
                <img className = 'imageProduct' 
                src ={this.props.item.mainImage} alt=""></img>
                <div className="priceProduct">{this.props.item.price} €</div>
                <div className="titleProduct">{this.props.item.title}</div>
            </div>
        )
    }
}

export default ProductItem;