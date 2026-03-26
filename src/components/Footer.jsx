import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IconButton,
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
    <div className="px-4 py-2 border border-gray-200 rounded-lg bg-white min-w-[52px] text-center">
      <span className="text-[10px] font-black tracking-wider" style={{ color }}>{name}</span>
    </div>
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
    <footer className="bg-gray-50 pt-20 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <h2 className="text-2xl font-black mb-4 font-serif tracking-widest">ATELIER</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              The Digital Atelier — a destination for those who value craftsmanship, minimalism, and the art of the modern wardrobe.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-3">
                <EmailIcon sx={{ fontSize: 16 }} className="text-[#131b2e]" />
                <a href="mailto:ahmedsalah219013@gmail.com" className="text-gray-500 text-sm hover:text-[#131b2e] transition-colors">
                  ahmedsalah219013@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon sx={{ fontSize: 16 }} className="text-[#131b2e]" />
                <a href="tel:+201225246488" className="text-gray-500 text-sm hover:text-[#131b2e] transition-colors">
                  +20 122 524 6488
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {SOCIALS.map(s => (
                <IconButton 
                  key={s.label} 
                  component="a" 
                  href={s.href} 
                  target="_blank" 
                  size="small"
                  className="border border-gray-200 rounded-xl hover:bg-[#131b2e] hover:text-white transition-all"
                  sx={{ border: '1px solid #e5e7eb', borderRadius: '12px', '&:hover': { bgcolor: '#131b2e', color: 'white' } }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[{ title: 'SHOP', links: SHOP_LINKS }, { title: 'COMPANY', links: COMPANY_LINKS }, { title: 'SUPPORT', links: SUPPORT_LINKS }].map(col => (
              <div key={col.title}>
                <span className="text-[11px] font-black text-gray-900 mb-6 block tracking-widest uppercase">{col.title}</span>
                <ul className="flex flex-col gap-3">
                  {col.links.map(l => (
                    <li key={l}>
                      <Link to="#" className="text-gray-500 text-sm hover:text-[#131b2e] transition-colors">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter - Right Aligned */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end text-left md:text-right">
            <span className="text-[11px] font-black text-gray-900 mb-6 block tracking-widest uppercase">NEWSLETTER</span>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-[240px]">
              Subscribe for exclusive deals & new drops.
            </p>
            {subDone ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckIcon sx={{ fontSize: 18 }} />
                <span className="font-bold text-xs">Subscribed!</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3 w-full max-w-[240px]">
                <TextField 
                  size="small" 
                  placeholder="Your email" 
                  value={email} 
                  onChange={e => { setEmail(e.target.value); setErr('') }} 
                  error={!!err} 
                  helperText={err}
                  InputProps={{ 
                    startAdornment: <InputAdornment position="start"><EmailIcon sx={{ fontSize: 16 }} /></InputAdornment> 
                  }} 
                />
                <Button 
                  variant="contained" 
                  size="small" 
                  onClick={handleSub} 
                  className="bg-[#131b2e] hover:bg-black font-black py-2.5 rounded-lg"
                  sx={{ bgcolor: '#131b2e', '&:hover': { bgcolor: 'black' } }}
                >
                  SUBSCRIBE
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-12">
          <span className="text-[10px] font-black text-gray-400 block mb-4 tracking-[0.2em] uppercase">SECURE PAYMENT METHODS</span>
          <div className="flex flex-wrap gap-3">
            {PAYMENT_METHODS.map(p => <PaymentBadge key={p.name} {...p} />)}
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-gray-500">
            © 2025 <strong className="text-gray-900">Ahmed Salah</strong> — ATELIER Digital Boutique. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <Link key={l} to="#" className="text-[11px] text-gray-500 hover:text-[#131b2e] transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
