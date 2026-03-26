import { Component } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { BrokenImage as ErrorIcon } from '@mui/icons-material'

export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  componentDidCatch(error, info) { console.error('ErrorBoundary caught:', error, info) }

  render() {
    if (this.state.hasError) return (
      <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, p: 4 }}>
        <ErrorIcon sx={{ fontSize: 60, color: 'error.main' }} />
        <Typography variant="h5" fontWeight={900}>Something went wrong</Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" maxWidth={400}>{this.state.error?.message}</Typography>
        <Button variant="contained" onClick={() => { this.setState({ hasError: false }); window.location.reload() }}>
          Reload Page
        </Button>
      </Box>
    )
    return this.props.children
  }
}
