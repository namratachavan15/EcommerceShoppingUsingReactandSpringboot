import React, { useEffect } from "react";

import {
  Button, Grid, TextField, Typography,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../state/Auth/Action";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) dispatch(getUser(jwt));
  }, [jwt, auth.jwt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      role: data.get("role"),
      mobile: data.get("mobile"),
    };
    dispatch(register(userData));
  };

  return (
    <Grid container sx={{ minHeight: "450px" }}>
      {/* Left Gradient Section */}
      <Grid
        size={12}
        xs={12}
        md={5}
        sx={{
          background: "linear-gradient(135deg, #7A44D1 0%, #9155FD 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 1,
          
        }}
      >
        <item>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Join Our Community
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ opacity: 0.9 }}>
          Create an account to start shopping and managing your orders easily.
        </Typography>
        </item>
      </Grid>

      {/* Right Side Form */}
      <Grid
        
        xs={12}
        md={7}
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <item>
              <TextField label="First Name" name="firstName" fullWidth required />
              </item>
            </Grid>
            <Grid size={12}>
              <item>
              <TextField label="Last Name" name="lastName" fullWidth required />
              </item>
            </Grid>
            <Grid size={12}>
            <item>
              <TextField label="Email" name="email" fullWidth required />
              </item>
            </Grid>
            <Grid size={12}>
  <item>
    <TextField
      label="Mobile Number"
      name="mobile"
      fullWidth
      required
      inputProps={{ maxLength: 10 }}
    />
  </item>
</Grid>

            <Grid size={6}>
              <item>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
              />
              </item>
            </Grid>
            <Grid size={6}>
              <item>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                {/* <Select name="role" defaultValue="USER">
                  <MenuItem value="USER">User</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select> */}

<Select name="role" defaultValue="ROLE_CUSTOMER">
  <MenuItem value="ROLE_CUSTOMER">User</MenuItem>
  <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
</Select>

              </FormControl>
              </item>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              backgroundColor: "#9155FD",
              "&:hover": { backgroundColor: "#7A44D1" },
              transition: "0.3s",
            }}
          >
            Register
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "center" }}
        >
          Already have an account?{" "}
          <Button onClick={() => navigate("/login")} sx={{ color: "#9155FD" }}>
            Login
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
