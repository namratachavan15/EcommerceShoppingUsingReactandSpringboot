import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DeliveryAddressForm from './DeliveryAddressForm';

import OrderSummary from './OrderSummary';

const steps = ['Login', 'Add Delivery Address',"Order Summary", 'Payment'];

export default function Checkout() {
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);

  // get "step" from query string and convert to number
  const stepFromQuery = parseInt(querySearch.get("step")) || 0;

  // ✅ use that as activeStep
  const [activeStep, setActiveStep] = React.useState(stepFromQuery);

  React.useEffect(() => {
    setActiveStep(stepFromQuery);
  }, [stepFromQuery]);

  const steps = ['Login', 'Add Delivery Address', 'Order Summary', 'Payment'];

  return (
    <div className='px-10 lg:px-20 lg:mt-10'>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className='mt-10'>
          {activeStep === 2 ?<DeliveryAddressForm/>:<OrderSummary/>}
        </div>
      </Box>
    </div>
  );
}

