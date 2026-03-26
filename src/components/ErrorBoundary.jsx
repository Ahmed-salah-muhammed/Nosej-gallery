import { Component } from 'react'
import { BrokenImage as ErrorIcon } from '@mui/icons-material'

export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  componentDidCatch(error, info) { console.error('ErrorBoundary caught:', error, info) }

  render() {
    if (this.state.hasError) return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 p-8 text-center">
        <ErrorIcon className="text-red-600" sx={{ fontSize: 80 }} />
        <h2 className="text-3xl font-black text-gray-900">Something went wrong</h2>
        <p className="text-gray-500 max-w-md text-sm font-bold">
          {this.state.error?.message || "An unexpected error occurred while rendering this piece."}
        </p>
        <button 
          onClick={() => { this.setState({ hasError: false }); window.location.reload() }}
          className="px-10 py-4 bg-[#131b2e] text-white font-black text-sm tracking-widest rounded-xl hover:bg-black transition-all"
        >
          RELOAD PAGE
        </button>
      </div>
    )
    return this.props.children
  }
}
