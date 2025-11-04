import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import AddressCart from '../AddressCart/AddressCart';
import { useDispatch } from 'react-redux';
import { createOrder, saveAddress } from '../../../state/Order/Action';
import { useNavigate } from 'react-router-dom';

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };

    // ✅ Save address in Redux
    dispatch(saveAddress(address));

    // ✅ Create order and navigate with order_id
    dispatch(createOrder({ address, navigate }));

    console.log("address", address);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100%',
        height: 'auto',
      }}
    >
      {/* Left Side: Address Card */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          border: '1px solid #ddd',
          borderRadius: { xs: '8px 8px 0 0', md: '8px 0 0 8px' },
          overflowY: 'auto',
          boxShadow: 1,
          p: 3,
          bgcolor: '#fff',
        }}
      >
        <AddressCart />
        {/* Optional: You can remove this if you only want form submission */}
        <Button sx={{ mt: 2, bgcolor: 'rgb(145, 85, 253)' }} variant="contained">
          Deliver Here
        </Button>
      </Box>

      {/* Right Side: Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: '100%', md: '50%' },
          border: '1px solid #ddd',
          borderTop: { xs: 'none', md: '1px solid #ddd' },
          borderLeft: { md: 'none' },
          borderRadius: { xs: '0 0 8px 8px', md: '0 8px 8px 0' },
          overflowY: 'auto',
          boxShadow: 1,
          p: 3,
          bgcolor: '#fff',
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <TextField label="First Name" name="firstName" fullWidth required sx={{ flex: '1 1 48%' }} />
          <TextField label="Last Name" name="lastName" fullWidth required sx={{ flex: '1 1 48%' }} />
          <TextField label="Address" name="address" fullWidth multiline rows={3} required sx={{ flex: '1 1 100%' }} />
          <TextField label="City" name="city" fullWidth required sx={{ flex: '1 1 48%' }} />
          <TextField label="State" name="state" fullWidth required sx={{ flex: '1 1 48%' }} />
          <TextField label="Zip Code" name="zip" fullWidth required sx={{ flex: '1 1 48%' }} />
          <TextField label="Phone Number" name="phoneNumber" fullWidth required sx={{ flex: '1 1 48%' }} />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, bgcolor: 'rgb(145, 85, 253)' }}
          >
            Deliver Here
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DeliveryAddressForm;
