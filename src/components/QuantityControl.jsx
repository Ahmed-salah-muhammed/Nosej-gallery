import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material'

export default function QuantityControl({ value, onChange, min = 1, size = 'md' }) {
  const handleInput = (e) => {
    const parsed = parseInt(e.target.value, 10)
    if (!isNaN(parsed)) onChange(Math.max(min, parsed))
  }

  const handleBlur = (e) => {
    if (!e.target.value || parseInt(e.target.value, 10) < min) onChange(min)
  }

  const isSmall = size === 'sm'

  return (
    <div className={`inline-flex items-center bg-gray-50 rounded-xl border border-gray-100 transition-all hover:border-[#131b2e] hover:bg-white ${isSmall ? 'px-1 py-0.5' : 'px-2 py-1'}`}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`p-1 text-gray-900 hover:text-[#131b2e] transition-colors ${isSmall ? 'p-1' : 'p-2'}`}
      >
        <RemoveIcon sx={{ fontSize: isSmall ? 14 : 18 }} />
      </button>

      <input
        type="text"
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        className={`bg-transparent text-center font-black outline-none ${isSmall ? 'text-xs w-6' : 'text-sm w-8'}`}
        aria-label="quantity"
      />

      <button
        onClick={() => onChange(value + 1)}
        className={`p-1 text-gray-900 hover:text-[#131b2e] transition-colors ${isSmall ? 'p-1' : 'p-2'}`}
      >
        <AddIcon sx={{ fontSize: isSmall ? 14 : 18 }} />
      </button>
    </div>
  )
}
