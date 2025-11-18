import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from '../customer/components/Navigation/NavigationPage'
import HomePage from '../customer/components/pages/HomePage/HomePage'
import Cart from '../customer/components/Cart/Cart'
import FooterPage from '../customer/components/Footer/FooterPage'
import Product from '../customer/components/Product/Product'
import ProductDetails from '../customer/components/ProductDetails/ProductDetails'
import Checkout from '../customer/components/Checkout/Checkout'
import Order from '../customer/components/Order/Order'
import OrderDetails from '../customer/components/Order/OrderDetails'
import PaymentSuccess from '../customer/components/Payment/PaymentSuccess'
import SearchResult from '../customer/components/pages/HomePage/SearchResult'
import ProfilePage from '../customer/components/pages/HomePage/ProfilePage'

const CustomerRouter = () => {
  return (
    <div>
        <div>
 <Navigation />
        </div>
       <Routes>
          <Route path="/login" element={<HomePage/>}/>
            <Route path="/register" element={<HomePage/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Product/>}/>
        <Route path="/product/:productId" element={<ProductDetails/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/account/order" element={<Order/>}/>
        <Route path="/account/order/:orderId" element={<OrderDetails/>}/>
        <Route path="/payment/:orderId" element={<PaymentSuccess/>}/>
        <Route path='/search-results' element={<SearchResult/>} />
        <Route path="/account/profile" element={<ProfilePage />} />

       </Routes>
       <div>
        <FooterPage/>
       </div>
    </div>
  )
}

export default CustomerRouter