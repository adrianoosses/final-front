import axios from 'axios';
import moment from 'moment'
import { notification, Input } from 'antd'
import { useHistory } from 'react-router-dom';
//import './Chat.css';
import {CURRENT_URL} from '../../App';
import TextArea from 'antd/lib/input/TextArea';
export default function ProductToSell() {
    const history = useHistory();
    const format = "YYYY-MM-DD HH:mm:ss";
    const currentDate = new Date().getTime();
    const uploadProduct = async(event) =>{
        try {
            event.preventDefault();
            const form = event.target;

            let email = localStorage.getItem('email');
            // console.log("dest1: ", email)
            const itemProduct = {
                sellerEmail: email, 
                title: form.productTitle.value,
                description: form.productDescription.value,
                price: form.priceDescription.value,
                sellDate:moment(currentDate).format(format),
                productStatus: form.productStatus.value,
                createdAt:moment(currentDate).format(format),
                updatedAt:moment(currentDate).format(format),
                mainImage: form.productImage.value,
            }
            await axios.post(CURRENT_URL + `/product`, itemProduct);

            // console.log("product:", product);
            notification.success({ message: 'Added!', description: 'Product added'});
            history.push('/');
            //setScore(score.data);
        } catch (error) {
            console.error(error)
        }
    }
    return (
        
        <div>
            <div className="generalContainerLogin">
            <p className="textStyle">Product to sell</p>
                <div className="containerLogin">
                    
                    <div className="containerForm">
                        <form className="send" onSubmit={uploadProduct}>
                        <div className="textStyle" >Title: <Input type="text" name="productTitle"/></div>
                        <div className="textStyle" >Description: <TextArea name="productDescription"/></div>
                        <div className="textStyle" >Price: <Input type="number" name="priceDescription"/></div>
                        <div className="textStyle" >Product Status: <Input type="text" name="productStatus"/></div>
                        <div className="textStyle" >Image URL: <Input type="text" name="productImage"/></div>
                        <button className="loginButton" type="submit">Send</button>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    )
}
