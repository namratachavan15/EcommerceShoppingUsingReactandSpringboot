import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { getAllOrdersForUser } from "../../../state/Order/Action";


const orderStatus = [
  { label: "PENDING", value: "PENDING" },
  { label: "PLACED", value: "PLACED" },
  { label: "SHIPPED", value: "SHIPPED" },
  { label: "RETURNED", value: "RETURNED" },
];


const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((store) => store.order);
  const [selectedStatus, setSelectedStatus] = useState([]);

  // Fetch user orders on component mount
  useEffect(() => {
    dispatch(getAllOrdersForUser());
  }, [dispatch]);

  console.log("orders in order.jsx",orders)

  // Handle checkbox toggle
  const handleStatusChange = (status) => {
    setSelectedStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Filter orders based on selected status
// Filter orders based on selected status
const filteredOrders =
  selectedStatus.length > 0
    ? orders.filter((order) =>
        selectedStatus.includes(order.orderStatus.toUpperCase())
      )
    : orders;


  return (
    <div className="px-5 lg:px-20 mt-10">
      <Grid container spacing={2}>
        {/* Filter Sidebar */}
        <Grid item xs={12} lg={3}>
          <div className="h-auto shadow-lg bg-white p-8 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-8">
              <h2 className="font-semibold">ORDER STATUS</h2>
              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option.value}
                    checked={selectedStatus.includes(option.value)}
                    onChange={() => handleStatusChange(option.value)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    className="ml-3 text-sm text-gray-600 cursor-pointer"
                    htmlFor={option.value}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* Orders List */}
        <Grid item xs={12} lg={9}>
          <div className="space-y-5">
            {loading ? (
              <p>Loading orders...</p>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
