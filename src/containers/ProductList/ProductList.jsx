import React, { Component } from 'react';
import axios from 'axios';
import { Input } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProductItem from '../../components/ProductItem/ProductItem';
import './ProductList.css';
import CURRENT_URL from '../../constants/constants';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            page: 1,
            text: '',
            search: [],
         };
    }

	componentDidMount() {
		const { page } = this.state;
        this.getProducts(page);
    }

	handleMyProducts() {
		const { page } = this.state;
        this.getMyProducts(page);
    }

	handleMyProductsFavorites() {
        const { page } = this.state;
        this.getProducts(page);
    }

    getProducts(page) {
        axios.get(`${CURRENT_URL}/product?page=${page}`)
        .then((api) => {
            this.setState({ products: api.data });
        })
        .catch((err) => console.log(err));
    }

    getMyProducts = () => {
        // const page = (this.state.page);
        const page = 1;
        const email = localStorage.getItem('email');
        axios.get(`${CURRENT_URL}/product?page=${page}&email=${email}`)
        .then((api) => {
            this.setState = this.setState.bind(this);
            this.setState({ products: api.data });
        })
        .catch((err) => console.log(err));
    }

    getMyProductsFavorites = () => {
        // const page = (this.state.page);
        const token = localStorage.getItem('tokenUsr');
        const page = 1;
        const email = localStorage.getItem('email');
        axios.get(`${CURRENT_URL}/productfavorite?page=${page}&email=${email}`,
        { headers: { authorization: token } })
        .then((api) => {
            this.setState = this.setState.bind(this);
            this.setState({ products: api.data });
            // console.log("products to favorite: ", api.data)
        })
        .catch((err) => {
            this.setState({ products: [] });
            console.log(err);
        });
    }

    handleAllProducts =() => {
        const { page } = this.state;
        this.getProducts(page);
    }

    onNextPage = () => {
		const { page } = this.state;
        this.setState((prevState) => ({ page: prevState.page + 1 }), () => {
            this.getProducts(page);
            // console.log(this.state.page)
        });
    }

    onBeforePage = () => {
		const { page } = this.state;
        if (page > 1) {
            this.setState((prevState) => ({ page: prevState.page - 1 }), () => {
                this.getProducts(page);
                // console.log(this.state.page)
            });
        } else {
            console.log(page);
        }
    }

    onHandleChange = (event) => {
		const { text, products } = this.state;
        this.setState({ text: event.target.value }, () => {
            const data = products
                .filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
            this.setState({ search: data });
        });
    }

    render() {
        const {
			search, text, products, page,
		} = this.state;
		const history = this.props;
        return (
            <>
            {/* console.log("products::", products) */}
            <div className="buttonGeneral">
                <div className="searchAndButtonsNav">
                    <div className="searchNav">
                        <LeftOutlined onClick={this.onBeforePage} style={{ fontSize: '50px', color: 'gray' }} />
                        <div className="defaultText">{page}</div>
                        <RightOutlined onClick={this.onNextPage} style={{ fontSize: '50px', color: 'gray' }} />
                        <Input className="defaultText" type="text" onChange={(event) => this.onHandleChange(event)} />
                    </div>
                    <div className="searchNav">
                        <button className="productsButton" type="button" onClick={this.getMyProducts}>My Products</button>
                        <button className="productsButton" type="button" onClick={this.handleAllProducts}>All Products</button>
                        <button className="productsButton" type="button" onClick={this.getMyProductsFavorites}>Favorites</button>
                    </div>
                </div>

                <div className="divGeneral">
                    {search.length === 0 && text === ''
                        ? products.map((item) => (
							<div className="containerItem" key={item.id}>
								<ProductItem item={item} history={history} />
							</div>
							))
                        : search.map((item) => (
							<div>
								<ProductItem item={item} history={history} />
							</div>
							))}
                </div>
            </div>
            </>
            // </LoaderPage>
        );
    }
}

export default ProductList;
