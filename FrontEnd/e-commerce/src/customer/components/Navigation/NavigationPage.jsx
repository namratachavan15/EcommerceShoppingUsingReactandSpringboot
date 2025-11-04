'use client';
import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import { ShoppingCart, ExpandMore, Search } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Menu,
  MenuItem,
  InputBase,
  Badge,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../../state/Auth/Action';
import { getCart } from '../../../state/Cart/Action';
import AuthModel from '../../Auth/AuthModel';
import { navigation } from './navigationData';

export default function FlipkartUnifiedNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const openUserMenu = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const { auth, cart } = useSelector((store) => store);

  const handleSearch = () => {
    if (searchKeyword.trim() !== '')
      navigate(`/search-results?query=${searchKeyword}`);
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSearch();

  const handleUserClick = (e) => setAnchorEl(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    navigate('/');
  };

  const handleOpen = () => setOpenAuthModel(true);
  const handleClose = () => setOpenAuthModel(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart());
    }
  }, [jwt]);

  useEffect(() => {
    if (auth.user) handleClose();
  }, [auth.user]);

  return (
    <header className="sticky top-0 z-50 shadow-md bg-gradient-to-r from-blue-600 to-blue-700 font-sans">
      <div className="flex items-center justify-between px-6 py-2 lg:px-12 space-x-6">
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img
            src="https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg"
            alt="Logo"
            className="h-8 mr-2"
          />
          <span className="text-white text-sm italic">
            Explore <span className="text-yellow-400 font-semibold">Plus+</span>
          </span>
        </div>

        {/* Category Menu (Men/Women/etc.) */}
        <PopoverGroup className="hidden lg:flex space-x-6 items-center text-white">
          {navigation.categories.map((category) => (
            <Popover key={category.name} className="relative">
              <PopoverButton className="flex items-center text-sm font-medium hover:text-yellow-300 focus:outline-none">
                {category.name}
                <ExpandMore className="ml-1 text-white" fontSize="small" />
              </PopoverButton>

              {/* Dropdown Panel */}
              <PopoverPanel className="absolute left-0 top-full z-20 mt-2 bg-white shadow-2xl rounded-xl text-gray-900 border border-gray-200">
                <div className="p-6 grid grid-cols-3 gap-8 w-[650px]">
                  {category.sections.map((section) => (
                    <div key={section.name}>
                      {/* Section title */}
                      <p className="font-bold text-lg text-gray-800 mb-3 border-b border-gray-300 pb-1">
                        {section.name}
                      </p>
                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li
                            key={item.name}
                            className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors duration-200"
                            onClick={() =>
                              navigate(`/${category.id}/${section.id}/${item.id}`)
                            }
                          >
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
          ))}
        </PopoverGroup>

        {/* Search Bar */}
        <div className="flex bg-white rounded-md w-[35%] items-center px-2 py-1">
          <Search className="text-gray-500" />
          <InputBase
            placeholder="Search for products, brands and more"
            fullWidth
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-6 text-white text-sm font-medium">
          {/* Login / Profile */}
          {auth.user ? (
            <div className="relative">
              <div
                onClick={handleUserClick}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Avatar sx={{ bgcolor: deepPurple[500], width: 28, height: 28 }}>
                  {auth.user.firstName[0].toUpperCase()}
                </Avatar>
                <span>{auth.user.firstName}</span>
                <ExpandMore className="!text-white" fontSize="small" />
              </div>
              <Menu
                anchorEl={anchorEl}
                open={openUserMenu}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => navigate('/account/profile')}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={() => navigate('/account/order')}>
                  Orders
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              variant="contained"
              color="inherit"
              onClick={handleOpen}
              sx={{
                textTransform: 'none',
                bgcolor: 'white',
                color: '#2874f0',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#f0f0f0' },
              }}
            >
              Login
            </Button>
          )}

          {/* Seller and More */}
         

          {/* Cart */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/cart')}
          >
            <Badge
              badgeContent={cart.cart?.cartItems?.length || 0}
              color="error"
              sx={{ mr: 1 }}
            >
              <ShoppingCart />
            </Badge>
            <span>Cart</span>
          </div>
        </div>
      </div>

      <AuthModel handleClose={handleClose} open={openAuthModel} />
    </header>
  );
}
