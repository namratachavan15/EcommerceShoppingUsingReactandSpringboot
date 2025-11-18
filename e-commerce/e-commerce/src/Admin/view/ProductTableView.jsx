import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  CardHeader,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../state/Product/Action';

const ProductTableView = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  const [page, setPage] = useState(1);
  const rowsPerPage = 2;

  // Fetch products whenever the page changes
  useEffect(() => {
    const data = {
      category: 'mens_kurta', // adjust if needed
      colors: [],
      size: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      stock: '',
      pageNumber: page - 1,
      pageSize: rowsPerPage,
    };
    dispatch(findProducts(data));
  }, [dispatch, page]);

  // Handle pagination click
  const handlePageChange = (event, value) => {
    if (value !== page) {
      setPage(value);
    }
  };

  // Safely access products data
  const allProducts = products?.content || [];
  const totalPages = products?.totalPages || 1;

  console.log('ProductTableView -> products:', products);

  return (
    <div className="p-5 text-white">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="Recent Products" />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="product table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="left">
                    <Avatar src={item.imageUrl} />
                  </TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left">{item.category?.name}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <Stack spacing={2} className="py-5 flex justify-center items-center">
           <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" color="primary" />
          </Stack>
        )}
      </Card>
    </div>
  );
};

export default ProductTableView;
