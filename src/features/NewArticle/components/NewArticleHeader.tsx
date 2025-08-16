import { AppBar, Toolbar, Typography } from "@mui/material"

export const NewArticleHeader = () => {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Generar Noticia SEO
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
