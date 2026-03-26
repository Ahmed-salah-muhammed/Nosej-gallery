import { useState, useMemo, useEffect } from "react";
import {
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Skeleton,
  Button,
  InputAdornment,
  Rating,
  Collapse,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  FilterList as FilterIcon,
  ViewModule as GridIcon,
  ViewList as ListIcon,
  ExpandMore as ExpandIcon,
  SentimentDissatisfied as EmptyIcon,
} from "@mui/icons-material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { Pagination, PaginationItem } from "@mui/material";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductCard from "../components/ProductCard";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";

const SORT_OPTIONS = [
  { label: "Default Sorting", value: "default" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Best Rating", value: "rating_desc" },
  { label: "Most Reviews", value: "reviews_desc" },
  { label: "Name: A–Z", value: "name_asc" },
  { label: "Name: Z–A", value: "name_desc" },
];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className="border-b"
      style={{ borderColor: "var(--color-outline-variant)" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center py-4 font-black text-[11px] tracking-widest uppercase transition-colors"
        style={{ color: "var(--color-on-surface)" }}
      >
        {title}
        <ExpandIcon
          className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          sx={{ fontSize: 18 }}
        />
      </button>
      <Collapse in={open}>
        <div className="pb-6">{children}</div>
      </Collapse>
    </div>
  );
}

export default function Shop() {
  const { products, loading, error, refetch } = useFetchProducts();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([20, 13000]);
  const [sortBy, setSortBy] = useState("default");
  const [minRating, setMinRating] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const allCategories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const maxPrice = useMemo(
    () =>
      products?.length
        ? Math.ceil(Math.max(...products.map((p) => p.price)))
        : 2000,
    [products],
  );

  const filtered = useMemo(() => {
    if (!products) return [];
    let res = products.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase());
      const matchCat =
        categories.length === 0 || categories.includes(p.category);
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchRating = (p.rating ?? 0) >= minRating;
      const matchSale = !onSale || p.discountPercentage > 10;
      return matchSearch && matchCat && matchPrice && matchRating && matchSale;
    });

    res = [...res];
    if (sortBy === "price_asc") res.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") res.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating_desc")
      res.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    else if (sortBy === "reviews_desc")
      res.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
    else if (sortBy === "name_asc")
      res.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "name_desc")
      res.sort((a, b) => b.title.localeCompare(a.title));
    return res;
  }, [products, search, categories, priceRange, sortBy, minRating, onSale]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categories, priceRange, sortBy, minRating, onSale]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const resetAll = () => {
    setSearch("");
    setCategories([]);
    setPriceRange([0, maxPrice]);
    setSortBy("default");
    setMinRating(0);
    setOnSale(false);
    setCurrentPage(1);
  };

  if (error)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl text-red-600 font-black">
          Something went wrong
        </h2>
        <Button
          variant="contained"
          onClick={refetch}
          sx={{ bgcolor: "#131b2e" }}
        >
          Try Again
        </Button>
      </div>
    );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* Header */}
      <div
        className="py-16"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h1
            className="text-5xl font-black mb-4 font-serif"
            style={{ color: "var(--color-on-surface)" }}
          >
            Shop Collection
          </h1>
          <Breadcrumbs />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32">
              <div className="flex justify-between items-center mb-8">
                <h3
                  className="font-black text-lg flex items-center gap-2"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  <FilterIcon fontSize="small" /> Filters
                </h3>
                {(categories.length > 0 ||
                  minRating > 0 ||
                  onSale ||
                  search) && (
                  <button
                    onClick={resetAll}
                    className="text-[10px] font-black text-red-600 hover:underline tracking-widest"
                  >
                    CLEAR ALL
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <FilterSection title="Search">
                  <div className="relative">
                    <SearchIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      sx={{ fontSize: 18 }}
                    />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full pl-10 pr-10 py-3 rounded-xl outline-none text-sm font-bold border transition-all"
                      style={{
                        backgroundColor: "var(--color-surface-container-low)",
                        color: "var(--color-on-surface)",
                        borderColor: "var(--color-outline-variant)",
                      }}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                      <CloseIcon
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                        sx={{ fontSize: 18 }}
                        onClick={() => setSearch("")}
                      />
                    )}
                  </div>
                </FilterSection>

                <FilterSection title="Categories">
                  <div className="flex flex-col gap-2">
                    {loading
                      ? [...Array(4)].map((_, i) => (
                          <Skeleton key={i} height={28} width="80%" />
                        ))
                      : allCategories.map((cat) => (
                          <label
                            key={cat}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-[#131b2e] focus:ring-[#131b2e]"
                              checked={categories.includes(cat)}
                              onChange={() =>
                                setCategories((prev) =>
                                  prev.includes(cat)
                                    ? prev.filter((c) => c !== cat)
                                    : [...prev, cat],
                                )
                              }
                            />
                            <span
                              className={`text-sm capitalize transition-colors ${categories.includes(cat) ? "font-black text-[#131b2e]" : "text-gray-500 group-hover:text-gray-900"}`}
                            >
                              {cat}
                            </span>
                          </label>
                        ))}
                  </div>
                </FilterSection>

                <FilterSection title="Price Range">
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onChange={(_, v) => setPriceRange(v)}
                      min={0}
                      max={maxPrice}
                      valueLabelDisplay="auto"
                      sx={{ color: "#131b2e" }}
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] font-black text-gray-400">
                        ${priceRange[0]}
                      </span>
                      <span className="text-[10px] font-black text-gray-400">
                        ${priceRange[1]}
                      </span>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection title="Minimum Rating">
                  <Rating
                    value={minRating}
                    onChange={(_, v) => setMinRating(v ?? 0)}
                    precision={1}
                    sx={{ color: "#FBBF24" }}
                  />
                  {minRating > 0 && (
                    <span className="text-[10px] font-black text-gray-400 mt-2 block">
                      {minRating}+ stars
                    </span>
                  )}
                </FilterSection>

                <FilterSection title="Availability" defaultOpen={false}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300  focus:ring-[#131b2e]"
                      checked={onSale}
                      onChange={(e) => setOnSale(e.target.checked)}
                    />
                    <span
                      className={`text-sm transition-colors ${onSale ? "font-black " : "text-gray-500 group-hover:text-gray-900"}`}
                    >
                      On Sale
                    </span>
                  </label>
                </FilterSection>
              </div>

              {/* Promo Card */}
              <div className="mt-10 bg-[#131b2e] text-white p-8 rounded-3xl shadow-xl">
                <span className="text-[10px] font-black opacity-60 block mb-2 tracking-widest uppercase">
                  EXCLUSIVE
                </span>
                <h4 className="text-xl font-black mb-4">Unlock the Archive</h4>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  Join our circle for priority access and member shipping rates.
                </p>
                <button className="w-full py-3 bg-white font-black text-xs tracking-widest rounded-xl hover:bg-gray-100 transition-all text-black">
                  JOIN NOW
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-9">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
              <div>
                <h2
                  className="text-3xl font-black mb-1"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  Collection
                </h2>
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <strong className="text-gray-900">
                    {paginatedProducts.length}
                  </strong>{" "}
                  of {filtered.length} pieces
                </p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <FormControl
                  variant="outlined"
                  size="small"
                  className="min-w-[180px]"
                >
                  <InputLabel sx={{ fontSize: "0.75rem", fontWeight: 700 }}>
                    Sort By
                  </InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.75rem",
                      borderRadius: "12px",
                    }}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <MenuItem
                        key={o.value}
                        value={o.value}
                        sx={{ fontWeight: 700, fontSize: "0.75rem" }}
                      >
                        {o.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div className="hidden sm:flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#131b2e] text-white"
                        : "bg-white text-gray-400 hover:text-gray-900"
                    }`}
                  >
                    <GridIcon fontSize="small" />
                  </button>

                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 transition-colors ${
                      viewMode === "list"
                        ? "bg-[#131b2e] text-white"
                        : "bg-white text-gray-400 hover:text-gray-900"
                    }`}
                  >
                    <ListIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 mb-10" />

            {/* Content */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <Skeleton
                      variant="rectangular"
                      height={360}
                      className="rounded-2xl"
                    />
                    <Skeleton height={24} width="60%" />
                    <Skeleton height={20} width="40%" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-32">
                <EmptyIcon className="text-gray-100 text-8xl mb-6" />
                <h3
                  className="text-2xl font-black mb-2"
                  style={{ color: "var(--color-on-surface)" }}
                >
                  No pieces found
                </h3>
                <p className="text-gray-500 mb-8">
                  Try adjusting your filters or search term.
                </p>
                <button
                  onClick={resetAll}
                  className="px-8 py-3 border-2 border-[#131b2e] text-[#131b2e] font-black text-xs tracking-widest rounded-xl hover:bg-[#131b2e] hover:text-white transition-all"
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <>
                {/* Products */}
                <div
                  className={`grid gap-8 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {paginatedProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex flex-col items-center gap-4 mt-12">
                  {/* MUI Pagination */}
                  <Pagination
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    count={totalPages}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                    siblingCount={1}
                    variant="outlined"
                    boundaryCount={1}
                    // disabled
                  />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
