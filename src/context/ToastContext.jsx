import { createContext, useContext, useState, useCallback } from 'react'
import { Snackbar, Alert, Slide } from '@mui/material'

const ToastContext = createContext(null)

function SlideTransition(props) {
  return <Slide {...props} direction="left" />
}

export function ToastProvider({ children }) {
  const [queue, setQueue] = useState([])
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(null)

  const toast = useCallback((message, severity = 'info') => {
    setQueue(q => [...q, { message, severity, key: Date.now() }])
    setOpen(true)
    setCurrent({ message, severity, key: Date.now() })
  }, [])

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={SlideTransition}
        sx={{ mt: 9 }}
      >
        <Alert
          onClose={handleClose}
          severity={current?.severity || 'info'}
          variant="filled"
          sx={{
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.875rem',
            minWidth: 280,
            boxShadow: '0 8px 32px rgba(19,27,46,0.18)',
          }}
        >
          {current?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
