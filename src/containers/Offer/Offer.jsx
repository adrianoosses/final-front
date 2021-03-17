import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
// import './Chat.css';
import { useHistory } from 'react-router-dom';
import { MessageOutlined } from '@ant-design/icons';
import { notification, Input } from 'antd';
import PropTypes from 'prop-types';
import CURRENT_URL from '../../constants/constants';
import './Offer.css';

const Offer = ({ productSel, sellerSel }) => {
    const history = useHistory();
    const [offer, setOffer] = useState('');
    // const [, setSellerEmail] = useState('');
    const [product, setProduct] = useState('');
    const format = 'YYYY-MM-DD HH:mm:ss';
    const currentDate = new Date().getTime();

    const addOffer = async (event) => {
        try {
            const token = localStorage.getItem('tokenUsr');
            event.preventDefault();
            const form = event.target;
            setProduct(productSel);
            const itemOffer = {
                productId: product.id,
                offerValue: form.addoffer.value,
                createdAt: moment(currentDate).format(format),
                updatedAt: moment(currentDate).format(format),
            };
            await axios.post(`${CURRENT_URL}/offer`, itemOffer,
            { headers: { authorization: token } });
            notification.success({ message: 'Sent!', description: 'Offer sent correctly' });
        } catch (error) {
            history.push('/');
            notification.error({ message: 'Unauthorized', description: 'Log in first' });
            console.error(error);
        }
    };
    async function getOffer() {
        try {
            const token = localStorage.getItem('tokenUsr');
            if (productSel) {
                // const sellerEmailRec = props.sellerSel.email;
                // setSellerEmail(sellerEmailRec);
				const itemOffer = await axios.get(`${CURRENT_URL}/offer?productid=${productSel.id}`,
				{ headers: { authorization: token } });
				setOffer(itemOffer.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const openChatBuyer2 = (destChat) => {
        localStorage.setItem('dest', destChat);
        history.push('/chat');
    };

    useEffect(() => {
        getOffer();
    }, []);

    return (
        <>
			{sellerSel.email === localStorage.getItem('email')
			?	(
				<>
				{offer
				?	(
					<>
						<p>Offers received: </p>
						<button className="offerButton" type="button" onClick={getOffer}>Show</button>
						<p />
						{offer.map((item) => (
						<>
							<span>
								Product title:
								{item.title}
								-
							</span>
							<span>
								Value:
								{item.offerValue}
								-
							</span>
							<span>
								Email:
								{item.User.email}
							</span>
							<MessageOutlined style={{ fontSize: '50px', color: 'gray' }} onClick={() => openChatBuyer2(item.User.email)}>Chat</MessageOutlined>
							<p />
						</>
						))}
					</>
					)
				: 	(
					<>
						<p>No offer yet</p>
					</>
					)}
				</>
				)
			: 	(
				<>
					<form className="send" onSubmit={addOffer}>
						<div className="textStyle">
							<Input type="number" name="addoffer" />
							<button className="offerButton" type="submit">Make an offer</button>
						</div>
					</form>
				</>
				)}
        </>
    );
};

Offer.propTypes = {
	productSel: PropTypes.arrayOf(PropTypes.string).isRequired,
	sellerSel: PropTypes.string.isRequired,
};

export default Offer;
