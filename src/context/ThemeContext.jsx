import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { ThemeProvider as MUIThemeProvider, CssBaseline } from '@mui/material'
import { getAppTheme } from '../theme'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('shopwave-theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    // Apply data-theme attribute to html element — drives CSS vars in global.css
    const root = document.documentElement
    if (dark) {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
    } else {
      root.setAttribute('data-theme', 'light')
      root.classList.remove('dark')
    }
    // Persist preference
    try {
      localStorage.setItem('shopwave-theme', dark ? 'dark' : 'light')
    } catch {}
  }, [dark])

  // Re-create MUI theme whenever mode changes
  const muiTheme = useMemo(() => getAppTheme(dark ? 'dark' : 'light'), [dark])

  const toggle = () => setDark((d) => !d)

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <MUIThemeProvider theme={muiTheme}>
        {/* CssBaseline applies MUI palette.background.default to <body> */}
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
