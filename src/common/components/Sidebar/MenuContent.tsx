import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import ViewInArIcon from "@mui/icons-material/ViewInAr"
import { Typography } from "@mui/material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import { useLocation, useNavigate } from "react-router-dom"
import CardAlert from "./CardAlert"

type MenuItem = {
  text: string
  icon: React.ReactNode
  url?: string
}

const mainListItems: MenuItem[] = [
  {
    text: "Projects",
    icon: <ViewInArIcon />,
    url: "/",
  },
  {
    text: "Team",
    icon: <GroupOutlinedIcon />,
    url: "/team",
  },
  {
    text: "Organization Settings",
    icon: <SettingsOutlinedIcon />,
    url: "/organization-settings",
  },
]

export default function MenuContent() {
  const navigate = useNavigate()
  const location = useLocation()

  const isSelected = (url?: string): boolean => {
    if (!url) return false
    if (url === "/" && location.pathname === "/") return true
    if (url !== "/" && location.pathname.startsWith(url)) return true
    return false
  }

  return (
    <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={isSelected(item.url)}
              onClick={() => {
                if (item.url) {
                  void navigate(item.url)
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 35,
                  color: isSelected(item.url)
                    ? "text.primary"
                    : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    color={
                      isSelected(item.url) ? "text.primary" : "text.secondary"
                    }
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <CardAlert />
    </Stack>
  )
}
