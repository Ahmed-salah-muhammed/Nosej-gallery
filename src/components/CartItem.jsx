// src/components/CartItem.jsx — Stitch NOSEJ cart row (no dividers, spacing as separator)
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import QuantityControl from "./QuantityControl";

export default function CartItem({ product, qty }) {
  const { updateQty, removeItem } = useCart();
  const toast = useToast();

  const handleRemove = () => {
    removeItem(product.id);
    toast("Item removed from your selection", "error");
  };

  return (
    <div className="animate-slideIn flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
      {/* Thumbnail */}
      <div
        className="w-28 h-36 rounded-lg overflow-hidden flex-shrink-0"
        style={{ backgroundColor: "var(--color-surface-container-low)" }}
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info grid: name | qty | unit price | total + delete */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center w-full">
        {/* Name + ref */}
        <div className="md:col-span-1">
          <h3
            className="font-bold text-base leading-tight"
            style={{ color: "var(--color-on-surface)" }}
          >
            {product.title.length > 40
              ? product.title.slice(0, 40) + "…"
              : product.title}
          </h3>
          <p
            className="text-[10px] uppercase tracking-widest mt-1"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            {product.category}
          </p>
        </div>

        {/* Qty stepper */}
        <div className="flex items-center space-x-3 md:justify-center">
          {/* Round ghost buttons per Stitch cart design */}
          <button
            onClick={() => updateQty(product.id, qty - 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       transition-colors duration-200 hover:bg-[var(--color-surface-container-high)]"
            style={{
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface)",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 14 }}
            >
              remove
            </span>
          </button>
          <span
            className="font-bold w-5 text-center text-sm"
            style={{ color: "var(--color-on-surface)" }}
          >
            {qty}
          </span>
          <button
            onClick={() => updateQty(product.id, qty + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       transition-colors duration-200 hover:bg-[var(--color-surface-container-high)]"
            style={{
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface)",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 14 }}
            >
              add
            </span>
          </button>
        </div>

        {/* Unit price */}
        <div className="text-left md:text-center">
          <span
            className="text-sm md:hidden block"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            Unit Price
          </span>
          <span
            className="font-medium text-sm"
            style={{ color: "var(--color-on-surface)" }}
          >
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Subtotal + delete */}
        <div className="flex justify-between items-center md:justify-end gap-6">
          <div className="text-right">
            <span
              className="text-sm md:hidden block"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Total
            </span>
            <span
              className="font-bold text-base"
              style={{ color: "var(--color-on-surface)" }}
            >
              ${(product.price * qty).toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 transition-colors duration-200 hover:text-[var(--color-error)]"
            style={{ color: "var(--color-on-surface-variant)" }}
            aria-label="Remove item"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20 }}
            >
              delete
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
