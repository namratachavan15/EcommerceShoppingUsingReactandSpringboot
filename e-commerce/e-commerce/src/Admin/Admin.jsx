import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreateProductForm from "./Components/CreateProductForm";
import ProductsTable from "./Components/ProductsTable";
import OrdersTable from "./Components/OrdersTable";
import AdminDashboard from "./Components/AdminDashboard";
import CustomerTable from "./Components/CustomerTable";

import {
  Avatar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
  useTheme
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/Auth/Action";

const drawerWidth = 240;

const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Product", path: "/admin/products", icon: <InventoryIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <SupportAgentIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <DashboardIcon /> },
  { name: "Add Products", path: "/admin/product/create", icon: <DashboardIcon /> },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuClick = (path) => {
    navigate(path);
    if (!isLargeScreen) setMobileOpen(false);
  };
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
  };

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {isLargeScreen && <Toolbar />}
      <List>
        {menu.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => handleMenuClick(item.path)}
          >
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleAvatarClick}>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: "#fff", color: "#9155FD" }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={user?.name || "Admin"} />
          </ListItemButton>
        </ListItem>
      </List>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: "#1976d2", // primary blue
            fontWeight: 600,
          
          }}
        >
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {!isLargeScreen && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        open={isLargeScreen ? true : mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "linear-gradient(180deg, #9155FD 0%, #5E35B1 100%)",
            color: "white",
            borderRight: "none",
            boxShadow: "3px 0px 10px rgba(0,0,0,0.3)",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", lg: `calc(100% - ${drawerWidth}px)` },
          p: { xs: 2, sm: 3 },
          marginLeft: { xs: 0, lg: "180px" },
        }}
      >
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/product/create" element={<CreateProductForm />} />
          <Route path="/products" element={<ProductsTable />} />
          <Route path="/orders" element={<OrdersTable />} />
          <Route path="/customers" element={<CustomerTable />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Admin;
