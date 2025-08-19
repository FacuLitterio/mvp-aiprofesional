import { AppBar as MuiAppBar, Toolbar } from "@mui/material"
import { AvatarUser } from "./AvatarUser"
import { Breadcrumb } from "./Breadcrumb"

export const AppBar = () => {
  return (
    <MuiAppBar position="sticky" elevation={0} color="transparent">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Breadcrumb />
        <AvatarUser />
      </Toolbar>
    </MuiAppBar>
  )
}
