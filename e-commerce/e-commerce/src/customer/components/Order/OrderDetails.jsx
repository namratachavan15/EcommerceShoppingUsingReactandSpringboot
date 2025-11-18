import React from "react";
import AddressCart from "../AddressCart/AddressCart";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const OrderDetails = () => {
  return (
    <div className="px:5 lg:px-20 ">
      <div>
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressCart />
      </div>

      <div className="py-20">
        <OrderTracker activeStep={3} />
      </div>
      <Grid className="space-y-4 container">
        {[1, 1, 1, 1, 1].map((item) => (
          <Grid
            container
            className="shadow-xl rounded-md p-5 border"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={6}>
              <div className="space-x-4 ml-5 flex items-center">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/l/f/r/xl-k-spl668-yellow-sg-leman-original-imagznqcrahgq9rf.jpeg?q=70"
                  alt=""
                />
                <div className="ml-4 space-y-2">
                  <p className="font-semibold">
                    Men Embroidered Jacquard Straight Kurta
                  </p>
                  <p className="space-x-5 opacity-50 text-xs font-semibold">
                    <span>Color: black</span> <span>Size: M</span>
                  </p>
                  <p>Seller: Linaria</p>
                  <p>₹1999</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  color: deepPurple[500],
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <StarBorderIcon sx={{ fontSize: "2rem" }} className="px-2" />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
