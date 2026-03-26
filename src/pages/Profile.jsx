import { useState, useEffect } from 'react'
import {
  Avatar,
  Button, Tab, Tabs
} from '@mui/material'
import {
  CheckCircle as CheckIcon, LocalShipping as ShipIcon,
  Inventory as BoxIcon, EmojiEvents as DeliveredIcon,
  ReceiptLong as ReceiptIcon, Map as MapIcon,
  FavoriteBorder as WishIcon
} from '@mui/icons-material'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'

// Fix Leaflet icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

const NOSEJ_LOCATION = [30.0444, 31.2357] // Central Cairo

function MapUpdater({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.setView(center, 13)
  }, [center, map])
  return null
}

/* ── Order Tracker ── */
const ORDER_STEPS = [
  { label: 'Order Placed', icon: <ReceiptIcon />, desc: 'Mar 20, 2025 · 09:14 AM' },
  { label: 'Processing', icon: <BoxIcon />, desc: 'Mar 20, 2025 · 02:30 PM' },
  { label: 'Shipped', icon: <ShipIcon />, desc: 'Mar 21, 2025 · 11:00 AM' },
  { label: 'Delivered', icon: <DeliveredIcon />, desc: 'Expected Mar 25, 2025' },
]

function OrderTracker({ activeStep = 2 }) {
  return (
    <div>
      <h3 className="text-xl font-black mb-8 text-gray-900">Order #ATL-20250320</h3>
      <div className="relative mb-12">
        {/* Progress line */}
        <div className="absolute top-[22px] left-[12.5%] right-[12.5%] h-1 bg-gray-100 rounded-full z-0" />
        <div 
          className="absolute top-[22px] left-[12.5%] h-1 bg-[#131b2e] rounded-full z-10 transition-all duration-1000" 
          style={{ width: `${(activeStep / (ORDER_STEPS.length - 1)) * 75}%` }}
        />
        <div className="grid grid-cols-4 relative z-20">
          {ORDER_STEPS.map((step, i) => {
            const done = i <= activeStep
            const active = i === activeStep
            return (
              <div key={step.label} className="flex flex-col items-center gap-4">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${done ? 'bg-[#131b2e] text-white' : 'bg-gray-100 text-gray-300'} ${active ? 'ring-4 ring-[#131b2e]/20' : ''}`}>
                  {done ? <CheckIcon sx={{ fontSize: 20 }} /> : step.icon}
                </div>
                <div className="text-center">
                  <p className={`text-[10px] font-black uppercase tracking-wider mb-1 ${done ? 'text-[#131b2e]' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  <p className="text-[9px] font-bold text-gray-400 hidden sm:block">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <span className="inline-block px-3 py-1 bg-[#131b2e] text-white text-[10px] font-black rounded-md uppercase tracking-widest">
        In Transit — On Time
      </span>
    </div>
  )
}

/* ── GIS Map Placeholder ── */
function GISTrackingMap() {
  const [userLocation, setUserLocation] = useState(null)
  const [distance, setDistance] = useState(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setUserLocation([latitude, longitude])
        
        // Simple distance calculation (Haversine formula simplified)
        const R = 6371 // km
        const dLat = (latitude - NOSEJ_LOCATION[0]) * Math.PI / 180
        const dLon = (longitude - NOSEJ_LOCATION[1]) * Math.PI / 180
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(NOSEJ_LOCATION[0] * Math.PI / 180) * Math.cos(latitude * Math.PI / 180) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        setDistance(R * c)
      })
    }
  }, [])

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <MapIcon className="text-[#131b2e]" />
        <h3 className="text-xl font-black text-gray-900">Live Order Map</h3>
        <span className="px-2 py-0.5 border border-[#131b2e] text-[#131b2e] text-[9px] font-black rounded uppercase tracking-widest">GIS Feature</span>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed mb-8">
        Real-time delivery route simulation — from our Cairo Atelier to your doorstep. Powered by Leaflet GIS.
      </p>

      <div className="rounded-3xl overflow-hidden border-2 border-[#131b2e] relative shadow-xl h-[400px] z-0">
        <MapContainer center={NOSEJ_LOCATION} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={NOSEJ_LOCATION}>
            <Popup>
              <div className="font-black text-xs">NOSEJ GALLERY</div>
              <div className="text-[10px] text-gray-500">Central Cairo Atelier</div>
            </Popup>
          </Marker>
          
          {userLocation && (
            <>
              <Marker position={userLocation}>
                <Popup>
                  <div className="font-black text-xs">YOUR LOCATION</div>
                </Popup>
              </Marker>
              <Polyline positions={[NOSEJ_LOCATION, userLocation]} color="#131b2e" dashArray="10, 10" />
              <MapUpdater center={userLocation} />
            </>
          )}
        </MapContainer>
        
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-2xl flex justify-between items-center border border-gray-100 z-[1000]">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-[#131b2e]" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Atelier</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">You</span>
            </div>
          </div>
          {distance && (
            <span className="text-[10px] font-black text-[#131b2e] bg-blue-50 px-3 py-1 rounded-md">
              EST. {distance.toFixed(1)} KM · {Math.round(distance * 15)} MIN
            </span>
          )}
        </div>
      </div>
      <p className="text-[10px] font-bold text-gray-400 mt-6 italic">
        🌍 Built by Ahmed Salah — GIS Analyst & Full-Stack Developer
      </p>
    </div>
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
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-black mb-4 font-serif text-gray-900">My Profile</h1>
          <Breadcrumbs />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-gray-50 rounded-[32px] border border-gray-100 p-10 text-center shadow-sm">
              <Avatar 
                className="w-24 h-24 mx-auto mb-6 bg-[#131b2e] text-2xl font-black"
                sx={{ width: 96, height: 96, bgcolor: '#131b2e' }}
              >
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </Avatar>
              <h2 className="text-xl font-black text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-sm text-gray-500 mb-8">{user?.email}</p>
              
              <hr className="border-gray-200 mb-8" />
              
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { label: 'Cart', value: totalCount },
                  { label: 'Wishlist', value: wishlist.length },
                  { label: 'Orders', value: MOCK_ORDERS.length }
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <span className="block text-xl font-black text-[#131b2e]">{s.value}</span>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{s.label}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={logout}
                className="w-full py-3 border-2 border-red-100 text-red-600 font-black text-[10px] tracking-widest rounded-xl hover:bg-red-50 transition-all uppercase"
              >
                SIGN OUT
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <div className="mb-10 border-b border-gray-100">
              <Tabs 
                value={tab} 
                onChange={(_, v) => setTab(v)} 
                sx={{ 
                  '& .MuiTab-root': { 
                    fontWeight: 900, 
                    textTransform: 'uppercase', 
                    fontSize: '11px', 
                    letterSpacing: '0.15em',
                    color: '#9ca3af',
                    '&.Mui-selected': { color: '#131b2e' }
                  },
                  '& .MuiTabs-indicator': { bgcolor: '#131b2e' }
                }}
              >
                <Tab label="Order History" />
                <Tab label="Track Order" />
                <Tab label="Live Map" />
              </Tabs>
            </div>

            {tab === 0 && (
              <div className="flex flex-col gap-4">
                {MOCK_ORDERS.map(order => (
                  <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:shadow-md transition-shadow">
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">{order.id}</h4>
                      <p className="text-xs text-gray-500 font-bold">{order.date} · {order.items} items</p>
                    </div>
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xl font-black text-gray-900">${order.total.toFixed(2)}</span>
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                        {order.status}
                      </span>
                      <button 
                        onClick={() => setTab(1)}
                        className="text-[10px] font-black text-[#131b2e] hover:underline tracking-widest uppercase"
                      >
                        TRACK
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 1 && (
              <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
                <OrderTracker activeStep={2} />
              </div>
            )}

            {tab === 2 && (
              <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
                <GISTrackingMap />
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}
