import { createTheme } from '@mui/material'

export const getAppTheme = (mode) => {
  const isDark = mode === 'dark'

  const colors = {
    primary: '#2a14b4',
    primaryContainer: '#4338ca',
    secondary: '#515f74',
    background: isDark ? '#0f1629' : '#faf8ff',
    surface: isDark ? '#1a2235' : '#faf8ff',
    onSurface: isDark ? '#e8eaf6' : '#131b2e',
    surfaceContainerLow: isDark ? '#151f33' : '#f2f3ff',
    surfaceContainerHighest: isDark ? '#222d45' : '#dae2fd',
    outlineVariant: isDark ? '#2d3a52' : '#c7c4d7',
    textSecondary: isDark ? '#8892a4' : '#515f74',
  }

  return createTheme({
    palette: {
      mode,
      primary: { main: colors.primary, light: colors.primaryContainer },
      secondary: { main: colors.secondary },
      background: { default: colors.background, paper: colors.surface },
      text: {
        primary: colors.onSurface,
        secondary: colors.textSecondary,
      },
      surface: {
        main: colors.surface,
        containerLow: colors.surfaceContainerLow,
        containerHighest: colors.surfaceContainerHighest,
      },
      outlineVariant: colors.outlineVariant,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 16,
      h1: { fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.02em' },
      h2: { fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.01em' },
      h3: { fontSize: '1.875rem', fontWeight: 700 },
      h4: { fontSize: '1.5rem', fontWeight: 700 },
      h5: { fontSize: '1.25rem', fontWeight: 600 },
      h6: { fontSize: '1.1rem', fontWeight: 600 },
      body1: { fontSize: '1rem', lineHeight: 1.7 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.7 },
      overline: { fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' },
      caption: { fontSize: '0.8125rem' },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 700,
            padding: '10px 24px',
            borderRadius: '10px',
            transition: 'all 0.2s ease-in-out',
            fontSize: '0.9375rem',
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryContainer} 100%)`,
            boxShadow: 'none',
            '&:hover': { opacity: 0.9, boxShadow: '0 4px 16px rgba(42,20,180,0.25)' },
          },
          outlined: {
            borderColor: colors.outlineVariant,
            '&:hover': { backgroundColor: colors.surfaceContainerLow, borderColor: colors.primary },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderRadius: '16px',
            backgroundColor: colors.surfaceContainerLow,
            transition: 'all 0.25s ease-in-out',
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { boxShadow: 'none' } },
      },
      MuiTextField: {
        defaultProps: { variant: 'filled' },
        styleOverrides: {
          root: {
            '& .MuiFilledInput-root': {
              backgroundColor: colors.surfaceContainerLow,
              borderRadius: '10px',
              border: `1px solid ${colors.outlineVariant}`,
              '&:before, &:after': { display: 'none' },
              '&:hover': { backgroundColor: colors.surfaceContainerHighest },
              '&.Mui-focused': {
                backgroundColor: colors.background,
                boxShadow: `0 0 0 2px ${colors.primary}40`,
                borderColor: colors.primary,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 700, borderRadius: '8px' },
        },
      },
    },
  })
}
