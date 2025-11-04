import React, { useEffect } from 'react';
import AddressCart from '../AddressCart/AddressCart';
import { Button } from '@mui/material';
import Cartitem from '../Cart/Cartitem';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment } from '../../../state/Payment/Action';
import { getCart } from '../../../state/Cart/Action';
import { getOrderById } from '../../../state/Order/Action';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  const { order } = useSelector((store) => store);
  const address = useSelector((store) => store.order.savedAddress);

  console.log("order is", order);

  // ✅ Only fetch order if orderId exists
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const handleCheckout = () => {
    if (!orderId) {
      alert("Order not created yet!");
      return;
    }

    // ✅ Process payment
    dispatch(createPayment(orderId)).then(() => {
      dispatch(getCart()); // ✅ clear cart after payment
    //  navigate(`/payment/${orderId}`);
    });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCart address={order.order?.shippingAddress} />
      </div>

      <div className="mt-5">
        <div className="lg:grid grid-cols-3 lg:px-6 relative">
          <div className="col-span-2">
            {order.order?.orderItems?.map((item) => (
              <Cartitem key={item.id} item={item} isOrderSummary={true} />
            ))}
          </div>

          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border p-3">
              <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
              <hr />
              <div className="space-y-3 font-semibold mb-10">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>₹{order.order?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3 ">
                  <span>Discount</span>
                  <span className="text-green-600">₹-{order.order?.discount}</span>
                </div>
                <div className="flex justify-between pt-3 ">
                  <span>Delivery Charge</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between pt-3 font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{order.order?.amount}</span>
                </div>
              </div>

              <Button
                variant="contained"
                className="w-full mt-5"
                sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}
                onClick={handleCheckout}
              >
                CheckOut
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
