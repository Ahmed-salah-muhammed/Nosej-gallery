import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  Avatar
} from '@mui/material'
import {
  ChevronRight as ChevronIcon,
  LocalShippingOutlined as ShippingIcon,
  VerifiedUserOutlined as SecureIcon,
  CreditCardOutlined as CardIcon
} from '@mui/icons-material'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const toast = useToast()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '', email: '', address: '', city: '', zip: '',
    cardNumber: '', expiry: '', cvv: ''
  })

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order placement
    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      toast('Order placed successfully! Thank you for choosing Atelier.', 'success')
      navigate('/')
    }, 2000)
  }

  const shipping = totalPrice >= 150 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  return (
    <div className="bg-white pb-24">
      {/* Header with Breadcrumbs */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-black mb-4 font-serif text-gray-900">Checkout</h1>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-[10px] font-black text-gray-400 hover:text-[#131b2e] transition-colors uppercase tracking-widest">HOME</Link>
            <ChevronIcon className="text-gray-300" sx={{ fontSize: 14 }} />
            <Link to="/cart" className="text-[10px] font-black text-gray-400 hover:text-[#131b2e] transition-colors uppercase tracking-widest">CART</Link>
            <ChevronIcon className="text-gray-300" sx={{ fontSize: 14 }} />
            <span className="text-[10px] font-black text-[#131b2e] uppercase tracking-widest">CHECKOUT</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <div className="flex flex-col gap-16">
                {/* Billing Details */}
                <div>
                  <h2 className="text-3xl font-black mb-8 text-gray-900">Billing Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                      fullWidth label="Full Name" required name="fullName"
                      value={formData.fullName} onChange={handleInputChange}
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                    <TextField
                      fullWidth label="Email Address" required type="email" name="email"
                      value={formData.email} onChange={handleInputChange}
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                    <div className="md:col-span-2">
                      <TextField
                        fullWidth label="Street Address" required name="address"
                        value={formData.address} onChange={handleInputChange}
                        variant="outlined"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                      />
                    </div>
                    <TextField
                      fullWidth label="Town / City" required name="city"
                      value={formData.city} onChange={handleInputChange}
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                    <TextField
                      fullWidth label="Postcode / ZIP" required name="zip"
                      value={formData.zip} onChange={handleInputChange}
                      variant="outlined"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                  </div>
                </div>

                {/* Payment Details */}
                <div>
                  <h2 className="text-3xl font-black mb-8 text-gray-900">Payment Information</h2>
                  <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100">
                    <FormControl component="fieldset" className="w-full">
                      <RadioGroup defaultValue="credit_card">
                        <div className="flex flex-col gap-6">
                          <div className="p-6 bg-white border-2 border-[#131b2e] rounded-2xl shadow-sm">
                            <FormControlLabel value="credit_card" control={<Radio size="small" sx={{ color: '#131b2e', '&.Mui-checked': { color: '#131b2e' } }} />} label={
                              <div className="flex items-center gap-3">
                                <CardIcon className="text-[#131b2e]" />
                                <span className="text-sm font-black text-gray-900">Credit / Debit Card</span>
                              </div>
                            } />
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="md:col-span-2">
                                <TextField fullWidth label="Card Number" required name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" variant="outlined" size="small" />
                              </div>
                              <TextField fullWidth label="Expiry Date" required name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM/YY" variant="outlined" size="small" />
                              <TextField fullWidth label="CVV" required name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="123" variant="outlined" size="small" />
                            </div>
                          </div>

                          <div className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                            <FormControlLabel value="paypal" control={<Radio size="small" sx={{ color: '#131b2e', '&.Mui-checked': { color: '#131b2e' } }} />} label={
                              <span className="text-sm font-black text-gray-900">PayPal</span>
                            } />
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>

                <FormControlLabel
                  control={<Checkbox defaultChecked size="small" sx={{ color: '#131b2e', '&.Mui-checked': { color: '#131b2e' } }} />}
                  label={<span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Create an account and save my billing information for future purchases.</span>}
                />
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-4">
              <div className="bg-[#131b2e] text-white p-10 rounded-[40px] shadow-2xl sticky top-32">
                <h2 className="text-2xl font-black mb-8">Your Order</h2>

                <div className="flex flex-col gap-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-14 bg-white rounded-lg p-1 flex items-center justify-center flex-shrink-0">
                          <img src={product.thumbnail} alt="" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[10px] font-black uppercase tracking-wider truncate w-32">{product.title}</h4>
                          <p className="text-[10px] font-bold opacity-50">Qty: {qty}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black">${(product.price * qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-white/10 mb-8" />

                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between text-xs">
                    <span className="opacity-60 font-bold">Subtotal</span>
                    <span className="font-black">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="opacity-60 font-bold">Shipping</span>
                    <span className="font-black">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="opacity-60 font-bold">Est. Tax (8%)</span>
                    <span className="font-black">${tax.toFixed(2)}</span>
                  </div>
                  <hr className="border-white/20 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black">Total</span>
                    <span className="text-3xl font-black text-white">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-white text-[#131b2e] font-black text-sm tracking-widest rounded-xl hover:bg-gray-100 transition-all mb-8 disabled:opacity-50"
                >
                  {isProcessing ? 'PROCESSING...' : 'COMPLETE PURCHASE'}
                </button>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 opacity-50">
                    <SecureIcon sx={{ fontSize: 18 }} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Secure encrypted payment</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <ShippingIcon sx={{ fontSize: 18 }} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Global delivery 5-7 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
