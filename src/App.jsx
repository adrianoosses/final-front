import './App.css';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProductList } from './containers/ProductList/ProductList';
import ProductData from './containers/ProductData/ProductData';
import Profile from './containers/Profile/Profile';
import Buttons from './components/Buttons/Buttons';
import Footer from './components/Footer/Footer';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Chat from './containers/Chat/Chat';
import ProductToSell from './containers/ProductToSell/ProductToSell';
import ProductFavorite from './containers/ProductFavorite/ProductFavorite';
import ControlPanel from './containers/ControlPanel/ControlPanel';
import { ProductProvider } from './containers/ProductContext/ProductContext';

function App() {
	const [user, setUser] = useState(localStorage.getItem('email'));
	/*
	window.onbeforeunload = function() {
	  localStorage.clear();
   }
   */

	return (
		<>
			<ProductProvider>
				<BrowserRouter className="appStyle">
					<Buttons user={user} setUser={setUser} />
					<Switch>
						<Route path="/" exact component={ProductList} />
						<Route path="/signup" exact component={Signup} />
						<Route path="/login" exact component={Login} />
						<Route path="/logout" exact component={Logout} />
						<Route path="/productdata/:id" exact component={ProductData} />
						<Route path="/profile" exact component={Profile} />
						<Route path="/chat" exact component={Chat} />
						<Route path="/sellproduct" exact component={ProductToSell} />
						<Route path="/controlpanel" exact component={ControlPanel} />
						<Route path="/productfavorites" exact component={ProductFavorite} />
					</Switch>
					<Footer />
				</BrowserRouter>
			</ProductProvider>
		</>
	);
}

export default App;
