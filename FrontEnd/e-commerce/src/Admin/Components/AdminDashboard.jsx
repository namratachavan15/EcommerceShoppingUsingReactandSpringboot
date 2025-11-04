import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import Achivement from './Achivement';
import MonthlyOverview from './MonthlyOverview';
import OrdersTable from '../view/OrderTableView';
import ProductTableView from '../view/ProductTableView';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({ backgroundColor: '#fff', ...theme.typography.body2, padding: theme.spacing(1), textAlign: 'center', color: (theme.vars ?? theme).palette.text.secondary, ...theme.applyStyles('dark', { backgroundColor: '#1A2027', }), }));

const AdminDashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{xs:12,md:6}}>
          <Item className='shadow-lg shadow-gray-600'>
            <Achivement />
          </Item>
        </Grid>
        <Grid size={{xs:12,md:6}}>
          <Item>
            <MonthlyOverview />
          </Item>
        </Grid>
        <Grid size={{xs:12,md:12}}>
          <Item>
            <OrdersTable />
          </Item>
        </Grid>
        <Grid size={{xs:12,md:12}}>
          <Item>
            <ProductTableView />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
