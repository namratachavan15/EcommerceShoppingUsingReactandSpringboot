import React, { useEffect, useState } from "react";
import { Table, Spinner, Accordion } from "react-bootstrap";
import { api } from "../../config/apiConfig";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await api.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched users:", data); // ✅ This will now log properly
        setCustomers(data);
      } catch (err) {
        console.error("Error loading users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [token]);

  if (loading) return <Spinner animation="border" />;

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">All Customers</h2>

      <Accordion defaultActiveKey="0">
        {customers.map((user, index) => (
          <Accordion.Item eventKey={index.toString()} key={user.id}>
            <Accordion.Header>
              {user.firstName} {user.lastName} — {user.email}
            </Accordion.Header>

            <Accordion.Body>
              <p><strong>Mobile:</strong> {user.mobile}</p>

              <h5>Orders & Payment Info:</h5>
              {user.orders?.length > 0 ? (
                user.orders.map(order => (
                  <div key={order.id}>
                    <p>
                      <strong>Order ID:</strong> {order.orderId} <br />
                      <strong>Status:</strong> {order.orderStatus} <br />
                      <strong>Total Price:</strong> ₹{order.totalPrice} <br />
                      <strong>Payment Method:</strong> {order.paymentMethod} <br />
                      <strong>Payment Status:</strong> {order.paymentDetails?.status}
                    </p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>No orders found</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default CustomerList;
