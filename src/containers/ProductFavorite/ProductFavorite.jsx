import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { notification } from 'antd';
import CURRENT_URL from '../../constants/constants';

const ProductFavorite = (props) => {
    const [added, setAdded] = useState(false);
    const [colorFav, setColorFav] = useState('gray');
    const format = 'YYYY-MM-DD HH:mm:ss';
    const currentDate = new Date().getTime();
    const history = useHistory();

    const setProductFavorite = async(event) => {
        try {
            const token = localStorage.getItem('tokenUsr');
            // console.log("product selected favorites--------------", props.productSel);
            setAdded(true);
            setColorFav('red');  
            event.preventDefault();
            const buyerEmail = localStorage.getItem('email');
            const product = props.productSel;
            // console.log("product", product);
            const itemFavorite = {
                userEmail: buyerEmail,
                productId: product.id,
                createdAt: moment(currentDate).format(format),
                updatedAt: moment(currentDate).format(format),
            };
            // console.log("itemFavorite", itemFavorite);
            await axios.post(`${CURRENT_URL}/productfavorite`, itemFavorite, 
            { headers: { authorization: token } });
            // console.log("favorite:", favorite);
            notification.success({ message: 'Add!', description: 'Add to favorites correctly' });
        } catch (error) {
            history.push('/');
            notification.error({ message: 'Unauthorized', description: 'Log in first' });
            console.error(error);
        }
    }

    const deleteProductFavorite = async (event) => {
        try {
            setAdded(false);
            setColorFav('gray');
            event.preventDefault();
            const token = localStorage.getItem('tokenUsr');
            const product = props.productSel;
            await axios.delete(CURRENT_URL + `/productfavorite?productid=${product.id}`,
            { headers: { authorization: token } });
            notification.success({ message: 'Deleted!', description: 'Deleted from favorites correctly' });
        } catch (error) {
            history.push('/');
            notification.error({ message: 'Unauthorized', description: 'Log in first' });
            console.error(error);
        }
    };

    const handleFavButton = async(event) => {
        event.preventDefault();
        (!added)?setProductFavorite(event):deleteProductFavorite(event);
    };
    return (
        <>
        {added?
        <HeartFilled onClick={handleFavButton} style={{ fontSize: '50px', color: colorFav }} />
        :
        <HeartOutlined onClick={handleFavButton} style={{ fontSize: '50px', color: colorFav }} />
        }
        </>
    );
};

export default ProductFavorite;
