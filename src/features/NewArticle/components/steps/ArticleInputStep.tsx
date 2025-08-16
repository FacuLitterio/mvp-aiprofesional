import { Box, TextField, Typography } from "@mui/material"
import { useNewArticleContext } from "../../context/NewArticleContext"

export const ArticleInputStep = () => {
  const { state, setArticleContent } = useNewArticleContext()

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Contenido Fuente
      </Typography>
      <TextField
        multiline
        rows={12}
        fullWidth
        value={state.articleContent}
        onChange={e => {
          setArticleContent(e.target.value)
        }}
        placeholder="Pega tu contenido de artículo aquí..."
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.paper",
          },
        }}
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1, display: "block" }}
      >
        Mínimo 50 caracteres, máximo 20,000.
      </Typography>
    </Box>
  )
}
