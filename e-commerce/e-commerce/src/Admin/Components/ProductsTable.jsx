import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Pagination,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, findProducts } from '../../state/Product/Action';
import EditProductForm from './EditProductForm'; // New form component

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.product);

  const [page, setPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null); // store product to edit
  const rowsPerPage = 5;

  useEffect(() => {
    dispatch(findProducts({
      category: '',
      colors: [],
      size: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      stock: '',
      pageNumber: page - 1,
      pageSize: rowsPerPage,
    }));
  }, [dispatch, page, products?.deletedProduct]);

  const handlePageChange = (event, value) => setPage(value);

  const handleProductDelete = (productId) => dispatch(deleteProduct(productId));

  const handleEditClick = (product) => setEditingProduct(product); // Open edit form

  const allProducts = products?.content || [];
  const totalPages = products?.totalPages || 1;

  console.log("in  product table",allProducts)
  return (
    <div className="p-10">
      <Card className="bg-[#1b1b1b]">
        <CardHeader title="All Products" />
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts.map((item) => (
                <TableRow key={item.id}>
                  <TableCell><Avatar src={item.imageUrl || null} /></TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category?.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                  <IconButton onClick={() => handleEditClick(item)}>
                  <EditIcon sx={{ color: '#1976d2' }} />
</IconButton>
<IconButton onClick={() => handleProductDelete(item.id)}>
  <DeleteIcon sx={{ color: '#ff4c4c' }} />
</IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Stack spacing={2} className="py-5 flex justify-center items-center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Stack>
        )}
      </Card>

      {/* Edit Form Modal */}
      {editingProduct && (
        <EditProductForm
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsTable;
