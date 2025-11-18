import React, { useEffect } from 'react'
import Cartitem from './Cartitem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../state/Cart/Action'

const Cart = () => {
  const navigate = useNavigate();
  const { cart } = useSelector(store => store);
  const dispatch = useDispatch();

  const handleCheckOut = () => {
    console.log("clicked")
    navigate("/checkout?step=2")
  }

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch, cart.updateCartItem, cart.deleteCartItem]);

  // ✅ If no cart or no items → show empty cart screen
  console.log("cart is",cart)
  if (!cart.cart?.cartItems || cart.cart.cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-700">🛒 Your cart is empty</p>
          <p className="text-gray-500 mt-2">Looks like you haven’t added anything yet.</p>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            sx={{ mt: 4, px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  // ✅ If cart has items → show items + price details
  return (
    <div className="lg:grid grid-cols-3 lg:px-6 relative">
      <div className="col-span-2">
        {cart.cart?.cartItems.map((item) => (
          <Cartitem key={item.id} item={item} isOrderSummary={false}/>
        ))}
      </div>

      <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-5">
        <div className="border rounded-md p-4 shadow-md">
          <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
          <hr />
          <div className="space-y-3 font-semibold mb-10">
            <div className="flex justify-between pt-3 text-black">
              <span>Price</span>
              <span>₹{cart.cart?.totalPrice}</span>
            </div>
            <div className="flex justify-between pt-3 ">
              <span>Discount</span>
              <span className="text-green-600">₹-{cart.cart?.discountPercent}</span>
            </div>
            <div className="flex justify-between pt-3 ">
              <span>Delivery Charge</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between pt-3 font-bold">
              <span>Total Amount</span>
              <span className="text-green-600">₹{cart.cart?.amount}</span>
            </div>
          </div>
          <Button
            onClick={handleCheckOut}
            variant="contained"
            className="w-full mt-5"
            sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}
          >
            CheckOut
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart
