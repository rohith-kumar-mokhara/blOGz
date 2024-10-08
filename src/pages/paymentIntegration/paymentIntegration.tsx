import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { verifyProjectAndPay } from '../../../contract/interact'; // Adjust the import path as needed

const PaymentIntegration = () => {
  const [id, setId] = useState<number | ''>('');
  const [noOfMilestones, setNoOfMilestones] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleVerifyAndPay = async () => {
    if (id !== '' && noOfMilestones !== '') {
      try {
        await verifyProjectAndPay(id,noOfMilestones);
        setSuccess('Payment successful!');
        setError(null);
      } catch (err) {
        setError(`Error: ${(err as Error).message}`);
        setSuccess(null);
      }
    } else {
      setError('Please fill in both fields.');
    }
  };

  return (
    <Container maxWidth="md">
      {/* Page Title */}
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Payment Integration
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Verify project and make a payment.
        </Typography>
      </Box>

      {/* Payment Form */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Verify and Pay
          </Typography>
          <TextField
            label="Project ID"
            variant="outlined"
            fullWidth
            type="number"
            value={id}
            onChange={(e) => setId(parseInt(e.target.value))}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Number of Milestones"
            variant="outlined"
            fullWidth
            type="number"
            value={noOfMilestones}
            onChange={(e) => setNoOfMilestones(parseInt(e.target.value))}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleVerifyAndPay}>
            Verify and Pay
          </Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentIntegration;
