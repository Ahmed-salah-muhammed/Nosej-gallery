// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('shopwave-cart') || '[]')
    } catch {
      return []
    }
  })

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('shopwave-cart', JSON.stringify(items))
    } catch {}
  }, [items])

  /** Total number of individual units in the cart */
  const totalCount = items.reduce((sum, i) => sum + i.qty, 0)

  /** Total monetary value before tax/shipping */
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  /** Add a product (or increase its qty if already present) */
  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const exists = prev.find(i => i.product.id === product.id)
      if (exists) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, { product, qty }]
    })
  }, [])

  /** Remove a product completely */
  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.product.id !== productId))
  }, [])

  /** Set exact qty for a product — removes if qty <= 0 */
  const updateQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      removeItem(productId)
      return
    }
    setItems(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, qty } : i))
    )
  }, [removeItem])

  /** Wipe the entire cart */
  const clearCart = useCallback(() => setItems([]), [])

  return (
    <CartContext.Provider
      value={{ items, totalCount, totalPrice, addItem, removeItem, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

/** Hook — must be used inside <CartProvider> */
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
