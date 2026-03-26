import { Box, IconButton, InputBase, Typography } from '@mui/material'
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
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        bgcolor: 'surface.containerLow',
        borderRadius: '8px',
        px: isSmall ? 0.5 : 1,
        py: isSmall ? 0.25 : 0.5,
        border: '1px solid',
        borderColor: 'outlineVariant',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'background.paper'
        }
      }}
    >
      <IconButton
        onClick={() => onChange(Math.max(min, value - 1))}
        size="small"
        sx={{
          p: isSmall ? 0.5 : 1,
          color: 'text.primary',
          '&:hover': { color: 'primary.main' }
        }}
      >
        <RemoveIcon sx={{ fontSize: isSmall ? 14 : 18 }} />
      </IconButton>

      <InputBase
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
        inputProps={{
          'aria-label': 'quantity',
          style: {
            textAlign: 'center',
            fontWeight: 800,
            fontSize: isSmall ? '0.75rem' : '0.875rem',
            width: isSmall ? 24 : 32,
            padding: 0
          }
        }}
      />

      <IconButton
        onClick={() => onChange(value + 1)}
        size="small"
        sx={{
          p: isSmall ? 0.5 : 1,
          color: 'text.primary',
          '&:hover': { color: 'primary.main' }
        }}
      >
        <AddIcon sx={{ fontSize: isSmall ? 14 : 18 }} />
      </IconButton>
    </Box>
  )
}
