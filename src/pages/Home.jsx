import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Divider,
  Card,
  CardContent,
  Avatar,
  Rating,
  TextField,
  InputAdornment,
} from "@mui/material";
import { IconButton } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {
  ArrowForward as ArrowIcon,
  ArrowBackIos as PrevIcon,
  ArrowForwardIos as NextIcon,
  Email as EmailIcon,
  CheckCircle as CheckIcon,
  FormatQuote as QuoteIcon,
} from "@mui/icons-material";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

/* ── Hero Carousel ── */
const SLIDES = [
  {
    id: 1,
    bg: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070",
    label: "SPRING / SUMMER 2025",
    title: "The New\nCollection",
    sub: "Timeless essentials reimagined for the modern wardrobe.",
    cta: "SHOP COLLECTION",
    ctaPath: "/shop",
    accent: "#2a14b4",
  },
  {
    id: 2,
    bg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070",
    label: "EXCLUSIVE DROPS",
    title: "The Digital\nAtelier",
    sub: "Where innovation meets timeless craftsmanship.",
    cta: "DISCOVER MORE",
    ctaPath: "/shop",
    accent: "#c8442a",
  },
  {
    id: 3,
    bg: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=1200",
    label: "LIMITED EDITION",
    title: "Curated\nFor You",
    sub: "Premium pieces selected by our style editors.",
    cta: "EXPLORE NOW",
    ctaPath: "/shop",
    accent: "#0d6e5b",
  },
];

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const next = () => setCurrent((c) => (c + 1) % SLIDES.length);
  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  const s = SLIDES[current];

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "75vh", md: "92vh" },
        overflow: "hidden",
      }}
    >
      {/* Background */}
      {SLIDES.map((sl, i) => (
        <Box
          key={sl.id}
          sx={{
            position: "absolute",
            inset: 0,
            transition: "opacity 0.9s ease",
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <Box
            component="img"
            src={sl.bg}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
            }}
          />
        </Box>
      ))}

      {/* Content */}
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: 560 }}>
          <Typography
            variant="overline"
            sx={{
              color: s.accent,
              fontWeight: 800,
              letterSpacing: "0.2em",
              mb: 2,
              display: "block",
              fontSize: "0.8rem",
              transition: "all 0.6s",
            }}
          >
            {s.label}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "white",
              fontWeight: 900,
              fontSize: { xs: "2.8rem", md: "5rem" },
              lineHeight: 1.05,
              mb: 3,
              whiteSpace: "pre-line",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            {s.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.85)",
              mb: 5,
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            {s.sub}
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(s.ctaPath)}
              endIcon={<ArrowIcon />}
              sx={{
                px: 4,
                py: 1.75,
                bgcolor: "white",
                color: "#131b2e",
                fontWeight: 900,
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}
            >
              {s.cta}
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.75,
                borderColor: "rgba(255,255,255,0.6)",
                color: "white",
                fontWeight: 800,
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              VIEW LOOKBOOK
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Prev / Next */}
      <IconButton
        onClick={prev}
        sx={{
          position: "absolute",
          left: { xs: 8, md: 24 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 4,
          bgcolor: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          color: "white",
          "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
        }}
      >
        <PrevIcon />
      </IconButton>
      <IconButton
        onClick={next}
        sx={{
          position: "absolute",
          right: { xs: 8, md: 24 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 4,
          bgcolor: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(8px)",
          color: "white",
          "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
        }}
      >
        <NextIcon />
      </IconButton>

      {/* Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          display: "flex",
          gap: 1.25,
        }}
      >
        {SLIDES.map((_, i) => (
          <Box
            key={i}
            onClick={() => setCurrent(i)}
            sx={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: "4px",
              cursor: "pointer",
              bgcolor: i === current ? "white" : "rgba(255,255,255,0.45)",
              transition: "all 0.35s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

/* ── Brand Story ── */
function BrandStory() {
  return (
    <Box sx={{ py: 14, bgcolor: "background.paper", overflow: "hidden" }}>
      <Container maxWidth="xl">
        <Grid2 container spacing={8} alignItems="center">
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src="https://cdn.dummyjson.com/products/images/mens-shirts/1/thumbnail.png"
                loading="lazy"
                sx={{
                  width: "100%",
                  height: 520,
                  objectFit: "cover",
                  borderRadius: "24px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -24,
                  right: -24,
                  bgcolor: "primary.main",
                  color: "white",
                  p: 4,
                  borderRadius: "20px",
                  maxWidth: 200,
                  boxShadow: "0 8px 32px rgba(42,20,180,0.3)",
                  display: { xs: "none", md: "block" },
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 0.5 }}>
                  12+
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    opacity: 0.9,
                    letterSpacing: "0.05em",
                  }}
                >
                  YEARS OF CRAFTSMANSHIP
                </Typography>
              </Box>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 800,
                letterSpacing: "0.2em",
                mb: 2,
                display: "block",
              }}
            >
              OUR STORY
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mb: 3,
                lineHeight: 1.2,
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Crafted with Passion, <br />
              Worn with Pride
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 3, lineHeight: 1.9 }}
            >
              ATELIER was born from a simple belief: that quality and style
              should never be mutually exclusive. Founded in 2013, we set out to
              bridge the gap between luxury craftsmanship and everyday
              accessibility.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 5, lineHeight: 1.9 }}
            >
              Every piece in our collection is thoughtfully designed, ethically
              sourced, and built to last — because we believe fashion should
              make you feel good inside and out.
            </Typography>
            <Stack spacing={2} sx={{ mb: 5 }}>
              {[
                "Ethically sourced materials from certified suppliers",
                "Carbon-neutral shipping on all orders worldwide",
                "Lifetime quality guarantee on every purchase",
              ].map((item) => (
                <Stack
                  key={item}
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <CheckIcon sx={{ color: "primary.main", fontSize: 20 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowIcon />}
              onClick={() => {}}
              sx={{ px: 4, py: 1.75 }}
            >
              LEARN MORE ABOUT US
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

/* ── Testimonials ── */
const REVIEWS = [
  {
    name: "Sarah M.",
    role: "Fashion Blogger",
    rating: 5,
    text: "Absolutely love the quality! The fabrics are luxurious and the fit is perfect. ATELIER has become my go-to for everything.",
    avatar: "https://i.pravatar.cc/80?img=1",
  },
  {
    name: "James K.",
    role: "Creative Director",
    rating: 5,
    text: "The attention to detail is incredible. Every stitch is perfect. These pieces elevate any wardrobe instantly.",
    avatar: "https://i.pravatar.cc/80?img=3",
  },
  {
    name: "Amira H.",
    role: "Style Consultant",
    rating: 5,
    text: "Fast shipping, beautiful packaging, and the clothes exceeded my expectations. Will definitely be ordering again!",
    avatar: "https://i.pravatar.cc/80?img=5",
  },
  {
    name: "Carlos R.",
    role: "Photographer",
    rating: 4,
    text: "Great variety of styles. The dark mode on the website is a nice touch too — very premium shopping experience.",
    avatar: "https://i.pravatar.cc/80?img=7",
  },
  {
    name: "Priya S.",
    role: "UX Designer",
    rating: 5,
    text: "Ordered three times already. The quality-to-price ratio is unbeatable. Highly recommend the new collection!",
    avatar: "https://i.pravatar.cc/80?img=9",
  },
  {
    name: "Daniel W.",
    role: "Entrepreneur",
    rating: 5,
    text: "Exceptional service from start to finish. The packaging alone felt like a luxury unboxing experience.",
    avatar: "https://i.pravatar.cc/80?img=11",
  },
];

function Testimonials() {
  return (
    <Box sx={{ py: 14, bgcolor: "surface.containerLow" }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 800,
              letterSpacing: "0.2em",
            }}
          >
            CUSTOMER REVIEWS
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mt: 1,
              fontFamily: '"Playfair Display", serif',
            }}
          >
            What Our Clients Say
          </Typography>
        </Box>
        <Grid2 container spacing={3}>
          {REVIEWS.map((r, i) => (
            <Grid2 key={i} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                sx={{
                  p: 3.5,
                  height: "100%",
                  borderRadius: "20px",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "outlineVariant",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(19,27,46,0.08)",
                  },
                }}
              >
                <QuoteIcon
                  sx={{
                    color: "primary.main",
                    fontSize: 32,
                    mb: 2,
                    opacity: 0.5,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    mb: 3,
                    lineHeight: 1.8,
                    fontStyle: "italic",
                  }}
                >
                  "{r.text}"
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={r.avatar} sx={{ width: 44, height: 44 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {r.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {r.role}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: "auto" }}>
                    <Rating
                      value={r.rating}
                      readOnly
                      size="small"
                      sx={{ color: "#FBBF24" }}
                    />
                  </Box>
                </Stack>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}

/* ── Partner Brands ── */
const BRANDS = [
  "ZARA",
  "H&M",
  "NIKE",
  "ADIDAS",
  "GUCCI",
  "PRADA",
  "VERSACE",
  "DIOR",
  "CHANEL",
  "HERMES",
  "BALENCIAGA",
  "OFF-WHITE",
];

function PartnerBrands() {
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: "background.default",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "outlineVariant",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          sx={{
            textAlign: "center",
            display: "block",
            color: "text.secondary",
            fontWeight: 700,
            letterSpacing: "0.2em",
          }}
        >
          PARTNER BRANDS
        </Typography>
      </Container>
      <Box sx={{ overflow: "hidden" }}>
        <div className="marquee-track" style={{ gap: "0px" }}>
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <Box
              key={i}
              sx={{
                px: { xs: 4, md: 6 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 140,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  letterSpacing: "0.12em",
                  color: "text.disabled",
                  fontSize: { xs: "0.85rem", md: "1rem" },
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {b}
              </Typography>
            </Box>
          ))}
        </div>
      </Box>
    </Box>
  );
}

/* ── Newsletter ── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validate = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = () => {
    if (!validate(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <Box
      sx={{
        py: 12,
        background: "linear-gradient(135deg, #2a14b4 0%, #4338ca 100%)",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography
          variant="overline"
          sx={{
            color: "rgba(255,255,255,0.7)",
            fontWeight: 800,
            letterSpacing: "0.2em",
          }}
        >
          STAY IN THE LOOP
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: 900,
            mt: 1,
            mb: 2,
            fontFamily: '"Playfair Display", serif',
          }}
        >
          Subscribe to Our Newsletter
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "rgba(255,255,255,0.8)", mb: 5 }}
        >
          Get exclusive offers, early access to new collections, and style
          inspiration delivered to your inbox.
        </Typography>
        {submitted ? (
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            justifyContent="center"
          >
            <CheckIcon sx={{ color: "#4ade80", fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
              You're subscribed! Welcome to the circle. ✨
            </Typography>
          </Stack>
        ) : (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            maxWidth={500}
            mx="auto"
          >
            <TextField
              fullWidth
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              error={!!error}
              helperText={error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon
                      sx={{ color: error ? "error.main" : "text.secondary" }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                "& .MuiFilledInput-root": {
                  bgcolor: "white",
                  borderRadius: "10px",
                  border: "none",
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                px: 4,
                py: 1.75,
                bgcolor: "#131b2e",
                color: "white",
                fontWeight: 900,
                whiteSpace: "nowrap",
                "&:hover": { bgcolor: "#0f1629" },
                minWidth: 160,
              }}
            >
              SUBSCRIBE
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

/* ── Main Home ── */
export default function Home() {
  const { products, loading } = useFetchProducts();
  const navigate = useNavigate();
  const featured = products?.slice(0, 8) || [];

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      <HeroCarousel />

      {/* Featured Categories */}
      <Container maxWidth="xl" sx={{ py: 12 }}>
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                position: "relative",
                height: 420,
                borderRadius: "20px",
                overflow: "hidden",
                mb: 4,
              }}
            >
              <Box
                component="img"
                loading="lazy"
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s",
                  "&:hover": { transform: "scale(1.04)" },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(19,27,46,0.75) 0%, transparent 60%)",
                  p: 3.5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: 900, mb: 1 }}
                >
                  Couture
                </Typography>
                <Link
                  to="/shop?category=women's clothing"
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    borderBottom: "1px solid rgba(255,255,255,0.4)",
                    width: "fit-content",
                    paddingBottom: 2,
                  }}
                >
                  DISCOVER →
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                bgcolor: "surface.containerLow",
                p: 4,
                borderRadius: "20px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                Accessories
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 3 }}
              >
                The finishing touches for a modern wardrobe.
              </Typography>
              <Button
                size="small"
                variant="outlined"
                component={Link}
                to="/shop?category=jewelery"
              >
                Shop Now →
              </Button>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                position: "relative",
                height: "100%",
                minHeight: 420,
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                loading="lazy"
                src="https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=80&w=1600"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s",
                  "&:hover": { transform: "scale(1.04)" },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(19,27,46,0.65) 0%, transparent 60%)",
                  p: 6,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 800 }}
                >
                  TAILORED PRECISION
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    color: "white",
                    fontWeight: 900,
                    mb: 4,
                    textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  The Modern
                  <br />
                  Gentleman
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    width: "fit-content",
                    bgcolor: "white",
                    color: "#131b2e",
                    fontWeight: 900,
                    "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                  }}
                  component={Link}
                  to="/shop?category=men's clothing"
                >
                  EXPLORE ESSENTIALS
                </Button>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      </Container>

      {/* Best Sellers */}
      <Box sx={{ bgcolor: "background.paper", py: 12 }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 800,
                letterSpacing: "0.2em",
              }}
            >
              CURATED SELECTION
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mt: 1,
                fontFamily: '"Playfair Display", serif',
              }}
            >
              The Best Sellers
            </Typography>
          </Box>
          {loading ? (
            <Grid2 container spacing={3}>
              {[...Array(8)].map((_, i) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                  <Box
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      bgcolor: "surface.containerLow",
                      height: 400,
                    }}
                  />
                </Grid2>
              ))}
            </Grid2>
          ) : (
            <Grid2 container spacing={3}>
              {featured.map((p, i) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
                  <ProductCard product={p} index={i} />
                </Grid2>
              ))}
            </Grid2>
          )}
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/shop")}
              sx={{ px: 6, py: 1.75 }}
            >
              VIEW ALL PIECES
            </Button>
          </Box>
        </Container>
      </Box>

      <BrandStory />
      <Testimonials />
      <PartnerBrands />
      <Newsletter />
      <Footer />
    </Box>
  );
}
