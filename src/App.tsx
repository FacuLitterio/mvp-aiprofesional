import { Box } from "@mui/material"
import type {} from "@mui/x-charts/themeAugmentation"
import type {} from "@mui/x-data-grid-pro/themeAugmentation"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import type {} from "@mui/x-tree-view/themeAugmentation"
import { Outlet } from "react-router"

const Root = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Outlet />
    </Box>
  )
}

export default Root
