import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  AppBar, Toolbar, Typography, Box, IconButton, Badge,
  Container, Tooltip, Divider, Button, InputBase, Paper,
  Avatar, useScrollTrigger, Drawer, List, ListItem, ListItemText
} from '@mui/material'
import {
  Search as SearchIcon, FavoriteBorder as FavoriteIcon,
  ShoppingBagOutlined as CartIcon, LightMode as LightModeIcon,
  DarkMode as DarkModeIcon, PersonOutline as UserIcon,
  Close as CloseIcon, Menu as MenuIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { fetchProducts } from '../services/api'

function AnnouncementBar() {
  const items = [
    '🚚 FREE SHIPPING ON ALL ORDERS OVER $99',
    '✨ NEW SPRING / SUMMER 2025 COLLECTION JUST DROPPED',
    '💳 BUY NOW PAY LATER — 0% INTEREST FOR 6 MONTHS',
    '🎁 USE CODE ATELIER15 FOR 15% OFF YOUR FIRST ORDER',
    '🌍 WORLDWIDE DELIVERY IN 3–7 BUSINESS DAYS',
  ]
  const text = items.join('     ·     ')
  return (
    <Box sx={{ bgcolor: '#131b2e', color: 'white', py: 0.75, overflow: 'hidden', position: 'relative' }}>
      <div className="marquee-track" style={{ gap: '0px' }}>
        {[text, text].map((t, i) => (
          <Typography key={i} variant="caption" sx={{ whiteSpace: 'nowrap', px: 4, fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.72rem' }}>
            {t}
          </Typography>
        ))}
      </div>
    </Box>
  )
}

function LiveSearch({ onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts().then(setAllProducts).catch(() => {})
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) { setResults([]); return }
    const q = query.toLowerCase()
    setResults(allProducts.filter(p => p.title.toLowerCase().includes(q)).slice(0, 3))
  }, [query, allProducts])

  return (
    <Box sx={{ position: 'relative', flex: 1, maxWidth: 480 }}>
      <Paper sx={{
        display: 'flex', alignItems: 'center', px: 2, py: 0.5, borderRadius: '12px',
        border: '2px solid', borderColor: 'primary.main', bgcolor: 'background.default',
        boxShadow: '0 4px 20px rgba(42,20,180,0.15)'
      }}>
        <SearchIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
        <InputBase
          autoFocus
          placeholder="Search for products..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          sx={{ flex: 1, fontSize: '0.9375rem', fontWeight: 500 }}
        />
        <IconButton size="small" onClick={onClose}><CloseIcon fontSize="small" /></IconButton>
      </Paper>
      {results.length > 0 && (
        <Paper sx={{
          position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 1400,
          borderRadius: '12px', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(19,27,46,0.12)', border: '1px solid', borderColor: 'outlineVariant'
        }}>
          {results.map(p => (
            <Box key={p.id} onClick={() => { navigate(`/product/${p.id}`); onClose(); setQuery('') }}
              sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 1.5, cursor: 'pointer',
                '&:hover': { bgcolor: 'surface.containerLow' }, borderBottom: '1px solid', borderColor: 'outlineVariant', '&:last-child': { borderBottom: 'none' } }}>
              <Avatar variant="rounded" src={p.image} sx={{ width: 44, height: 52, bgcolor: 'white', '& img': { objectFit: 'contain', p: 0.5 } }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</Typography>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800 }}>${p.price.toFixed(2)}</Typography>
              </Box>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  )
}

export default function Navbar() {
  const { totalCount, totalPrice } = useCart()
  const { wishlist } = useWishlist()
  const { dark, toggle } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 })

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'Profile', path: '/profile' },
  ]

  return (
    <>
      <AnnouncementBar />
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1100, transition: 'all 0.3s', ...(trigger ? { boxShadow: '0 4px 24px rgba(19,27,46,0.10)' } : {}) }}>
        <AppBar position="static" sx={{
          bgcolor: dark ? 'rgba(15,22,41,0.92)' : 'rgba(250,248,255,0.92)',
          backdropFilter: 'blur(24px)', color: 'text.primary', boxShadow: 'none',
          borderBottom: '1px solid', borderColor: 'outlineVariant', transition: 'background-color 0.3s'
        }}>
          <Container maxWidth="xl">
            {searchOpen ? (
              <Toolbar disableGutters sx={{ height: 72, gap: 2 }}>
                <LiveSearch onClose={() => setSearchOpen(false)} />
              </Toolbar>
            ) : (
              <Toolbar disableGutters sx={{ height: 72, justifyContent: 'space-between' }}>
                {/* Logo */}
                <Typography variant="h6" component={NavLink} to="/" sx={{
                  fontWeight: 900, letterSpacing: '0.12em', color: 'inherit',
                  textDecoration: 'none', fontSize: '1.4rem', fontFamily: '"Playfair Display", serif'
                }}>
                  ATELIER
                </Typography>

                {/* Nav Links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                  {navLinks.map(link => (
                    <NavLink key={link.path} to={link.path} style={({ isActive }) => ({
                      textDecoration: 'none', color: 'inherit', fontSize: '0.8rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      borderBottom: isActive ? '2px solid #2a14b4' : '2px solid transparent',
                      paddingBottom: '4px', transition: 'all 0.2s'
                    })}>
                      {link.label}
                    </NavLink>
                  ))}
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 } }}>
                  <Tooltip title="Search">
                    <IconButton onClick={() => setSearchOpen(true)} color="inherit" size="small" sx={{ '& svg': { fontSize: '1.35rem' } }}>
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Wishlist">
                    <IconButton color="inherit" size="small" component={NavLink} to="/wishlist" sx={{ '& svg': { fontSize: '1.35rem' } }}>
                      <Badge badgeContent={wishlist.length} color="primary"><FavoriteIcon /></Badge>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Cart">
                    <IconButton color="inherit" size="small" component={NavLink} to="/cart" sx={{ '& svg': { fontSize: '1.35rem' } }}>
                      <Badge badgeContent={totalCount} color="primary"><CartIcon /></Badge>
                    </IconButton>
                  </Tooltip>
                  <Box sx={{ display: { xs: 'none', lg: 'block' }, ml: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 900, fontSize: '0.8rem' }}>${totalPrice.toFixed(2)}</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 22, alignSelf: 'center' }} />
                  <Tooltip title="Toggle Theme">
                    <IconButton onClick={toggle} color="inherit" size="small" sx={{ '& svg': { fontSize: '1.35rem' } }}>
                      {dark ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                  </Tooltip>
                  {user ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>{user.name}</Typography>
                      <Button onClick={() => { logout(); navigate('/') }} sx={{ fontSize: '0.75rem', fontWeight: 800, color: 'primary.main', minWidth: 'auto', px: 1.5 }}>
                        LOGOUT
                      </Button>
                    </Box>
                  ) : (
                    <Tooltip title="Login">
                      <IconButton component={NavLink} to="/login" color="inherit" size="small" sx={{ '& svg': { fontSize: '1.35rem' } }}>
                        <UserIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <IconButton sx={{ display: { xs: 'flex', md: 'none' } }} onClick={() => setMobileOpen(true)} color="inherit" size="small">
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            )}
          </Container>
        </AppBar>
      </Box>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 260, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: '"Playfair Display", serif' }}>ATELIER</Typography>
            <IconButton onClick={() => setMobileOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <List>
            {[...navLinks, { label: 'Cart', path: '/cart' }, { label: 'Login', path: '/login' }].map(l => (
              <ListItem key={l.path} component={NavLink} to={l.path} onClick={() => setMobileOpen(false)}
                sx={{ borderRadius: '8px', mb: 0.5, textDecoration: 'none', color: 'inherit', '&:hover': { bgcolor: 'surface.containerLow' } }}>
                <ListItemText primary={l.label} primaryTypographyProps={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.08em' }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
