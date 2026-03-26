import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card, CardContent, Typography, Box, IconButton, Button, Rating, Chip, Fade, Stack
} from '@mui/material'
import {
  FavoriteBorder as FavoriteIcon, Favorite as FavoriteFilledIcon,
  ShoppingBagOutlined as CartIcon, Search as SearchIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'

const FALLBACK = 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const toast = useToast()
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(product, 1)
    toast(`"${product.title.slice(0, 22)}…" added to cart`, 'success')
  }
  const handleWishlist = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
    toast(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist', 'info')
  }

  const isNew = product.id % 3 === 0
  const isSale = product.id % 5 === 0

  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="card-entry"
      style={{ animationDelay: `${index * 60}ms` }}
      sx={{
        cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%',
        bgcolor: 'surface.containerLow', borderRadius: '16px', overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': { bgcolor: 'surface.containerHighest', transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(19,27,46,0.10)' }
      }}
    >
      <Box sx={{ position: 'relative', pt: '120%', overflow: 'hidden', bgcolor: 'white', borderRadius: '16px 16px 0 0' }}>
        {/* Badges */}
        <Box sx={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 0.5, zIndex: 2 }}>
          {isNew && <Chip label="NEW" size="small" sx={{ bgcolor: '#131b2e', color: 'white', fontWeight: 900, borderRadius: '5px', height: 20, fontSize: '0.6rem' }} />}
          {isSale && <Chip label="SALE" size="small" color="error" sx={{ fontWeight: 900, borderRadius: '5px', height: 20, fontSize: '0.6rem' }} />}
        </Box>
        {/* Hover Actions */}
        <Fade in={hover}>
          <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'column', gap: 0.75, zIndex: 2 }}>
            <IconButton size="small" onClick={handleWishlist}
              sx={{ bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}>
              {isInWishlist(product.id) ? <FavoriteFilledIcon fontSize="small" sx={{ color: 'error.main' }} /> : <FavoriteIcon fontSize="small" />}
            </IconButton>
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`) }}
              sx={{ bgcolor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', '&:hover': { bgcolor: 'primary.main', color: 'white' } }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Box>
        </Fade>
        {/* Image */}
        <Box component="img" src={imgError ? FALLBACK : product.image} alt={product.title}
          onError={() => setImgError(true)} loading="lazy"
          sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', p: 3, transition: 'transform 0.5s ease', transform: hover ? 'scale(1.06)' : 'scale(1)' }} />
        {/* Add to Cart Slide-up */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', transition: 'transform 0.3s ease', transform: hover ? 'translateY(0)' : 'translateY(100%)', zIndex: 2 }}>
          <Button fullWidth variant="contained" onClick={handleAdd} startIcon={<CartIcon />}
            sx={{ borderRadius: 0, bgcolor: '#131b2e', py: 1.5, '&:hover': { bgcolor: 'primary.main' }, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em' }}>
            ADD TO CART
          </Button>
        </Box>
      </Box>
      <CardContent sx={{ flex: 1, pt: 2, pb: '14px !important', px: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', mb: 0.75, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', '&:hover': { color: 'primary.main' } }}>
          {product.title}
        </Typography>
        <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1.25 }}>
          <Rating value={product.rating?.rate ?? 4} readOnly size="small" precision={0.5} sx={{ color: '#FBBF24', fontSize: '0.9rem' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.75rem' }}>({product.rating?.count ?? 0})</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 900, color: 'text.primary', fontSize: '1.1rem' }}>${product.price.toFixed(2)}</Typography>
          {isSale && <Typography variant="caption" sx={{ color: 'text.secondary', textDecoration: 'line-through', fontWeight: 600 }}>${(product.price * 1.4).toFixed(2)}</Typography>}
        </Stack>
      </CardContent>
    </Card>
  )
}
