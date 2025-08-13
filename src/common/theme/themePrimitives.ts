/* eslint-disable @typescript-eslint/consistent-type-definitions */
import {
  alpha,
  createTheme,
  type PaletteMode,
  type Shadows,
} from "@mui/material/styles"

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    highlighted: true
  }
}

declare module "@mui/material/styles" {
  interface ColorRange {
    50: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PaletteColor extends ColorRange {}

  interface Palette {
    baseShadow: string
    secondary: PaletteColor
  }
}

const defaultTheme = createTheme()

const customShadows: Shadows = [...defaultTheme.shadows]

// Nueva paleta de colores basada en el verde de Supabase (#2A7252)
export const brand = {
  50: "#E6F5F0",
  100: "#CCEBE0",
  200: "#99D6C0",
  300: "#66C2A0",
  400: "#4DB88C",
  500: "#2A7252",
  600: "#215C41",
  700: "#194631",
  800: "#123022",
  900: "#0A1B14",
}

// Nueva paleta secundaria basada en gris (ajustada para secondary[500] = #242424)
export const secondary = {
  50: "#F7F7F7",
  100: "#E1E1E1",
  200: "#CFCFCF",
  300: "#B1B1B1",
  400: "#9E9E9E",
  500: "#242424", // Establecido como main según solicitud
  600: "#1C1C1C",
  700: "#171717",
  800: "#121212",
  900: "#0D0D0D",
}

export const gray = {
  50: "#F7F8FA",
  100: "#EDEFF4",
  200: "#D9DDE6",
  300: "#C4CAD8",
  400: "#9AA4BD",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827",
}

export const green = {
  50: "#F0FAF4",
  100: "#D1F0DD",
  200: "#A3E0C2",
  300: "#75CFA7",
  400: "#2EC48B",
  500: "#10B981",
  600: "#059669",
  700: "#047857",
  800: "#065F46",
  900: "#064E3B",
}

export const orange = {
  50: "#FFF8E7",
  100: "#FFEBC2",
  200: "#FFD591",
  300: "#FFBF60",
  400: "#FF9500",
  500: "#F97316",
  600: "#EA580C",
  700: "#C2410C",
  800: "#9A3412",
  900: "#7C2D12",
}

export const red = {
  50: "#FEF2F2",
  100: "#FEE2E2",
  200: "#FECACA",
  300: "#FCA5A5",
  400: "#F87171",
  500: "#EF4444",
  600: "#DC2626",
  700: "#B91C1C",
  800: "#991B1B",
  900: "#7F1D1D",
}

export const getDesignTokens = (mode: PaletteMode) => {
  customShadows[1] = "none"

  return {
    palette: {
      mode,
      primary: {
        light: brand[300],
        main: brand[500], // #2A7252
        dark: brand[700],
        contrastText: "#FFFFFF",
        ...(mode === "dark" && {
          contrastText: "#FFFFFF",
          light: brand[400],
          main: brand[500],
          dark: brand[600],
        }),
      },
      secondary: {
        light: secondary[300],
        main: secondary[500], // #242424
        dark: secondary[700],
        contrastText: "#FFFFFF",
        ...(mode === "dark" && {
          contrastText: "#FFFFFF",
          light: secondary[400],
          main: secondary[500],
          dark: secondary[600],
        }),
      },
      info: {
        light: brand[200],
        main: brand[400],
        dark: brand[600],
        contrastText: gray[50],
        ...(mode === "dark" && {
          contrastText: brand[300],
          light: brand[500],
          main: brand[700],
          dark: brand[900],
        }),
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800],
        ...(mode === "dark" && {
          light: orange[400],
          main: orange[500],
          dark: orange[700],
        }),
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800],
        ...(mode === "dark" && {
          light: red[400],
          main: red[500],
          dark: red[700],
        }),
      },
      success: {
        light: green[300],
        main: green[400],
        dark: green[800],
        ...(mode === "dark" && {
          light: green[400],
          main: green[500],
          dark: green[700],
        }),
      },
      grey: {
        ...gray,
      },
      divider: mode === "dark" ? alpha(gray[700], 0.6) : alpha(gray[300], 0.4),
      background: {
        default: "#FFFFFF",
        paper: "#F5F7FA",
        ...(mode === "dark" && {
          default: "#0F0F0F",
          paper: "#1F2937",
        }),
      },
      text: {
        primary: brand[800],
        secondary: gray[500],
        warning: orange[400],
        ...(mode === "dark" && {
          primary: "#FFFFFF",
          secondary: brand[400],
        }),
      },
      action: {
        hover: alpha(brand[200], 0.2),
        selected: alpha(brand[200], 0.3),
        ...(mode === "dark" && {
          hover: alpha(brand[400], 0.2),
          selected: alpha(brand[400], 0.3),
        }),
      },
    },
    typography: {
      fontFamily: "Roboto, Inter, sans-serif",
      h1: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      h2: {
        fontSize: defaultTheme.typography.pxToRem(36),
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(30),
        lineHeight: 1.2,
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(24),
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(20),
        fontWeight: 600,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
      },
      subtitle2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 500,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(14),
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(13),
        fontWeight: 400,
      },
      caption: {
        fontSize: defaultTheme.typography.pxToRem(12),
        fontWeight: 400,
      },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: customShadows,
  }
}

