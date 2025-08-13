import { CssBaseline } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { store } from "common/store/store"
import ThemeProvider from "common/theme/AppTheme"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router"
import router from "router"
import "./index.css"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <Provider store={store}>
          <ThemeProvider>
            <CssBaseline enableColorScheme />
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </LocalizationProvider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
