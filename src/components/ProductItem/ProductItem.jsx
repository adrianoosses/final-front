import React, { Component } from 'react';
import './ProductItem.css';
// import {ProductContext} from '../../containers/ProductContext/ProductContext';
class ProductItem extends Component {
    /* constructor(props){
        super(props);
    } */
    // static contextType = ProductContext;
    clickSelectProduct(product) {
        this.props.history.push('/productdata/' + product.id);
    }
    render(){
        return (
            <div className="itemProduct" onClick={() => this.clickSelectProduct(this.props.item)} key={this.props.item.id}>
                <img className = 'imageProduct' 
                src={this.props.item.mainImage} alt=""></img>
                <div className="priceProduct">
					{this.props.item.price}
					€
				</div>
                <div className="titleProduct">
					{this.props.item.title}
				</div>
            </div>
        );
    }
}

export default ProductItem;
