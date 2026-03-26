import { Link, useLocation } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { NavigateNext as NextIcon, Home as HomeIcon } from '@mui/icons-material'

const labels = {
  shop: 'Shop',
  cart: 'Cart',
  wishlist: 'Wishlist',
  checkout: 'Checkout',
  login: 'Login',
  profile: 'Profile',
  product: 'Product',
}

export default function Breadcrumbs({ title }) {
  const { pathname } = useLocation()
  const parts = pathname.split('/').filter(Boolean)

  const crumbs = [
    { label: 'Home', path: '/' },
    ...parts.map((part, i) => ({
      label: labels[part] || title || decodeURIComponent(part),
      path: '/' + parts.slice(0, i + 1).join('/'),
    })),
  ]

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
      {crumbs.map((c, i) => (
        <Box key={c.path} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          {i > 0 && <NextIcon sx={{ fontSize: 14, color: 'text.disabled' }} />}
          {i === 0 && <HomeIcon sx={{ fontSize: 13, color: 'text.secondary', mr: 0.25 }} />}
          {i < crumbs.length - 1 ? (
            <Link to={c.path} style={{ textDecoration: 'none' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.72rem', '&:hover': { color: 'primary.main' } }}>
                {c.label}
              </Typography>
            </Link>
          ) : (
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.72rem' }}>
              {c.label}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  )
}
