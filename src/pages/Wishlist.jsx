import { useNavigate } from 'react-router-dom'
import {
  Tooltip
} from '@mui/material'
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
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-5xl font-black mb-4 font-serif text-gray-900">My Wishlist</h1>
              <Breadcrumbs />
            </div>
            {wishlist.length > 0 && (
              <div className="flex gap-4">
                <button 
                  onClick={clearWishlist}
                  className="px-6 py-3 border-2 border-red-100 text-red-600 font-black text-[10px] tracking-widest rounded-xl hover:bg-red-50 transition-all uppercase"
                >
                  CLEAR ALL
                </button>
                <button 
                  onClick={addAllToCart}
                  className="px-6 py-3 bg-[#131b2e] text-white font-black text-[10px] tracking-widest rounded-xl hover:bg-black transition-all uppercase flex items-center gap-2"
                >
                  <CartIcon sx={{ fontSize: 16 }} /> ADD ALL TO CART
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {wishlist.length === 0 ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
            <EmptyHeartIcon className="text-gray-100 text-9xl mb-8" />
            <h2 className="text-3xl font-black text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-sm mb-10">
              Save your favourite pieces here to find them later with ease.
            </p>
            <button 
              onClick={() => navigate('/shop')}
              className="px-12 py-4 bg-[#131b2e] text-white font-black text-sm tracking-widest rounded-xl hover:bg-black transition-all flex items-center gap-2"
            >
              EXPLORE COLLECTION <ArrowIcon fontSize="small" />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <p className="text-sm text-gray-500 font-bold">
                <strong className="text-gray-900">{wishlist.length}</strong> {wishlist.length === 1 ? 'piece' : 'pieces'} saved
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlist.map((p, i) => (
                <div key={p.id} className="relative group">
                  <ProductCard product={p} index={i} />
                  <Tooltip title="Remove from Wishlist">
                    <button 
                      onClick={() => { removeItem(p.id); toast('Removed from wishlist', 'info') }}
                      className="absolute top-4 right-4 p-2 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl shadow-lg z-20 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
