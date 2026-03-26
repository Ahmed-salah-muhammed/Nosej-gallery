import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Container, Typography, IconButton, Button, Stack,
  Divider, Paper, Avatar, Chip
} from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import {
  Close as CloseIcon, ShoppingBagOutlined as ShoppingIcon,
  ArrowBack as ArrowBackIcon, LocalShipping as ShippingIcon,
  Lock as LockIcon, Refresh as RefreshIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import QuantityControl from '../components/QuantityControl'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'

function CartItemRow({ product, qty }) {
  const { removeItem, updateQty } = useCart()
  const isSale = product.id % 5 === 0
  return (
    <Box sx={{
      display: 'flex', gap: { xs: 2, md: 3 }, py: 3,
      borderBottom: '1px solid', borderColor: 'outlineVariant',
      alignItems: { xs: 'flex-start', sm: 'center' },
      flexDirection: { xs: 'column', sm: 'row' }
    }}>
      <Avatar variant="rounded" src={product.image}
        sx={{ width: 88, height: 104, bgcolor: 'white', border: '1px solid', borderColor: 'outlineVariant', flexShrink: 0, '& img': { objectFit: 'contain', p: 1 } }} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mb: 0.75 }}>
          <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.title}
          </Typography>
          <IconButton size="small" onClick={() => removeItem(product.id)}
            sx={{ flexShrink: 0, color: 'text.disabled', '&:hover': { color: 'error.main', bgcolor: 'error.50' } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="caption" sx={{ textTransform: 'capitalize', color: 'text.secondary', fontWeight: 600, display: 'block', mb: 1.5 }}>
          {product.category}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <QuantityControl value={qty} onChange={(v) => updateQty(product.id, v)} size="sm" />
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', lineHeight: 1 }}>
              ${(product.price * qty).toFixed(2)}
            </Typography>
            {isSale && (
              <Typography variant="caption" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                ${(product.price * 1.4 * qty).toFixed(2)}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default function Cart() {
  const { items, clearCart, totalPrice, totalCount } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ bgcolor: 'surface.containerLow', py: 7 }}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 1.5, fontFamily: '"Playfair Display", serif' }}>Shopping Cart</Typography>
          <Breadcrumbs />
        </Container>
      </Box>
      <Box sx={{ minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <Stack spacing={4} alignItems="center">
          <ShoppingIcon sx={{ fontSize: 88, color: 'text.disabled', opacity: 0.4 }} />
          <Typography variant="h4" sx={{ fontWeight: 900 }}>Your Cart is Empty</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 360 }}>
            There are no pieces in your archive yet. Discover our curated collection.
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/shop')} sx={{ px: 5, py: 1.75 }}>
            GO TO SHOP
          </Button>
        </Stack>
      </Box>
      <Footer />
    </Box>
  )

  const shipping = totalPrice >= 150 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'surface.containerLow', py: 7 }}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 1.5, fontFamily: '"Playfair Display", serif' }}>Shopping Cart</Typography>
          <Breadcrumbs />
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid2 container spacing={5}>
          {/* Items List */}
          <Grid2 size={{ xs: 12, lg: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                {totalCount} {totalCount === 1 ? 'Item' : 'Items'}
              </Typography>
              <Button size="small" startIcon={<RefreshIcon />} onClick={clearCart}
                sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                CLEAR CART
              </Button>
            </Box>

            <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: '20px', bgcolor: 'background.paper', border: '1px solid', borderColor: 'outlineVariant' }}>
              {items.map(({ product, qty }) => (
                <CartItemRow key={product.id} product={product} qty={qty} />
              ))}
            </Paper>

            <Box sx={{ mt: 3 }}>
              <Button variant="outlined" onClick={() => navigate('/shop')} startIcon={<ArrowBackIcon />} sx={{ fontWeight: 800, px: 3 }}>
                CONTINUE SHOPPING
              </Button>
            </Box>
          </Grid2>

          {/* Sticky Order Summary */}
          <Grid2 size={{ xs: 12, lg: 4 }}>
            <Box sx={{ position: { lg: 'sticky' }, top: 120 }}>
              <Paper sx={{ p: 4, borderRadius: '20px', bgcolor: 'surface.containerLow', border: '1px solid', borderColor: 'outlineVariant' }}>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 4 }}>Order Summary</Typography>

                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: '12px', border: '1px dashed', borderColor: 'primary.main' }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', display: 'block', mb: 1 }}>
                      🚚 Add ${(150 - totalPrice).toFixed(2)} more for FREE shipping
                    </Typography>
                    <Box sx={{ height: 6, bgcolor: 'surface.containerHighest', borderRadius: 3, overflow: 'hidden' }}>
                      <Box sx={{ height: '100%', bgcolor: 'primary.main', borderRadius: 3, width: `${Math.min((totalPrice / 150) * 100, 100)}%`, transition: 'width 0.5s ease' }} />
                    </Box>
                  </Box>
                )}

                <Stack spacing={2.5} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Subtotal ({totalCount} items)</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>${totalPrice.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Estimated Tax</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>${tax.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Shipping</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: shipping === 0 ? 'success.main' : 'inherit' }}>
                      {shipping === 0 ? '✓ FREE' : `$${shipping.toFixed(2)}`}
                    </Typography>
                  </Box>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>Total</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main' }}>${grandTotal.toFixed(2)}</Typography>
                  </Box>
                </Stack>

                <Button variant="contained" size="large" fullWidth onClick={() => navigate('/checkout')}
                  sx={{ py: 2, fontWeight: 900, mb: 2, fontSize: '0.9rem' }}>
                  PROCEED TO CHECKOUT
                </Button>
                <Button variant="outlined" size="large" fullWidth onClick={() => navigate('/shop')}
                  sx={{ py: 1.75, fontWeight: 800 }}>
                  CONTINUE SHOPPING
                </Button>

                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mt: 3 }}>
                  <LockIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    Secured with SSL encryption
                  </Typography>
                </Stack>

                {/* Payment Icons */}
                <Stack direction="row" spacing={0.75} justifyContent="center" sx={{ mt: 2, flexWrap: 'wrap', gap: 0.75 }}>
                  {['VISA', 'MC', 'PayPal', 'Apple Pay'].map(p => (
                    <Chip key={p} label={p} size="small" variant="outlined" sx={{ fontWeight: 800, fontSize: '0.62rem', height: 22, borderRadius: '5px' }} />
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
      <Footer />
    </Box>
  )
}