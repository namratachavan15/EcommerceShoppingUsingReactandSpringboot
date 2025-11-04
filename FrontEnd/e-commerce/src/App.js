import logo from './logo.svg';
import './App.css';
import HomePage from './customer/components/pages/HomePage/HomePage';
import FooterPage from './customer/components/Footer/FooterPage';
import Navigation from './customer/components/Navigation/NavigationPage';
import Product from './customer/components/Product/Product';

import ProductDetails from './customer/components/ProductDetails/ProductDetails';
import Cart from './customer/components/Cart/Cart';
import Checkout from './customer/components/Checkout/Checkout';
import Order from './customer/components/Order/Order';
import OrderDetails from './customer/components/Order/OrderDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerRouter from './routers/CustomerRouter';
import AdminRouters from './routers/AdminRouters';


function App() {
  return (
  //  <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CustomerRouter />} />
        <Route path="/admin/*" element={<AdminRouters/>}/>
      </Routes>
    // </BrowserRouter>
  );
}

export default App;
