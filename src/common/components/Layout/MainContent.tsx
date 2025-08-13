import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { alpha } from "@mui/material/styles"
import type {} from "@mui/x-charts/themeAugmentation"
import type {} from "@mui/x-data-grid-pro/themeAugmentation"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import type {} from "@mui/x-tree-view/themeAugmentation"
import { Outlet } from "react-router"

const MainContent: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Main content */}
      <Box
        component="main"
        sx={theme => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: "auto",
        })}
      >
        <Stack
          spacing={3}
          sx={{
            height: "100%",
            alignItems: "center",
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              maxWidth: { sm: "100%", md: "1700px" },
            }}
          >
            <Outlet />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default MainContent
