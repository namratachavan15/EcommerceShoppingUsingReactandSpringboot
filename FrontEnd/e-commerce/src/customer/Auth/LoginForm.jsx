import React, { useEffect } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/Auth/Action";

const LoginForm = ({ handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (auth?.jwt && auth?.role) {
      if (auth.role === "ADMIN") navigate("/admin");
      else navigate("/");
      if (handleClose) handleClose();
    }
  }, [auth, navigate, handleClose]);

  return (
    <Grid container>
      {/* Left Side Illustration / Gradient */}
      <Grid
        size={12}
        xs={12}
        md={5}
        sx={{
          background: "linear-gradient(135deg, #9155FD 0%, #7A44D1 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 5,
        }}
      >
        <item>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ opacity: 0.9 }}>
          Log in to continue exploring amazing deals and offers.
        </Typography>
        </item>
      </Grid>

      {/* Right Side Form */}
      <Grid
        item
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
          Login to Your Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
          />

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
            Login
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "center" }}
        >
          Don’t have an account?{" "}
          <Button onClick={() => navigate("/register")} sx={{ color: "#9155FD" }}>
            Register
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