export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: brand[300],
        main: brand[500], // #2A7252
        dark: brand[700],
        contrastText: "#FFFFFF",
      },
      secondary: {
        light: secondary[300],
        main: secondary[500], // #242424
        dark: secondary[700],
        contrastText: "#FFFFFF",
      },
      info: {
        light: brand[200],
        main: brand[400],
        dark: brand[600],
        contrastText: gray[50],
      },
      warning: {
        light: orange[300],
        main: orange[400],
        dark: orange[800],
      },
      error: {
        light: red[300],
        main: red[400],
        dark: red[800],
      },
      success: {
        light: green[300],
        main: green[400],
        dark: green[800],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[300], 0.4),
      background: {
        default: "#FFFFFF",
        paper: "#F5F7FA",
      },
      text: {
        primary: brand[800],
        secondary: gray[500],
        warning: orange[400],
      },
      action: {
        hover: alpha(brand[200], 0.2),
        selected: alpha(brand[200], 0.3),
      },
      baseShadow: "none",
    },
  },
  dark: {
    palette: {
      primary: {
        contrastText: "#FFFFFF",
        light: brand[400],
        main: brand[500], // #2A7252
        dark: brand[600],
      },
      secondary: {
        contrastText: "#FFFFFF",
        light: secondary[400],
        main: secondary[500], // #242424
        dark: secondary[600],
      },
      info: {
        contrastText: brand[300],
        light: brand[500],
        main: brand[700],
        dark: brand[900],
      },
      warning: {
        light: orange[400],
        main: orange[500],
        dark: orange[700],
      },
      error: {
        light: red[400],
        main: red[500],
        dark: red[700],
      },
      success: {
        light: green[400],
        main: green[500],
        dark: green[700],
      },
      grey: {
        ...gray,
      },
      divider: alpha(gray[700], 0.6),
      background: {
        default: "#0F0F0F",
        paper: "#171717",
      },
      text: {
        primary: "#FFFFFF",
        secondary: gray[500],
      },
      action: {
        hover: alpha(brand[400], 0.2),
        selected: alpha(brand[400], 0.3),
      },
      baseShadow: "none",
    },
  },
}

export const typography = {
  fontFamily: "Roboto, Inter, sans-serif",
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(13),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
}

export const shape = {
  borderRadius: 8,
}

// @ts-expect-error - Custom shadows implementation using CSS variables for theme
const defaultShadows: Shadows = [
  "none",
  "none",
  ...defaultTheme.shadows.slice(2),
]
export const shadows = defaultShadows
