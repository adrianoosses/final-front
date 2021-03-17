import React, { Component } from 'react';
import './ProductItem.css';
import PropTypes from 'prop-types';
// import {ProductContext} from '../../containers/ProductContext/ProductContext';
class ProductItem extends Component {
    /* constructor(props){
        super(props);
    } */
    // static contextType = ProductContext;
    clickSelectProduct(product) {
		const { history } = this.props;
        history.history.push(`/productdata/${product.id}`);
    }

    render() {
		const { item } = this.props;
        return (
			<div
			role="button"
			tabIndex={0}
			className="itemProduct"
			onClick={() => this.clickSelectProduct(item)}
			onKeyDown={() => this.clickSelectProduct(item)}
			key={item.id}
			>
                <img
					className="imageProduct"
					src={item.mainImage}
					alt=""
                />
                <div className="priceProduct">
					{item.price}
					€
                </div>
                <div className="titleProduct">
					{item.title}
                </div>
			</div>
        );
    }
}

ProductItem.propTypes = {
	history: PropTypes.shape({
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
	}).isRequired,
	item: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProductItem;
