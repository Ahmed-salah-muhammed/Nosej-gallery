import { useNavigate } from 'react-router-dom'
import {
  Box, Container, Typography, Button, Stack, IconButton,
  Chip, Tooltip, Divider
} from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import {
  FavoriteBorder as EmptyHeartIcon, ShoppingBagOutlined as CartIcon,
  Delete as DeleteIcon, ArrowForward as ArrowIcon
} from '@mui/icons-material'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

export default function Wishlist() {
  const { wishlist, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const toast = useToast()
  const navigate = useNavigate()

  const addAllToCart = () => {
    wishlist.forEach(p => addItem(p, 1))
    toast(`${wishlist.length} items added to cart`, 'success')
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'surface.containerLow', py: 7 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <Box>
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 1.5, fontFamily: '"Playfair Display", serif' }}>
                My Wishlist
              </Typography>
              <Breadcrumbs />
            </Box>
            {wishlist.length > 0 && (
              <Stack direction="row" spacing={1.5}>
                <Button variant="outlined" size="small" startIcon={<DeleteIcon />} onClick={clearWishlist}
                  sx={{ fontWeight: 800, fontSize: '0.75rem', color: 'error.main', borderColor: 'error.main', '&:hover': { bgcolor: 'error.50', borderColor: 'error.main' } }}>
                  CLEAR ALL
                </Button>
                <Button variant="contained" size="small" startIcon={<CartIcon />} onClick={addAllToCart}
                  sx={{ fontWeight: 800, fontSize: '0.75rem' }}>
                  ADD ALL TO CART
                </Button>
              </Stack>
            )}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        {wishlist.length === 0 ? (
          <Box sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Stack spacing={4} alignItems="center">
              <EmptyHeartIcon sx={{ fontSize: 88, color: 'text.disabled', opacity: 0.35 }} />
              <Typography variant="h4" sx={{ fontWeight: 900 }}>Your wishlist is empty</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 380 }}>
                Save your favourite pieces here to find them later with ease.
              </Typography>
              <Button variant="contained" size="large" endIcon={<ArrowIcon />} onClick={() => navigate('/shop')} sx={{ px: 5, py: 1.75 }}>
                EXPLORE COLLECTION
              </Button>
            </Stack>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                <strong>{wishlist.length}</strong> {wishlist.length === 1 ? 'piece' : 'pieces'} saved
              </Typography>
            </Box>
            <Grid2 container spacing={3}>
              {wishlist.map((p, i) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
                  <Box sx={{ position: 'relative' }}>
                    <ProductCard product={p} index={i} />
                    <Tooltip title="Remove from Wishlist">
                      <IconButton size="small" onClick={() => { removeItem(p.id); toast('Removed from wishlist', 'info') }}
                        sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'white', zIndex: 3, '&:hover': { bgcolor: 'error.main', color: 'white' }, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          </>
        )}
      </Container>
      <Footer />
    </Box>
  )
}
