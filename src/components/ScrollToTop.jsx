import { useState, useEffect } from 'react'
import { Fab, Zoom, Tooltip } from '@mui/material'
import { KeyboardArrowUp as UpIcon } from '@mui/icons-material'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Zoom in={visible}>
      <Tooltip title="Back to Top" placement="left">
        <Fab onClick={scrollUp} size="medium" color="primary"
          sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1200, boxShadow: '0 4px 20px rgba(42,20,180,0.3)' }}>
          <UpIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  )
}
