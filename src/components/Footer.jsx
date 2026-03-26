import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box, Container, Typography, Grid2, Stack, Divider, IconButton,
  TextField, Button, InputAdornment
} from '@mui/material'
import {
  Google as GoogleIcon, GitHub as GitHubIcon, Twitter as TwitterIcon,
  Facebook as FacebookIcon, Instagram as InstagramIcon,
  Email as EmailIcon, Phone as PhoneIcon, CheckCircle as CheckIcon
} from '@mui/icons-material'

const SHOP_LINKS = ['New Arrivals', 'Best Sellers', "Men's Clothing", "Women's Clothing", 'Accessories', 'Sale']
const COMPANY_LINKS = ['Our Story', 'Sustainability', 'Press', 'Careers', 'Investors']
const SUPPORT_LINKS = ['Help Center', 'Track Order', 'Returns & Exchanges', 'Size Guide', 'Contact Us']

const SOCIALS = [
  { icon: <GoogleIcon fontSize="small" />, href: 'mailto:ahmedsalah219013@gmail.com', label: 'Google' },
  { icon: <GitHubIcon fontSize="small" />, href: 'https://github.com/Ahmed-salah-muhammed/', label: 'GitHub' },
  { icon: <TwitterIcon fontSize="small" />, href: '#', label: 'X (Twitter)' },
  { icon: <FacebookIcon fontSize="small" />, href: '#', label: 'Facebook' },
  { icon: <InstagramIcon fontSize="small" />, href: '#', label: 'Instagram' },
]

const PAYMENT_METHODS = [
  { name: 'VISA', color: '#1A1F71' },
  { name: 'MC', color: '#EB001B' },
  { name: 'PayPal', color: '#003087' },
  { name: 'Apple Pay', color: '#000000' },
  { name: 'Stripe', color: '#635BFF' },
]

function PaymentBadge({ name, color }) {
  return (
    <Box sx={{ px: 1.5, py: 0.75, border: '1px solid', borderColor: 'outlineVariant', borderRadius: '6px', bgcolor: 'background.paper', minWidth: 52, textAlign: 'center' }}>
      <Typography variant="caption" sx={{ fontWeight: 900, color, fontSize: '0.65rem', letterSpacing: '0.04em' }}>{name}</Typography>
    </Box>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subDone, setSubDone] = useState(false)
  const [err, setErr] = useState('')

  const validate = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  const handleSub = () => {
    if (!validate(email)) { setErr('Enter a valid email'); return }
    setErr(''); setSubDone(true)
  }

  return (
    <Box component="footer" sx={{ bgcolor: 'surface.containerLow', pt: 10, pb: 4, borderTop: '1px solid', borderColor: 'outlineVariant' }}>
      <Container maxWidth="xl">
        <Grid2 container spacing={6} sx={{ mb: 8 }}>
          {/* Brand Column */}
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 1, fontFamily: '"Playfair Display", serif', letterSpacing: '0.1em' }}>ATELIER</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
              The Digital Atelier — a destination for those who value craftsmanship, minimalism, and the art of the modern wardrobe.
            </Typography>

            {/* Contact */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <EmailIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="body2" component="a" href="mailto:ahmedsalah219013@gmail.com"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  ahmedsalah219013@gmail.com
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="body2" component="a" href="tel:+201225246488"
                  sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                  +20 122 524 6488
                </Typography>
              </Stack>
            </Stack>

            {/* Socials */}
            <Stack direction="row" spacing={0.75}>
              {SOCIALS.map(s => (
                <IconButton key={s.label} component="a" href={s.href} target="_blank" size="small"
                  sx={{ border: '1px solid', borderColor: 'outlineVariant', borderRadius: '8px', '&:hover': { bgcolor: 'primary.main', borderColor: 'primary.main', color: 'white' }, transition: 'all 0.2s' }}>
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid2>

          {/* Links */}
          {[{ title: 'SHOP', links: SHOP_LINKS }, { title: 'COMPANY', links: COMPANY_LINKS }, { title: 'SUPPORT', links: SUPPORT_LINKS }].map(col => (
            <Grid2 key={col.title} size={{ xs: 6, sm: 4, md: 2 }}>
              <Typography variant="overline" sx={{ fontWeight: 800, color: 'text.primary', mb: 2.5, display: 'block', fontSize: '0.72rem' }}>{col.title}</Typography>
              <Stack spacing={1.25}>
                {col.links.map(l => (
                  <Link key={l} to="#" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, transition: 'color 0.2s', cursor: 'pointer' }}>{l}</Typography>
                  </Link>
                ))}
              </Stack>
            </Grid2>
          ))}

          {/* Newsletter */}
          <Grid2 size={{ xs: 12, md: 2 }} sx={{ minWidth: { md: 240 } }}>
            <Typography variant="overline" sx={{ fontWeight: 800, mb: 2.5, display: 'block', fontSize: '0.72rem' }}>NEWSLETTER</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.7 }}>Subscribe for exclusive deals & new drops.</Typography>
            {subDone ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <CheckIcon sx={{ color: 'success.main', fontSize: 18 }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.main' }}>Subscribed!</Typography>
              </Stack>
            ) : (
              <Stack spacing={1}>
                <TextField size="small" placeholder="Your email" value={email} onChange={e => { setEmail(e.target.value); setErr('') }} error={!!err} helperText={err}
                  InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ fontSize: 16 }} /></InputAdornment> }} />
                <Button variant="contained" size="small" onClick={handleSub} sx={{ fontWeight: 800, py: 1 }}>SUBSCRIBE</Button>
              </Stack>
            )}
          </Grid2>
        </Grid2>

        {/* Payment Methods */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 2, fontSize: '0.68rem', letterSpacing: '0.15em' }}>SECURE PAYMENT METHODS</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            {PAYMENT_METHODS.map(p => <PaymentBadge key={p.name} {...p} />)}
          </Stack>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            © 2025 <strong>Ahmed Salah</strong> — ATELIER Digital Boutique. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <Typography key={l} variant="caption" component={Link} to="#" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>{l}</Typography>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
