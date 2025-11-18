// src/components/Admin/OrdersTable.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  confirmOrder,
  deleteOrder,
  deliveredorder,
  getOrders,
  shipOrder
} from '../../state/Admin/Order/Action';
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from '@mui/material';

const OrdersTable = () => {
  const [anchorEl, setAnchorEl] = useState([]);
  const [page, setPage] = useState(0); // current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // default rows per page

  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch, adminOrder.confirmed, adminOrder.shipped, adminOrder.delivered, adminOrder.deleteOrder]);
  

  useEffect(() => {
    if (adminOrder.orders?.length) {
      setAnchorEl(new Array(adminOrder.orders.length).fill(null));
    }
  }, [adminOrder.orders]);

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  const handleShippedOrder = (orderId, index) => {
    dispatch(shipOrder(orderId));
    handleClose(index);
  };

  const handleConfirmedOrder = (orderId, index) => {
    dispatch(confirmOrder(orderId));
    handleClose(index);
  };

  const handleDeliveredOrder = (orderId, index) => {
    dispatch(deliveredorder(orderId));
    handleClose(index);
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice data for current page
  const paginatedOrders = adminOrder.orders?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  console.log("paginated order",paginatedOrders)
  return (
    <div className="p-10">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Orders" />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            { <TableBody>
              {paginatedOrders?.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <AvatarGroup max={2} sx={{ justifyContent: 'start' }}>
                      {(Array.isArray(item.orderItems) ? item.orderItems : []).map((orderItem) => (
                        <Avatar
                          key={orderItem.id || orderItem.product.id}
                          src={orderItem.product.imageUrl}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell align="left">
                    {(Array.isArray(item.orderItems) ? item.orderItems : []).map((orderItem) => (
                      <p key={orderItem.id || orderItem.product.id}>
                        {orderItem.product.title}
                      </p>
                    ))}
                  </TableCell>

                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="left">{item.totalPrice}</TableCell>
                  <TableCell align="left">
                    <span
                      className={`text-white px-5 py-2 rounded-full ${
                        item.orderStatus === 'CONFIRMED'
                          ? 'bg-[#369236]'
                          : item.orderStatus === 'SHIPPED'
                          ? 'bg-[#4141ff]'
                          : item.orderStatus === 'PLACED'
                          ? 'bg-[#02B290]'
                          : item.orderStatus === 'PENDING'
                          ? 'bg-[gray]'
                          : 'bg-[#025720]'
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </TableCell>

                  <TableCell align="left">
                    <Button
                      id={`status-button-${index}`}
                      aria-controls={`status-menu-${index}`}
                      aria-haspopup="true"
                      aria-expanded={Boolean(anchorEl[index])}
                      onClick={(event) => handleClick(event, index)}
                    >
                      Status
                    </Button>
                    <Menu
                      id={`status-menu-${index}`}
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => handleClose(index)}
                    >
                      <MenuItem onClick={() => handleConfirmedOrder(item.id, index)}>
                        Confirmed Order
                      </MenuItem>
                      <MenuItem onClick={() => handleShippedOrder(item.id, index)}>
                        Shipped Order
                      </MenuItem>
                      <MenuItem onClick={() => handleDeliveredOrder(item.id, index)}>
                        Delivered Order
                      </MenuItem>
                    </Menu>
                  </TableCell>

                  <TableCell align="left">
                    <Button onClick={() => handleDeleteOrder(item.id)} variant="outlined">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> }
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={adminOrder.orders?.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </div>
  );
};

export default OrdersTable;
