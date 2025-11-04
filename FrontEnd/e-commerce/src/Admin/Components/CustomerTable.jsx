import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { api } from "../../config/apiConfig";

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched customers:", data);
        setCustomers(data);
      } catch (err) {
        console.error("Error loading users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [token]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        All Customers
      </Typography>

      {customers.map((user, index) => (
        <Accordion key={user.id} defaultExpanded={index === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: "#f5f5f5" }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography sx={{ ml: 2, color: "text.secondary" }}>
              {user.email}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {/* Customer info */}
            <Typography sx={{ mb: 1 }}>
              <strong>Mobile:</strong> {user.mobile || "N/A"}
            </Typography>

            {/* Orders */}
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Orders
            </Typography>

            {user.orders && user.orders.length > 0 ? (
              user.orders.map((order) => (
                <Box key={order.id} sx={{ mb: 3 }}>
                  <Typography>
                    <strong>Order ID:</strong> {order.orderId || order.id} <br />
                    <strong>Status:</strong> {order.orderStatus} <br />
                    <strong>Total Price:</strong> ₹{order.totalPrice} <br />
                    <strong>Payment Method:</strong>{" "}
                    {order.paymentDetails?.paymentMethod || "N/A"} <br />
                    <strong>Payment Status:</strong>{" "}
                    {order.paymentDetails?.status || "N/A"}
                  </Typography>

                  {/* Ordered Products */}
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Products:
                  </Typography>
                  <Grid container spacing={2}>
                    {order.orderItems.map((item) => (
                      <Grid
                        item
                        key={item.id}
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #ddd",
                          p: 1,
                          borderRadius: 2,
                        }}
                      >
                        <Avatar
                          src={item.product.imageUrl}
                          variant="square"
                          sx={{ width: 64, height: 64, mr: 2 }}
                        />
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            {item.product.title}
                          </Typography>
                          <Typography>
                            Quantity: {item.quantity} | Price: ₹{item.price}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <hr />
                </Box>
              ))
            ) : (
              <Typography sx={{ ml: 2, color: "text.secondary" }}>
                No orders found.
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default CustomerTable;
