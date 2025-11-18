'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Modal, Box } from "@mui/material";
import { getUser } from "../../../../state/Auth/Action";
import { saveAddress, saveUserAddress } from "../../../../state/Order/Action";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const user = auth.user;

  const [openModal, setOpenModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    mobile: "",
  });

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleAddAddress = async () => {
    await dispatch(saveUserAddress(newAddress)); // wait for API
    setOpenModal(false);
    setNewAddress({
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      mobile: "",
    });
  
    // Refetch user to update addresses list
    dispatch(getUser(localStorage.getItem("jwt")));
  };
  
  return (
    <div className="p-6 lg:px-20">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* User Info */}
      <div className="border p-4 rounded-md mb-6">
        <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Mobile:</strong> {user?.mobile}</p>
      </div>

      {/* Saved Addresses */}
      <div className="border p-4 rounded-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Saved Addresses</h3>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Add New
          </Button>
        </div>
        {user?.addresses?.length > 0 ? (
          user.addresses.map((addr, idx) => (
            <div
              key={idx}
              className="border p-3 rounded-md mb-3"
            >
              <p>{addr.firstName} {addr.lastName}</p>
              <p>{addr.streetAddress}, {addr.city}, {addr.state} - {addr.zipCode}</p>
              <p>Mobile: {addr.mobile}</p>
            </div>
          ))
        ) : (
          <p>No addresses saved.</p>
        )}
      </div>

      {/* Add Address Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
          }}
        >
          <h2 className="text-lg font-bold mb-4">Add New Address</h2>
          <div className="flex flex-col gap-3">
            <TextField
              label="First Name"
              value={newAddress.firstName}
              onChange={(e) =>
                setNewAddress({ ...newAddress, firstName: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Last Name"
              value={newAddress.lastName}
              onChange={(e) =>
                setNewAddress({ ...newAddress, lastName: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Street Address"
              value={newAddress.streetAddress}
              onChange={(e) =>
                setNewAddress({ ...newAddress, streetAddress: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="State"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Zip Code"
              value={newAddress.zipCode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, zipCode: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Mobile"
              value={newAddress.mobile}
              onChange={(e) =>
                setNewAddress({ ...newAddress, mobile: e.target.value })
              }
              fullWidth
            />
            <Button variant="contained" onClick={handleAddAddress}>
              Save Address
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfilePage;
