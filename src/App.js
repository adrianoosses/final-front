import './App.css';
import 'antd/dist/antd.css'

import ProductList from './containers/ProductList/ProductList';
import ProductData from './containers/ProductData/ProductData'

import Profile from './containers/Profile/Profile';
import Buttons from './components/Buttons/Buttons';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Chat from './containers/Chat/Chat';

import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  const [user, setUser] = useState(null);
  window.onbeforeunload = function() {
    localStorage.clear();
 }

  return (
    <BrowserRouter className="appStyle" >
      <Buttons user={user} setUser={setUser}/>
      <Switch>
        <Route path='/' exact component={ProductList} />
        <Route path='/signup' exact component={Signup} />
        <Route path="/login" children={<Login user={user} setUser={setUser}/>} exact/>
        <Route path="/logout" children={<Logout user={user} setUser={setUser}/>} exact/>
        <Route path='/productdata' exact component={ProductData} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/chat' exact component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
