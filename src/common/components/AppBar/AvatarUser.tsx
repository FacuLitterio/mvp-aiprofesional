import {
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import { LOGIN_PATH } from "common/routes"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AvatarUser = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // Mock user data
  const user = {
    name: "Facundo Litterio",
    email: "flitterio@turingsoft.dev",
    role: "Redactor",
    initials: "FL",
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    // Here you would typically clear user session/tokens
    void navigate(LOGIN_PATH)
  }

  const handleProfile = () => {
    handleClose()
    // Navigate to profile page
    console.log("Navigate to profile")
  }

  const handleSettings = () => {
    handleClose()
    // Navigate to settings page
    console.log("Navigate to settings")
  }

  return (
    <>
      {/* User Avatar Button */}
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          ml: 2,
          p: 0.5,
          borderRadius: "50%",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            transform: "scale(1.05)",
          },
        }}
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          sx={{
            width: 42,
            height: 42,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: "white",
            fontWeight: 700,
            fontSize: "1rem",
            border: "3px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              border: "3px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          {user.initials}
        </Avatar>
      </IconButton>

      {/* User Menu */}
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 8,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 8px 24px rgba(0,0,0,0.15))",
              mt: 2,
              minWidth: 320,
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: -6,
                right: 20,
                width: 12,
                height: 12,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                transform: "rotate(45deg)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* User Info Section */}
        <Box sx={{ px: 3, py: 2.5 }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: "white",
                fontWeight: 700,
                fontSize: "1.2rem",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
            >
              {user.initials}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: theme.palette.text.primary,
                  mb: 0.5,
                }}
                noWrap
              >
                {user.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.85rem",
                  mb: 1,
                }}
                noWrap
              >
                {user.email}
              </Typography>
            </Box>
          </Stack>

          {/* Role Chip */}
          <Chip
            label={user.role}
            size="small"
            color="primary"
            variant="filled"
            sx={{
              fontSize: "0.75rem",
              height: 26,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: "white",
              "& .MuiChip-label": {
                px: 1.5,
              },
            }}
          />
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Menu Items */}
        <Box sx={{ py: 1 }}>
          <MenuItem
            onClick={handleProfile}
            sx={{
              py: 1.5,
              px: 3,
              mx: 1,
              borderRadius: 1,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <AccountIcon
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: 20,
                }}
              />
            </ListItemIcon>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Mi Perfil
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={handleSettings}
            sx={{
              py: 1.5,
              px: 3,
              mx: 1,
              borderRadius: 1,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsIcon
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: 20,
                }}
              />
            </ListItemIcon>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            >
              Configuración
            </Typography>
          </MenuItem>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Logout Item */}
        <Box sx={{ py: 1 }}>
          <MenuItem
            onClick={handleLogout}
            sx={{
              py: 1.5,
              px: 3,
              mx: 1,
              borderRadius: 1,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(244, 67, 54, 0.08)",
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon
                sx={{
                  color: "#f44336",
                  fontSize: 20,
                }}
              />
            </ListItemIcon>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: "#f44336",
              }}
            >
              Cerrar Sesión
            </Typography>
          </MenuItem>
        </Box>
      </Menu>
    </>
  )
}
