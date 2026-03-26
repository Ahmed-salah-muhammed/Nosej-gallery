import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Rating,
  Stack,
  Divider,
  Skeleton,
  IconButton,
  Chip,
  Tab,
  Tabs,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  FavoriteBorder as WishlistIcon,
  Favorite as WishlistFilledIcon,
  ShoppingBagOutlined as CartIcon,
  ArrowBack as BackIcon,
  Star as StarIcon,
  LocalShipping as ShipIcon,
  Refresh as ReturnIcon,
  Shield as ShieldIcon,
} from "@mui/icons-material";
import useFetchProduct from "../hooks/useFetchProduct";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import QuantityControl from "../components/QuantityControl";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

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
  const [tab, setTab] = useState(0);
  const [imgError, setImgError] = useState(false);

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
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5" color="error" fontWeight={900}>
          Product not found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/shop")}>
          Back to Shop
        </Button>
      </Box>
    );

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ bgcolor: "surface.containerLow", py: 5 }}>
        <Container maxWidth="xl">
          <Breadcrumbs title={product?.title?.slice(0, 30)} />
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate("/shop")}
          sx={{
            mb: 5,
            fontWeight: 800,
            fontSize: "0.78rem",
            color: "text.secondary",
            "&:hover": { color: "primary.main" },
          }}
        >
          BACK TO COLLECTION
        </Button>

        <Grid container spacing={8}>
          {/* Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            {loading ? (
              <Skeleton
                variant="rectangular"
                sx={{ borderRadius: "24px", height: 560 }}
              />
            ) : (
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  bgcolor: "white",
                  border: "1px solid",
                  borderColor: "outlineVariant",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 520,
                  p: 6,
                }}
              >
                <Box
                  component="img"
                  src={
                    imgError
                      ? "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800"
                      : product?.thumbnail || product?.image
                  }
                  alt={product?.title}
                  onError={() => setImgError(true)}
                  loading="lazy"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: 440,
                    objectFit: "contain",
                    transition: "transform 0.4s ease",
                    "&:hover": { transform: "scale(1.04)" },
                  }}
                />
                {product?.id % 5 === 0 && (
                  <Chip
                    label="SALE"
                    color="error"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      fontWeight: 900,
                      borderRadius: "6px",
                    }}
                  />
                )}
                <IconButton
                  onClick={handleWishlist}
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: "white",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                    "&:hover": { bgcolor: "primary.main", color: "white" },
                  }}
                >
                  {isInWishlist(product?.id) ? (
                    <WishlistFilledIcon sx={{ color: "error.main" }} />
                  ) : (
                    <WishlistIcon />
                  )}
                </IconButton>
              </Box>
            )}
          </Grid>

          {/* Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            {loading ? (
              <Stack spacing={2}>
                <Skeleton height={32} width="60%" />
                <Skeleton height={48} />
                <Skeleton height={28} width="40%" />
                <Skeleton height={80} />
              </Stack>
            ) : (
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "primary.main",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                    }}
                  >
                    {product?.category}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      lineHeight: 1.25,
                      mt: 0.5,
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    {product?.title}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Rating
                    value={product?.rating?.rate ?? 4.5}
                    readOnly
                    precision={0.5}
                    sx={{ color: "#FBBF24" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontWeight: 700 }}
                  >
                    {product?.rating?.rate} ({product?.rating?.count} reviews)
                  </Typography>
                </Stack>

                <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 900, color: "primary.main" }}
                  >
                    ${product?.price?.toFixed(2)}
                  </Typography>
                  {product?.id % 5 === 0 && (
                    <Typography
                      variant="h6"
                      sx={{
                        color: "text.disabled",
                        textDecoration: "line-through",
                        fontWeight: 600,
                      }}
                    >
                      ${(product?.price * 1.4).toFixed(2)}
                    </Typography>
                  )}
                </Box>

                <Divider />

                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", lineHeight: 1.9 }}
                >
                  {product?.description}
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 800, minWidth: 70 }}
                  >
                    QTY
                  </Typography>
                  <QuantityControl value={qty} onChange={setQty} size="md" />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CartIcon />}
                    onClick={handleAdd}
                    sx={{ flex: 1, py: 2, fontWeight: 900, fontSize: "0.9rem" }}
                  >
                    ADD TO CART
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleWishlist}
                    startIcon={
                      isInWishlist(product?.id) ? (
                        <WishlistFilledIcon sx={{ color: "error.main" }} />
                      ) : (
                        <WishlistIcon />
                      )
                    }
                    sx={{ px: 3, py: 2, fontWeight: 800 }}
                  >
                    WISHLIST
                  </Button>
                </Stack>

                {/* Trust badges */}
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", pt: 1 }}>
                  {TRUST_ITEMS.map((t) => (
                    <Stack
                      key={t.label}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        p: 1.5,
                        borderRadius: "10px",
                        bgcolor: "surface.containerLow",
                        flex: "1 1 120px",
                      }}
                    >
                      <Box sx={{ color: "primary.main" }}>{t.icon}</Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 800,
                            display: "block",
                            lineHeight: 1.2,
                          }}
                        >
                          {t.label}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", fontSize: "0.68rem" }}
                        >
                          {t.sub}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Box>

                <Divider />

                <Stack direction="row" spacing={4}>
                  {[
                    { label: "SKU", val: `ATL-00${product?.id}` },
                    { label: "CATEGORY", val: product?.category },
                  ].map((x) => (
                    <Box key={x.label}>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          fontWeight: 800,
                          color: "text.primary",
                          mb: 0.25,
                        }}
                      >
                        {x.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {x.val}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                {/* Tabs */}
                <Box
                  sx={{ borderTop: 1, borderColor: "outlineVariant", pt: 4 }}
                >
                  <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    sx={{
                      mb: 3,
                      "& .MuiTab-root": {
                        fontWeight: 800,
                        fontSize: "0.78rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      },
                    }}
                  >
                    <Tab label="Description" />
                    <Tab label="Reviews" />
                    <Tab label="Shipping" />
                  </Tabs>
                  <Box sx={{ minHeight: 80 }}>
                    {tab === 0 && (
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.9 }}
                      >
                        High-quality craftsmanship meeting contemporary design.
                        This piece from our digital atelier is crafted using
                        sustainable practices and premium materials. Each item
                        is inspected for perfection before being archived and
                        shipped.
                      </Typography>
                    )}
                    {tab === 1 && (
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.9 }}
                      >
                        No reviews yet. Be the first to share your experience
                        with this piece — your feedback helps our community.
                      </Typography>
                    )}
                    {tab === 2 && (
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.9 }}
                      >
                        Complimentary global shipping on orders over $150.
                        Returns accepted within 30 days in original condition.
                        Express delivery available at checkout.
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}
