import { useState, useEffect } from 'react'
import { fetchProduct } from '../services/api'

export default function useFetchProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [tick, setTick]       = useState(0)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchProduct(id)
      .then(data => {
        if (!cancelled) {
          setProduct(data)
          setLoading(false)
        }
      })
      .catch(e => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [id, tick])

  const refetch = () => setTick(t => t + 1)
  return { product, loading, error, refetch }
}

export { useFetchProduct }
