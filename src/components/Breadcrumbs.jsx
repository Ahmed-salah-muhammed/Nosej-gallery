import { Link, useLocation } from "react-router-dom";
import {
  NavigateNext as NextIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

const labels = {
  shop: "Shop",
  cart: "Cart",
  wishlist: "Wishlist",
  checkout: "Checkout",
  login: "Login",
  profile: "Profile",
  product: "Product",
};

export default function Breadcrumbs({ title }) {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Home", path: "/" },
    ...parts.map((part, i) => ({
      label: labels[part] || title || decodeURIComponent(part),
      path: "/" + parts.slice(0, i + 1).join("/"),
    })),
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap cursor-pointer">
      {crumbs.map((c, i) => (
        <div key={c.path} className="flex items-center gap-2">
          {i > 0 && (
            <NextIcon
              className="text-gray-300 cursor-pointer"
              sx={{ fontSize: 14 }}
            />
          )}
          {i === 0 && (
            <HomeIcon
              className="text-gray-400 mr-1 cursor-pointer"
              sx={{ fontSize: 13 }}
            />
          )}
          {i < crumbs.length - 1 ? (
            <Link
              to={c.path}
              className="text-[10px] font-black text-gray-400 transition-colors uppercase tracking-widest cursor-pointer"
            >
              {c.label}
            </Link>
          ) : (
            <span className="text-[10px] font-black  uppercase tracking-widest cursor-pointer">
              {c.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
