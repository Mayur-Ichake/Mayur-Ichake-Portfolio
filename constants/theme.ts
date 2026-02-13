export const theme = {
  colors: {
    background: '#0a0a0f',
    backgroundSecondary: '#0d1117',
    backgroundTertiary: '#161b22',
    
    surface: 'rgba(13, 17, 23, 0.8)',
    surfaceGlass: 'rgba(255, 255, 255, 0.03)',
    surfaceBorder: 'rgba(255, 255, 255, 0.08)',
    
    primary: '#00d4ff',
    primaryGlow: 'rgba(0, 212, 255, 0.3)',
    
    secondary: '#7c3aed',
    secondaryGlow: 'rgba(124, 58, 237, 0.3)',
    
    accent: '#3b82f6',
    accentGlow: 'rgba(59, 130, 246, 0.3)',
    
    cyan: '#00d4ff',
    purple: '#a855f7',
    blue: '#3b82f6',
    pink: '#ec4899',
    
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textMuted: 'rgba(255, 255, 255, 0.5)',
    
    success: '#10b981',
    error: '#ef4444',
  },
  
  gradients: {
    primary: ['#00d4ff', '#7c3aed'],
    secondary: ['#7c3aed', '#ec4899'],
    accent: ['#3b82f6', '#00d4ff'],
    card: ['rgba(0, 212, 255, 0.1)', 'rgba(124, 58, 237, 0.1)'],
  },
  
  shadows: {
    glow: {
      shadowColor: '#00d4ff',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 10,
    },
    glowPurple: {
      shadowColor: '#7c3aed',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 10,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
};
