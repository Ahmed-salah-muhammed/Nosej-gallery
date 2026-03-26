import { useState, useMemo } from 'react'
import {
  Box, Container, Typography, TextField, FormControlLabel, Checkbox,
  Slider, Select, MenuItem, FormControl, InputLabel, Stack, Skeleton,
  Button, InputAdornment, Divider, Chip, ToggleButton, ToggleButtonGroup,
  Rating, Collapse
} from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import {
  Search as SearchIcon, Close as CloseIcon, FilterList as FilterIcon,
  ViewModule as GridIcon, ViewList as ListIcon, ExpandMore as ExpandIcon,
  SentimentDissatisfied as EmptyIcon, Star as StarIcon
} from '@mui/icons-material'
import useFetchProducts from '../hooks/useFetchProducts'
import ProductCard from '../components/ProductCard'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../components/Footer'

const SORT_OPTIONS = [
  { label: 'Default Sorting', value: 'default' },
  { label: 'Price: Low → High', value: 'price_asc' },
  { label: 'Price: High → Low', value: 'price_desc' },
  { label: 'Best Rating', value: 'rating_desc' },
  { label: 'Most Reviews', value: 'reviews_desc' },
  { label: 'Name: A–Z', value: 'name_asc' },
  { label: 'Name: Z–A', value: 'name_desc' },
]

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <Box>
      <Button fullWidth onClick={() => setOpen(o => !o)}
        endIcon={<ExpandIcon sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: '0.25s' }} />}
        sx={{ justifyContent: 'space-between', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.72rem', color: 'text.primary', px: 0, '&:hover': { bgcolor: 'transparent', color: 'primary.main' } }}>
        {title}
      </Button>
      <Collapse in={open}>
        <Box sx={{ pt: 1.5, pb: 2 }}>{children}</Box>
      </Collapse>
      <Divider />
    </Box>
  )
}

