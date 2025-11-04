import React from "react";
import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  // Assuming one orderItem per order; you can map over orderItems if multiple
  const item = order.orderItems[0];

  return (
    <div
      onClick={() => navigate(`/account/order/${order.id}`)}
      className="p-5 shadow-md shadow-black hover:shadow-2xl ml-10 border cursor-pointer"
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between", marginLeft: "30px" }}>
        
        {/* Product Info */}
        <Grid item xs={6}>
          <div className="flex">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src={item.product.imageUrl}
              alt={item.product.title}
            />
            <div className="ml-5 space-y-2">
              <p className="mb-2 font-semibold">{item.product.title}</p>
              <p className="opacity-50 text-xs font-semibold">Size: {item.size}</p>
              <p className="opacity-50 text-xs font-semibold">Color: {item.product.color}</p>
            </div>
          </div>
        </Grid>

        {/* Price */}
        <Grid item xs={2} sx={{ marginLeft: "150px" }}>
          <p>₹{item.discountedPrice}</p>
        </Grid>

        {/* Status */}
        <Grid item xs={4} sx={{ marginLeft: "150px" }}>
          {order.orderStatus === "DELIVERED" ? (
            <div>
              <p>
                <AdjustIcon sx={{ width: "15px", height: "15px" }} className="text-green-600 mr-2 text-sm" />
                Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
              </p>
              <p className="text-xs">Your item has been delivered</p>
            </div>
          ) : order.orderStatus === "PLACED" ? (
            <p>
              <span>Expected Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</span>
            </p>
          ) : (
            <p>Status: {order.orderStatus}</p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
