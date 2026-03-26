import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Badge,
  Tooltip, Divider,
  Avatar, Drawer, List, ListItem, ListItemText
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
    <div className="bg-[#131b2e] text-white py-2 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {[text, text].map((t, i) => (
          <span key={i} className="px-8 text-[10px] font-black tracking-widest uppercase">
            {t}
          </span>
        ))}
      </div>
    </div>
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
    <div className="relative flex-1 max-w-lg">
      <div className="flex items-center px-4 py-2 bg-white rounded-xl border-2 border-[#131b2e] shadow-lg">
        <SearchIcon className="text-[#131b2e] mr-3" sx={{ fontSize: 20 }} />
        <input
          autoFocus
          placeholder="Search for products..."
          className="flex-1 bg-transparent outline-none text-sm font-bold text-gray-900"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <CloseIcon sx={{ fontSize: 18 }} />
        </button>
      </div>
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[1500]">
          {results.map(p => (
            <div 
              key={p.id} 
              onClick={() => { navigate(`/product/${p.id}`); onClose(); setQuery('') }}
              className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-50 last:border-none transition-colors"
            >
              <div className="w-12 h-14 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-1">
                <img src={p.thumbnail} alt="" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-gray-900 truncate">{p.title}</h4>
                <span className="text-xs font-black text-[#131b2e]">${p.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Wishlist', path: '/wishlist' },
    { label: 'Profile', path: '/profile' },
  ]

  return (
    <>
      <AnnouncementBar />
      <nav className={`sticky top-0 z-[1100] transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-2' : 'bg-white py-4'} border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {searchOpen ? (
              <LiveSearch onClose={() => setSearchOpen(false)} />
            ) : (
              <>
                {/* Logo */}
                <NavLink to="/" className="text-2xl font-black tracking-widest font-serif text-gray-900">
                  ATELIER
                </NavLink>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-10">
                  {navLinks.map(link => (
                    <NavLink 
                      key={link.path} 
                      to={link.path} 
                      className={({ isActive }) => `text-[11px] font-black uppercase tracking-widest transition-all pb-1 border-b-2 ${isActive ? 'border-[#131b2e] text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-900'}`}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                  <Tooltip title="Search">
                    <button onClick={() => setSearchOpen(true)} className="p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                      <SearchIcon sx={{ fontSize: 22 }} />
                    </button>
                  </Tooltip>
                  
                  <Tooltip title="Wishlist">
                    <NavLink to="/wishlist" className="p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                      <Badge badgeContent={wishlist.length} color="primary" sx={{ '& .MuiBadge-badge': { bgcolor: '#131b2e' } }}>
                        <FavoriteIcon sx={{ fontSize: 22 }} />
                      </Badge>
                    </NavLink>
                  </Tooltip>

                  <Tooltip title="Cart">
                    <NavLink to="/cart" className="p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                      <Badge badgeContent={totalCount} color="primary" sx={{ '& .MuiBadge-badge': { bgcolor: '#131b2e' } }}>
                        <CartIcon sx={{ fontSize: 22 }} />
                      </Badge>
                    </NavLink>
                  </Tooltip>

                  <div className="hidden lg:block">
                    <span className="text-xs font-black text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>

                  <Divider orientation="vertical" flexItem className="mx-2 h-6 self-center hidden sm:block" />

                  <Tooltip title="Toggle Theme">
                    <button onClick={toggle} className="p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                      {dark ? <LightModeIcon sx={{ fontSize: 22 }} /> : <DarkModeIcon sx={{ fontSize: 22 }} />}
                    </button>
                  </Tooltip>

                  {user ? (
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-gray-900 hidden sm:block">{user.name}</span>
                      <button 
                        onClick={() => { logout(); navigate('/') }} 
                        className="text-[10px] font-black text-[#131b2e] hover:underline tracking-widest"
                      >
                        LOGOUT
                      </button>
                    </div>
                  ) : (
                    <Tooltip title="Login">
                      <NavLink to="/login" className="p-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                        <UserIcon sx={{ fontSize: 22 }} />
                      </NavLink>
                    </Tooltip>
                  )}

                  <button className="md:hidden p-2 text-gray-900" onClick={() => setMobileOpen(true)}>
                    <MenuIcon />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="w-72 p-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black font-serif tracking-widest">ATELIER</h2>
            <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
              <CloseIcon />
            </button>
          </div>
          <List className="flex flex-col gap-2">
            {[...navLinks, { label: 'Cart', path: '/cart' }, { label: 'Login', path: '/login' }].map(l => (
              <ListItem 
                key={l.path} 
                component={NavLink} 
                to={l.path} 
                onClick={() => setMobileOpen(false)}
                className="rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ListItemText 
                  primary={l.label} 
                  primaryTypographyProps={{ className: "font-black uppercase text-xs tracking-[0.2em] text-gray-900" }} 
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  )
}
