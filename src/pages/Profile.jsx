import { useState } from 'react'
import {
  Box, Container, Typography, Stack, Paper, Avatar,
  Button, Chip, Divider, LinearProgress, Tab, Tabs
} from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import {
  CheckCircle as CheckIcon, LocalShipping as ShipIcon,
  Inventory as BoxIcon, EmojiEvents as DeliveredIcon,
  ReceiptLong as ReceiptIcon, Map as MapIcon,
  PersonOutline as PersonIcon, FavoriteBorder as WishIcon
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'

/* ── Order Tracker ── */
const ORDER_STEPS = [
  { label: 'Order Placed', icon: <ReceiptIcon />, desc: 'Mar 20, 2025 · 09:14 AM' },
  { label: 'Processing', icon: <BoxIcon />, desc: 'Mar 20, 2025 · 02:30 PM' },
  { label: 'Shipped', icon: <ShipIcon />, desc: 'Mar 21, 2025 · 11:00 AM' },
  { label: 'Delivered', icon: <DeliveredIcon />, desc: 'Expected Mar 25, 2025' },
]

function OrderTracker({ activeStep = 2 }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Order #ATL-20250320</Typography>
      <Box sx={{ position: 'relative', mb: 2 }}>
        {/* Progress line */}
        <Box sx={{ position: 'absolute', top: 22, left: '12.5%', right: '12.5%', height: 3, bgcolor: 'surface.containerHighest', borderRadius: 2, zIndex: 0 }} />
        <Box sx={{
          position: 'absolute', top: 22, left: '12.5%', height: 3, bgcolor: 'primary.main',
          borderRadius: 2, zIndex: 1,
          width: `${(activeStep / (ORDER_STEPS.length - 1)) * 75}%`,
          transition: 'width 1s ease'
        }} />
        <Grid2 container sx={{ position: 'relative', zIndex: 2 }}>
          {ORDER_STEPS.map((step, i) => {
            const done = i <= activeStep
            const active = i === activeStep
            return (
              <Grid2 key={step.label} size={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: '50%',
                  bgcolor: done ? 'primary.main' : 'surface.containerHighest',
                  color: done ? 'white' : 'text.disabled',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: active ? '0 0 0 4px rgba(42,20,180,0.2)' : 'none',
                  transition: 'all 0.4s'
                }}>
                  {done ? <CheckIcon sx={{ fontSize: 20 }} /> : step.icon}
                </Box>
                <Typography variant="caption" sx={{ fontWeight: active ? 900 : 700, color: done ? 'primary.main' : 'text.secondary', textAlign: 'center', lineHeight: 1.3 }}>
                  {step.label}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center', lineHeight: 1.3, fontSize: '0.68rem', display: { xs: 'none', sm: 'block' } }}>
                  {step.desc}
                </Typography>
              </Grid2>
            )
          })}
        </Grid2>
      </Box>
      <Chip label="In Transit — On Time" color="primary" size="small" sx={{ mt: 2, fontWeight: 700 }} />
    </Box>
  )
}

/* ── GIS Map Placeholder ── */
function GISTrackingMap() {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <MapIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 900 }}>Live Order Map</Typography>
        <Chip label="GIS Feature" size="small" color="primary" variant="outlined" sx={{ fontWeight: 700, fontSize: '0.68rem' }} />
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>
        Real-time delivery route simulation — from warehouse to your doorstep. Powered by GIS technology.
      </Typography>

      {/* SVG Map Mockup */}
      <Box sx={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid', borderColor: 'primary.main', position: 'relative' }}>
        <Box component="svg" viewBox="0 0 600 300" sx={{ width: '100%', display: 'block', bgcolor: '#e8f0fe' }}>
          {/* Grid lines */}
          {[...Array(6)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#c5cae9" strokeWidth="0.5" />
          ))}
          {[...Array(12)].map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke="#c5cae9" strokeWidth="0.5" />
          ))}
          {/* Roads */}
          <path d="M50 200 Q200 150 300 180 Q420 200 550 140" fill="none" stroke="#bdbdbd" strokeWidth="8" strokeLinecap="round" />
          <path d="M50 200 Q200 150 300 180 Q420 200 550 140" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <path d="M150 50 L150 250" fill="none" stroke="#bdbdbd" strokeWidth="6" />
          <path d="M150 50 L150 250" fill="none" stroke="white" strokeWidth="3" />
          <path d="M350 30 L350 270" fill="none" stroke="#bdbdbd" strokeWidth="6" />
          <path d="M350 30 L350 270" fill="none" stroke="white" strokeWidth="3" />
          {/* Delivery route */}
          <path d="M80 190 Q160 160 220 172 Q290 185 350 178 Q430 168 530 148" fill="none" stroke="#2a14b4" strokeWidth="3" strokeDasharray="8 4" strokeLinecap="round" />
          {/* Warehouse */}
          <rect x="55" y="175" width="50" height="35" rx="4" fill="#2a14b4" opacity="0.9" />
          <text x="80" y="197" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">WH</text>
          <text x="80" y="223" fill="#2a14b4" fontSize="8" textAnchor="middle" fontWeight="bold">Warehouse</text>
          {/* Moving truck */}
          <rect x="320" y="167" width="38" height="20" rx="3" fill="#4338ca" />
          <circle cx="328" cy="190" r="5" fill="#131b2e" />
          <circle cx="350" cy="190" r="5" fill="#131b2e" />
          <text x="339" y="181" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">🚚</text>
          {/* Destination pin */}
          <ellipse cx="525" cy="145" rx="18" ry="8" fill="rgba(200,68,42,0.2)" />
          <path d="M525 105 C515 105 508 112 508 121 C508 134 525 148 525 148 C525 148 542 134 542 121 C542 112 535 105 525 105Z" fill="#c8442a" />
          <circle cx="525" cy="121" r="6" fill="white" />
          <text x="525" y="158" fill="#c8442a" fontSize="8" textAnchor="middle" fontWeight="bold">YOU</text>
          {/* Distance label */}
          <rect x="220" y="135" width="110" height="24" rx="6" fill="white" stroke="#2a14b4" strokeWidth="1" />
          <text x="275" y="151" fill="#2a14b4" fontSize="9" textAnchor="middle" fontWeight="bold">Est. 2.4 km · 18 min</text>
        </Box>
        <Box sx={{ p: 2, bgcolor: 'surface.containerLow', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: 'primary.main' }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>Warehouse</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#c8442a' }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>Your Location</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 12, height: 4, bgcolor: '#4338ca', borderRadius: 1 }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>Route</Typography>
            </Box>
          </Stack>
          <Chip label="● LIVE" size="small" sx={{ bgcolor: '#4ade8020', color: '#16a34a', fontWeight: 800, fontSize: '0.68rem', height: 22 }} />
        </Box>
      </Box>
      <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1.5, display: 'block', fontStyle: 'italic' }}>
        🌍 Built by Ahmed Salah — GIS Analyst & Full-Stack Developer
      </Typography>
    </Box>
  )
}