export default function Shop() {
  const { products, loading, error, refetch } = useFetchProducts()
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('default')
  const [minRating, setMinRating] = useState(0)
  const [inStock, setInStock] = useState(false)
  const [onSale, setOnSale] = useState(false)
  const [viewMode, setViewMode] = useState('grid')

  const allCategories = useMemo(() => {
    if (!products) return []
    return Array.from(new Set(products.map(p => p.category)))
  }, [products])

  const maxPrice = useMemo(() => products ? Math.ceil(Math.max(...products.map(p => p.price))) : 1000, [products])

  const filtered = useMemo(() => {
    if (!products) return []
    let res = products.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      const matchCat = categories.length === 0 || categories.includes(p.category)
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      const matchRating = (p.rating?.rate ?? 0) >= minRating
      const matchSale = !onSale || p.id % 5 === 0
      return matchSearch && matchCat && matchPrice && matchRating && matchSale
    })
    if (sortBy === 'price_asc') res.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price_desc') res.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating_desc') res.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    else if (sortBy === 'reviews_desc') res.sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0))
    else if (sortBy === 'name_asc') res.sort((a, b) => a.title.localeCompare(b.title))
    else if (sortBy === 'name_desc') res.sort((a, b) => b.title.localeCompare(a.title))
    return res
  }, [products, search, categories, priceRange, sortBy, minRating, onSale])

  const activeFilters = [
    ...categories.map(c => ({ label: c, onRemove: () => setCategories(prev => prev.filter(x => x !== c)) })),
    ...(minRating > 0 ? [{ label: `${minRating}★+`, onRemove: () => setMinRating(0) }] : []),
    ...(onSale ? [{ label: 'On Sale', onRemove: () => setOnSale(false) }] : []),
  ]

  const resetAll = () => { setSearch(''); setCategories([]); setPriceRange([0, maxPrice]); setSortBy('default'); setMinRating(0); setOnSale(false) }

  if (error) return (
    <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h5" color="error" fontWeight={900}>Something went wrong</Typography>
        <Button variant="contained" onClick={refetch}>Try Again</Button>
      </Stack>
    </Box>
  )

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'surface.containerLow', py: 7 }}>
        <Container maxWidth="xl">
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 1.5, fontFamily: '"Playfair Display", serif' }}>Shop Collection</Typography>
          <Breadcrumbs />
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid2 container spacing={6}>
          {/* Sidebar */}
          <Grid2 size={{ xs: 12, lg: 3 }}>
            <Box sx={{ position: 'sticky', top: 120 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FilterIcon fontSize="small" /> Filters
                </Typography>
                {activeFilters.length > 0 && (
                  <Button size="small" onClick={resetAll} sx={{ fontSize: '0.72rem', fontWeight: 800, color: 'error.main' }}>CLEAR ALL</Button>
                )}
              </Box>
              {/* Active chips */}
              {activeFilters.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                  {activeFilters.map(f => (
                    <Chip key={f.label} label={f.label} size="small" onDelete={f.onRemove} color="primary" variant="outlined" sx={{ fontWeight: 700, fontSize: '0.72rem' }} />
                  ))}
                </Box>
              )}
              <Stack spacing={2}>
                <FilterSection title="Search">
                  <TextField fullWidth placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>, endAdornment: search && <InputAdornment position="end"><CloseIcon fontSize="small" sx={{ cursor: 'pointer' }} onClick={() => setSearch('')} /></InputAdornment> }}
                    sx={{ '& .MuiFilledInput-root': { borderRadius: '10px' } }} />
                </FilterSection>
                <FilterSection title="Categories">
                  <Stack spacing={0.5}>
                    {loading ? [...Array(4)].map((_, i) => <Skeleton key={i} height={28} width="80%" />) : allCategories.map(cat => (
                      <FormControlLabel key={cat} control={<Checkbox size="small" checked={categories.includes(cat)} onChange={() => setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} />}
                        label={<Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: categories.includes(cat) ? 700 : 400, color: categories.includes(cat) ? 'primary.main' : 'text.secondary' }}>{cat}</Typography>} />
                    ))}
                  </Stack>
                </FilterSection>
                <FilterSection title="Price Range">
                  <Box sx={{ px: 0.5 }}>
                    <Slider value={priceRange} onChange={(_, v) => setPriceRange(v)} min={0} max={maxPrice} valueLabelDisplay="auto"
                      valueLabelFormat={v => `$${v}`} sx={{ color: 'primary.main' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <Typography variant="caption" fontWeight={700}>${priceRange[0]}</Typography>
                      <Typography variant="caption" fontWeight={700}>${priceRange[1]}</Typography>
                    </Box>
                  </Box>
                </FilterSection>
                <FilterSection title="Minimum Rating">
                  <Rating value={minRating} onChange={(_, v) => setMinRating(v ?? 0)} precision={1} sx={{ color: '#FBBF24' }} />
                  {minRating > 0 && <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>{minRating}+ stars</Typography>}
                </FilterSection>
                <FilterSection title="Availability" defaultOpen={false}>
                  <FormControlLabel control={<Checkbox size="small" checked={inStock} onChange={e => setInStock(e.target.checked)} />} label={<Typography variant="body2" sx={{ fontWeight: 600 }}>In Stock Only</Typography>} />
                  <FormControlLabel control={<Checkbox size="small" checked={onSale} onChange={e => setOnSale(e.target.checked)} />} label={<Typography variant="body2" sx={{ fontWeight: 600 }}>On Sale</Typography>} />
                </FilterSection>
              </Stack>
              {/* Promo Card */}
              <Box sx={{ mt: 4, background: 'linear-gradient(135deg, #2a14b4 0%, #4338ca 100%)', color: 'white', p: 3.5, borderRadius: '16px' }}>
                <Typography variant="overline" sx={{ fontWeight: 900, opacity: 0.8, display: 'block', mb: 0.5 }}>EXCLUSIVE</Typography>
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 1.5 }}>Unlock the Archive</Typography>
                <Typography variant="body2" sx={{ mb: 2.5, opacity: 0.85, lineHeight: 1.7 }}>Join our circle for priority access and member shipping rates.</Typography>
                <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 900, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>JOIN NOW</Button>
              </Box>
            </Box>
          </Grid2>

          {/* Product Grid */}
          <Grid2 size={{ xs: 12, lg: 9 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2, mb: 4 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.01em', mb: 0.25 }}>Collection</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Showing <strong>{filtered.length}</strong> of {products?.length ?? 0} pieces
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <FormControl variant="filled" sx={{ minWidth: 180 }}>
                  <InputLabel sx={{ fontSize: '0.75rem', fontWeight: 700 }}>Sort By</InputLabel>
                  <Select value={sortBy} onChange={e => setSortBy(e.target.value)} sx={{ fontWeight: 600, fontSize: '0.875rem', borderRadius: '10px' }}>
                    {SORT_OPTIONS.map(o => <MenuItem key={o.value} value={o.value} sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
                <ToggleButtonGroup value={viewMode} exclusive onChange={(_, v) => v && setViewMode(v)} size="small" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <ToggleButton value="grid" sx={{ px: 1.5 }}><GridIcon fontSize="small" /></ToggleButton>
                  <ToggleButton value="list" sx={{ px: 1.5 }}><ListIcon fontSize="small" /></ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
            <Divider sx={{ mb: 5 }} />
            {loading ? (
              <Grid2 container spacing={3}>
                {[...Array(9)].map((_, i) => <Grid2 size={{ xs: 12, sm: 6, md: viewMode === 'grid' ? 4 : 12 }} key={i}><Skeleton variant="rectangular" height={360} sx={{ borderRadius: '16px' }} /></Grid2>)}
              </Grid2>
            ) : filtered.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 20 }}>
                <EmptyIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 3 }} />
                <Typography variant="h5" fontWeight={900} mb={1}>No pieces found</Typography>
                <Typography variant="body2" color="text.secondary" mb={4}>Try adjusting your filters or search term.</Typography>
                <Button variant="outlined" onClick={resetAll}>Reset Filters</Button>
              </Box>
            ) : (
              <Grid2 container spacing={3}>
                {filtered.map((p, i) => (
                  <Grid2 size={{ xs: 12, sm: 6, md: viewMode === 'grid' ? 4 : 12 }} key={p.id}>
                    <ProductCard product={p} index={i} />
                  </Grid2>
                ))}
              </Grid2>
            )}
          </Grid2>
        </Grid2>
      </Container>
      <Footer />
    </Box>
  )
}
