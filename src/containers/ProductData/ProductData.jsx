import React, { Component } from 'react';

import axios from 'axios';
import { MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import UserScore from '../UserScore/UserScore';
import Offer from '../Offer/Offer';
import ProductFavorite from '../ProductFavorite/ProductFavorite';
import CURRENT_URL from '../../constants/constants';
// import { ProductContext } from '../ProductContext/ProductContext';
import './ProductData.css';

class ProductData extends Component {
    // static contextType = ProductContext;
    constructor(props) {
        super(props);

        this.state = {
            product: [],
            sellerData: '',
         };
    }

    componentDidMount() {
		const { match: { params } } = this.props;
        this.getProductById(params.id);
    }

	getProductById(id) {
        const token = localStorage.getItem('tokenUsr');
        axios.get(`${CURRENT_URL}/product/details?id=${id}`,
        { headers: { authorization: token } })
        .then((api) => {
            this.setState({ product: api.data[0] });
            this.setState({ sellerData: api.data[0].User });
            localStorage.setItem('dest', api.data[0].User.email);
        })
        .catch((err) => console.log(err));
    }

    openChat = () => {
		const { history } = this.props;
		const { sellerData } = this.state;
        localStorage.setItem('dest', sellerData.email); // #context
        history.push('/chat');
    }

    deleteProduct = () => {
		const { history } = this.props;
		const { product } = this.state;
        const token = localStorage.getItem('tokenUsr');
        axios.delete(`${CURRENT_URL}/product?id=${product.id}`,
        { headers: { authorization: token } });
        history.push('/');
    }

    openChatBuyer2 = (destChat) => {
		const { history } = this.props;
        localStorage.setItem('dest', destChat); // #context
        history.push('/chat');
    }

    render() {
		const { product, sellerData } = this.state;
        return (
            <>
            <div className="generalContainerProductDataView">
                <div className="containerProductDataView">

                    <div className="containerProductView">
                        <h2>{product.title}</h2>
                        <img className="imageProduct" src={product.mainImage} alt="" />
                        <p style={{ fontSize: '18px', color: 'gray' }}>{product.description}</p>
                    </div>

                    <div className="containerDataView">
                        <br />
                        <br />
                        <div className="dataSeller">
                            <div style={{ fontSize: '20px', color: 'black' }}>
							Sell by
							{sellerData.name}
                            </div>
                            <UserScore buyerEmail={sellerData.email} />
                        </div>
                        <MessageOutlined style={{ fontSize: '50px', color: 'gray' }} onClick={() => this.openChat()}>Chat</MessageOutlined>
                        <ProductFavorite productSel={product} />

                        {((sellerData.email === localStorage.getItem('email')) || localStorage.getItem('email') === 'admin@example.com')
                        ?	(
							<>
                            <DeleteOutlined style={{ fontSize: '50px', color: 'gray' }} onClick={this.deleteProduct} />
							</>
							)
						:	(
							<>

							</>
							)}
                        <h2>
							Status:
							{product.productStatus}
                        </h2>
                        <p className="textStyle">
							{product.price}
							{' '}
							€
                        </p>
                        <Offer productSel={product} sellerSel={sellerData} />
                    </div>
                </div>
            </div>

            </>

        );
    }
}

ProductData.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
	params: PropTypes.string.isRequired,
	match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProductData;
