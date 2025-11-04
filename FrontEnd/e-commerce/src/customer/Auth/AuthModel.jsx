import { Box, Modal } from '@mui/material';
import React from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { useLocation } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxWidth: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  overflow: 'hidden',
  p: 0,
};

const AuthModel = ({ handleClose, open }) => {
  const location = useLocation();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="auth-modal-title"
    >
      <Box sx={style} >
        {location.pathname === "/login" 
          ? <LoginForm handleClose={handleClose} /> 
          : <RegisterForm />}
      </Box>
    </Modal>
  );
};

export default AuthModel;
