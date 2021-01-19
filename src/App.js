import './App.css';
import Header from './components/Header/Header';
import ProductList from './containers/ProductList/ProductList';

import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter className="appStyle" >
        <Header/>
        <Switch>
          <Route path='/' exact component={ProductList} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
