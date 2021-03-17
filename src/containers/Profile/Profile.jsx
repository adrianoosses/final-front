import React, { Component } from 'react';
import axios from 'axios';

import './Profile.css';
import CURRENT_URL from '../../constants/constants';

export default class Profile extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            products: [],
         };
    }

    componentDidMount() {
        this.getUser();
        this.getProduct();
    }

	getProduct = async () => {
        // console.log("Showing products...");
        const token = localStorage.getItem('tokenUsr');
        const email = this.getEmail();
        if (!email) {
            // console.log("Log In first")
            return false;
        }

        const reqProduct = await axios.get(`${CURRENT_URL}/product?email=${email}`,
        { headers: { authorization: token } });
        // console.log("products: ", await reqProduct);
        this.setState({ products: await reqProduct.data });
		return true;
    }

	getEmail = () => localStorage.getItem('email')

	async getUser() {
        try {
            const token = localStorage.getItem('tokenUsr');
            // console.log("token", token);
            // console.log("get profile");
            const email = localStorage.getItem('email');
            const reqUser = await axios.get(`${CURRENT_URL}/user?email=${email}`,
            { headers: { authorization: token } });
            this.setState({ users: await reqUser.data[0] });
            // history.push('/');
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { users: userObj, products: productsObj } = this.state;
        return (
            <>
            <div className="generalContainerProductData">
            <h2>Profile</h2>
            <div className="containerProductData">

                <div className="containerProduct">
                    {userObj
                        ? (
<>
                            <p className="textStyle">
Name:
{userObj.name}
{' '}

                            </p>
                            <p className="textStyle">
Email:
{userObj.email}
{' '}

                            </p>
</>
) : (
<>
                            <p>No user login</p>
</>
)}
                </div>
                <div className="containerData">
                <p className="textStyle">Products to sell</p>
                    {productsObj.length
                        ? (
<>
                        <div className="itemProduct">
                            {productsObj.map((item) => (
<>
                                    <span className="textStyle">
Title:
{item.title}
                                    </span>
                                    <span className="textStyle">
Product status:
{item.productStatus}
                                    </span>
                                    <span className="textStyle">
Price:
{item.price}
                                    </span>
</>
))}
                        </div>
</>
) : (
<>
                            <p>No orders to show</p>
</>
)}
                </div>
            </div>
            </div>
            </>
        );
    }
}
