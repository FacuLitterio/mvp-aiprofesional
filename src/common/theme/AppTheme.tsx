import type { ThemeOptions } from "@mui/material/styles"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { SnackbarProvider } from "notistack"
import * as React from "react"
import { colorSchemes, shadows, shape, typography } from "./themePrimitives"

type AppThemeProps = {
  children: React.ReactNode
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme?: boolean
  themeComponents?: ThemeOptions["components"]
}

export default function AppTheme(props: AppThemeProps) {
  const { children, disableCustomTheme, themeComponents } = props
  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
          cssVariables: {
            colorSchemeSelector: "data-mui-color-scheme",
            cssVarPrefix: "template",
          },
          colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
          typography,
          shadows,
          shape,
          components: {
            ...themeComponents,
          },
        })
  }, [disableCustomTheme, themeComponents])
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange defaultMode="light">
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={3000}
      >
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  )
}
