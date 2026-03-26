import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import {
  TextField,
  Button,
  Stack,
  Divider,
  Paper,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Avatar
} from '@mui/material'
import {
  ChevronRight as ChevronIcon,
  LocalShippingOutlined as ShippingIcon,
  VerifiedUserOutlined as SecureIcon,
  CreditCardOutlined as CardIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const toast = useToast()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: ''
  })

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order placement
    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      toast('Order placed successfully! Thank you for choosing Atelier.', 'success')
      navigate('/')
    }, 2000)
  }

  const shipping = totalPrice >= 150 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  return (
    <Box sx={{ bgcolor: 'background.default', pb: 12 }}>

      {/* Header with Breadcrumbs */}
      <Box sx={{ bgcolor: 'surface.containerLow', py: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.02em' }}>Checkout</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.75rem', fontWeight: 700 }}>HOME</Link>
            <ChevronIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.75rem', fontWeight: 700 }}>CART</Link>
            <ChevronIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CHECKOUT</Typography>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={8}>

            {/* Form Column */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Stack spacing={8}>

                {/* Billing Details */}
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.01em' }}>Billing Details</Typography>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Full Name" required name="fullName"
                        value={formData.fullName} onChange={handleInputChange}
                        sx={{ bgcolor: 'surface.containerLow' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Email Address" required type="email" name="email"
                        value={formData.email} onChange={handleInputChange}
                        sx={{ bgcolor: 'surface.containerLow' }}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        fullWidth label="Street Address" required name="address"
                        value={formData.address} onChange={handleInputChange}
                        sx={{ bgcolor: 'surface.containerLow' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Town / City" required name="city"
                        value={formData.city} onChange={handleInputChange}
                        sx={{ bgcolor: 'surface.containerLow' }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <TextField
                        fullWidth label="Postcode / ZIP" required name="zip"
                        value={formData.zip} onChange={handleInputChange}
                        sx={{ bgcolor: 'surface.containerLow' }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                {/* Payment Details */}
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.01em' }}>Payment Information</Typography>
                  <Paper sx={{ p: 4, borderRadius: '16px', bgcolor: 'surface.containerLow', boxShadow: 'none' }}>
                    <FormControl component="fieldset" fullWidth>
                      <RadioGroup defaultValue="credit_card">
                        <Stack spacing={3}>
                          <Box sx={{ p: 3, border: '1px solid', borderColor: 'primary.main', borderRadius: '12px', bgcolor: 'background.paper' }}>
                            <FormControlLabel value="credit_card" control={<Radio size="small" />} label={
                              <Stack direction="row" spacing={2} alignItems="center">
                                <CardIcon />
                                <Typography variant="body2" sx={{ fontWeight: 800 }}>Credit / Debit Card</Typography>
                              </Stack>
                            } />
                            <Box sx={{ mt: 3 }}>
                              <Grid container spacing={2}>
                                <Grid size={12}>
                                  <TextField fullWidth label="Card Number" required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" />
                                </Grid>
                                <Grid size={6}>
                                  <TextField fullWidth label="Expiry Date" required name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM/YY" />
                                </Grid>
                                <Grid size={6}>
                                  <TextField fullWidth label="CVV" required name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="123" />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>

                          <Box sx={{ p: 3, border: '1px solid', borderColor: 'outlineVariant', borderRadius: '12px', bgcolor: 'surface.containerLow' }}>
                            <FormControlLabel value="paypal" control={<Radio size="small" />} label={
                              <Typography variant="body2" sx={{ fontWeight: 800 }}>PayPal</Typography>
                            } />
                          </Box>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                </Box>

                <FormControlLabel
                  control={<Checkbox defaultChecked size="small" />}
                  label={<Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>Create an account and save my billing information for future purchases.</Typography>}
                />

              </Stack>
            </Grid>

            {/* Sidebar Summary */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Paper sx={{ p: 6, borderRadius: '24px', bgcolor: 'text.primary', color: 'background.paper', boxShadow: 'none', position: 'sticky', top: 120 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.01em' }}>Your Order</Typography>

                <Stack spacing={3} sx={{ mb: 6, maxH: '300px', overflowY: 'auto', pr: 1 }}>
                  {items.map(({ product, qty }) => (
                    <Box key={product.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar variant="rounded" src={product.image} sx={{ width: 40, height: 50, bgcolor: 'white', '& img': { objectFit: 'contain', p: 0.5 } }} />
                        <Box sx={{ maxWidth: 150 }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', noWrap: true, textOverflow: 'ellipsis', overflow: 'hidden' }}>{product.title}</Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7 }}>Qty: {qty}</Typography>
                        </Box>
                      </Stack>
                      <Typography variant="caption" sx={{ fontWeight: 900 }}>${(product.price * qty).toFixed(2)}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4 }} />

                <Stack spacing={2} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>Subtotal</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>${totalPrice.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>Shipping</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>Est. Tax (8%)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>${tax.toFixed(2)}</Typography>
                  </Box>
                  <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>Total</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.light' }}>${grandTotal.toFixed(2)}</Typography>
                  </Box>
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isProcessing}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    py: 2,
                    fontWeight: 900,
                    mb: 3,
                    '&:hover': { bgcolor: 'primary.light' }
                  }}
                >
                  {isProcessing ? 'PROCESSING...' : 'COMPLETE PURCHASE'}
                </Button>

                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <SecureIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                    <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 600 }}>Secure encrypted payment process</Typography>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ShippingIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                    <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 600 }}>Standard global delivery within 5-7 days</Typography>
                  </Stack>
                </Stack>

              </Paper>
            </Grid>

          </Grid>
        </form>
      </Container>
      <Footer />
    </Box>
  )
}