/* ── Mock Orders ── */
const MOCK_ORDERS = [
  { id: 'ATL-20250320', date: 'Mar 20, 2025', total: 142.50, items: 3, status: 'Shipped', statusColor: 'primary' },
  { id: 'ATL-20250210', date: 'Feb 10, 2025', total: 89.99, items: 1, status: 'Delivered', statusColor: 'success' },
  { id: 'ATL-20250115', date: 'Jan 15, 2025', total: 210.00, items: 4, status: 'Delivered', statusColor: 'success' },
]

export default function Profile() {
  const { user, logout } = useAuth()
  const { totalCount } = useCart()
  const { wishlist } = useWishlist()
  const [tab, setTab] = useState(0)

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ bgcolor: 'surface.containerLow', py: 7 }}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 1.5, fontFamily: '"Playfair Display", serif' }}>My Profile</Typography>
          <Breadcrumbs />
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid2 container spacing={4}>
          {/* Sidebar */}
          <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
            <Paper sx={{ p: 4, borderRadius: '20px', bgcolor: 'surface.containerLow', border: '1px solid', borderColor: 'outlineVariant', textAlign: 'center', mb: 3 }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '2rem', fontWeight: 900 }}>
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 0.5 }}>{user?.name}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>{user?.email}</Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid2 container spacing={2}>
                {[{ label: 'Cart Items', value: totalCount, icon: <BoxIcon sx={{ fontSize: 18 }} /> },
                  { label: 'Wishlist', value: wishlist.length, icon: <WishIcon sx={{ fontSize: 18 }} /> },
                  { label: 'Orders', value: MOCK_ORDERS.length, icon: <ReceiptIcon sx={{ fontSize: 18 }} /> }].map(s => (
                  <Grid2 key={s.label} size={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main' }}>{s.value}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mt: 0.25, lineHeight: 1.3 }}>{s.label}</Typography>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
              <Button variant="outlined" fullWidth onClick={logout} sx={{ mt: 3, fontWeight: 800, color: 'error.main', borderColor: 'error.main', '&:hover': { bgcolor: 'rgba(211,47,47,0.05)' } }}>
                SIGN OUT
              </Button>
            </Paper>
          </Grid2>

          {/* Main Content */}
          <Grid2 size={{ xs: 12, md: 8, lg: 9 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 4, '& .MuiTab-root': { fontWeight: 800, textTransform: 'uppercase', fontSize: '0.78rem', letterSpacing: '0.06em' } }}>
              <Tab label="Order History" />
              <Tab label="Track Order" />
              <Tab label="Live Map" />
            </Tabs>

            {tab === 0 && (
              <Stack spacing={2}>
                {MOCK_ORDERS.map(order => (
                  <Paper key={order.id} sx={{ p: 3, borderRadius: '16px', bgcolor: 'surface.containerLow', border: '1px solid', borderColor: 'outlineVariant', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 900, mb: 0.5 }}>{order.id}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{order.date} · {order.items} items</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>${order.total}</Typography>
                      <Chip label={order.status} color={order.statusColor} size="small" sx={{ fontWeight: 800, fontSize: '0.72rem' }} />
                      <Button size="small" variant="outlined" onClick={() => setTab(1)} sx={{ fontWeight: 800, fontSize: '0.72rem' }}>TRACK</Button>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            )}

            {tab === 1 && (
              <Paper sx={{ p: 4, borderRadius: '20px', bgcolor: 'surface.containerLow', border: '1px solid', borderColor: 'outlineVariant' }}>
                <OrderTracker activeStep={2} />
              </Paper>
            )}

            {tab === 2 && (
              <Paper sx={{ p: 4, borderRadius: '20px', bgcolor: 'surface.containerLow', border: '1px solid', borderColor: 'outlineVariant' }}>
                <GISTrackingMap />
              </Paper>
            )}
          </Grid2>
        </Grid2>
      </Container>
      <Footer />
    </Box>
  )
}
