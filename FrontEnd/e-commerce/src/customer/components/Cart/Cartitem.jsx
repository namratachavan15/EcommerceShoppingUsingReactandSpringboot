import { Button, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../state/Cart/Action";

const Cartitem = ({ item, isOrderSummary }) => {
  const dispatch = useDispatch();

  const handleUpdateCartItem = (num) => {
    const data = { data: { quantity: item.quantity + num }, cartItemId: item?.id };
    dispatch(updateCartItem(data));
  };

  const handleRemoveCartItem = () => {
    if (!isOrderSummary) {
      dispatch(removeCartItem(item.id));
    }
  };

  return (
    <div className="p-8 shadow-lg border rounded-md mt-5 flex items-start gap-4">
      {/* ✅ Smaller Image */}
      <div className="w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0">
        <img
          className="w-full h-full object-cover object-top rounded"
          src={item.product.imageUrl}
          alt={item.product.title}
        />
      </div>

      {/* Product Info + Controls */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{item.product.title}</p>
            <p className="opacity-70">{item.product.brand}</p>
            <p className="opacity-70">Size: {item.size}</p>
          </div>

          {/* ✅ Quantity & Remove on the same line */}
          {isOrderSummary === false && (
            <div className="flex items-center space-x-2">
              <IconButton
                size="small"
                disabled={item.quantity <= 1}
                onClick={() => handleUpdateCartItem(-1)}
              >
                <RemoveCircleOutlineIcon fontSize="small" />
              </IconButton>

              <span className="px-3 py-1 border rounded-sm">{item.quantity}</span>

              <IconButton
                size="small"
                sx={{ color: "RGB(145 85 253)" }}
                onClick={() => handleUpdateCartItem(1)}
              >
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>

              <Button
                variant="text"
                size="small"
                color="error"
                onClick={handleRemoveCartItem}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        {/* Price Details Below */}
        <div className="flex space-x-4 items-center pt-2">
          <p className="font-semibold">₹{item.price}</p>
          <p className="opacity-50 line-through">₹{item.discountedPrice}</p>
          <p className="text-green-600 font-semibold">{item.discountPercent}% Off</p>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
