import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Rating,
  Button,
  Skeleton,
  IconButton,
} from "@mui/material";
import {
  FavoriteBorder as WishlistIcon,
  Favorite as WishlistFilledIcon,
  ShoppingBagOutlined as CartIcon,
  ArrowBack as BackIcon,
  LocalShipping as ShipIcon,
  Refresh as ReturnIcon,
  Shield as ShieldIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";
import useFetchProduct from "../hooks/useFetchProduct";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import QuantityControl from "../components/QuantityControl";
import Breadcrumbs from "../components/Breadcrumbs";

const NOSEJ_LOCATION = [30.0444, 31.2357]; // Central Cairo

const TRUST_ITEMS = [
  {
    icon: <ShipIcon sx={{ fontSize: 18 }} />,
    label: "Free Shipping",
    sub: "On orders over $150",
  },
  {
    icon: <ReturnIcon sx={{ fontSize: 18 }} />,
    label: "Free Returns",
    sub: "30-day return policy",
  },
  {
    icon: <ShieldIcon sx={{ fontSize: 18 }} />,
    label: "Secure Payment",
    sub: "SSL encrypted checkout",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useFetchProduct(id);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [imgError, setImgError] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0]);
    } else if (product?.thumbnail) {
      setMainImage(product.thumbnail);
    }
  }, [product]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        
        // Simple distance calculation (Haversine formula simplified)
        const R = 6371; // km
        const dLat = (latitude - NOSEJ_LOCATION[0]) * Math.PI / 180;
        const dLon = (longitude - NOSEJ_LOCATION[1]) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(NOSEJ_LOCATION[0] * Math.PI / 180) * Math.cos(latitude * Math.PI / 180) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        if (distance < 50) {
          setDeliveryInfo({ text: "Get it by Tomorrow", sub: "Fast delivery in Cairo", color: "text-green-600" });
        } else {
          setDeliveryInfo({ text: "Delivery in 2-3 Days", sub: "Standard shipping to your location", color: "text-blue-600" });
        }
      }, () => {
        // Default if geolocation fails
        setDeliveryInfo({ text: "Standard Delivery", sub: "Ships in 2-5 business days", color: "text-gray-500" });
      });
    }
  }, []);

  const handleAdd = () => {
    addItem(product, qty);
    toast(`"${product.title.slice(0, 22)}…" added to cart`, "success");
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast(
      isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
      "info",
    );
  };

  if (error)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl text-red-600 font-black">Product not found</h2>
        <Button variant="contained" onClick={() => navigate("/shop")}>
          Back to Shop
        </Button>
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs title={product?.title?.slice(0, 30)} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 mb-10 font-extrabold text-xs text-gray-500 hover:text-[#131b2e] transition-colors uppercase tracking-widest"
        >
          <BackIcon fontSize="small" />
          BACK TO COLLECTION
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {loading ? (
              <Skeleton
                variant="rectangular"
                className="rounded-3xl h-[560px] w-full"
              />
            ) : (
              <>
                <div className="relative rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center min-h-[520px] p-12">
                  <img
                    src={imgError ? "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800" : mainImage}
                    alt={product?.title}
                    onError={() => setImgError(true)}
                    className="max-w-full max-h-[440px] object-contain transition-transform duration-500 hover:scale-105"
                  />
                  {product?.discountPercentage > 10 && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-md uppercase">
                      SALE
                    </span>
                  )}
                  <IconButton
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 bg-white shadow-lg hover:bg-[#131b2e] hover:text-white"
                    sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#131b2e', color: 'white' } }}
                  >
                    {isInWishlist(product?.id) ? (
                      <WishlistFilledIcon className="text-red-500" />
                    ) : (
                      <WishlistIcon />
                    )}
                  </IconButton>
                </div>
                
                {/* Thumbnails */}
                {product?.images?.length > 1 && (
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMainImage(img)}
                        className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                          mainImage === img ? "border-[#131b2e]" : "border-transparent bg-gray-50"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-8">
            {loading ? (
              <div className="flex flex-col gap-4">
                <Skeleton height={32} width="40%" />
                <Skeleton height={60} width="90%" />
                <Skeleton height={30} width="30%" />
                <Skeleton height={120} />
              </div>
            ) : (
              <>
                <div>
                  <span className="text-[#131b2e] font-black text-[10px] tracking-[0.2em] uppercase">
                    {product?.category}
                  </span>
                  <h1 className="text-5xl font-black leading-tight mt-2 font-serif text-gray-900">
                    {product?.title}
                  </h1>
                </div>

                <div className="flex items-center gap-4">
                  <Rating
                    value={product?.rating ?? 4.5}
                    readOnly
                    precision={0.1}
                    sx={{ color: "#FBBF24" }}
                  />
                  <span className="text-gray-500 font-bold text-sm">
                    {product?.rating} ({product?.stock} in stock)
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-black text-[#131b2e]">
                      ${product?.price?.toFixed(2)}
                    </span>
                    {product?.discountPercentage > 10 && (
                      <span className="text-xl text-gray-400 line-through font-bold">
                        ${(product?.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {/* Delivery Estimation Label */}
                  {deliveryInfo && (
                    <div className="flex items-center gap-2 mt-1">
                      <TimeIcon className={deliveryInfo.color} sx={{ fontSize: 16 }} />
                      <div>
                        <span className={`text-xs font-black uppercase tracking-wider ${deliveryInfo.color}`}>
                          {deliveryInfo.text}
                        </span>
                        <p className="text-[10px] font-bold text-gray-400">{deliveryInfo.sub}</p>
                      </div>
                    </div>
                  )}
                </div>

                <hr className="border-gray-100" />

                <p className="text-gray-500 leading-relaxed text-lg">
                  {product?.description}
                </p>

                <div className="flex items-center gap-6">
                  <span className="font-black text-xs tracking-widest text-gray-900">QTY</span>
                  <QuantityControl value={qty} onChange={setQty} size="md" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CartIcon />}
                    onClick={handleAdd}
                    className="flex-1 py-4 bg-[#131b2e] hover:bg-black font-black text-sm tracking-widest rounded-xl"
                    sx={{ bgcolor: '#131b2e', '&:hover': { bgcolor: 'black' } }}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleWishlist}
                    startIcon={
                      isInWishlist(product?.id) ? (
                        <WishlistFilledIcon className="text-red-500" />
                      ) : (
                        <WishlistIcon />
                      )
                    }
                    className="px-8 py-4 border-2 border-gray-200 hover:border-[#131b2e] font-black text-sm tracking-widest rounded-xl"
                    sx={{ borderColor: '#e5e7eb', color: '#131b2e', '&:hover': { borderColor: '#131b2e' } }}
                  >
                    WISHLIST
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="flex gap-6 flex-wrap pt-4">
                  {TRUST_ITEMS.map((t) => (
                    <div key={t.label} className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
                      <div className="text-[#131b2e]">{t.icon}</div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-900">{t.label}</h4>
                        <p className="text-[9px] font-bold text-gray-500">{t.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
