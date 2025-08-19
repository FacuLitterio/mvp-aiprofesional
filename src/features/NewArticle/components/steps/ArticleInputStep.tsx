import { AutoAwesome } from "@mui/icons-material"
import { Alert, Box, TextField, Typography } from "@mui/material"
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
        Mínimo 100 caracteres, máximo 20,000.
      </Typography>

      <Alert severity="info" icon={<AutoAwesome />} sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>
          ¿Qué hará la IA?
        </Typography>
        <Box component="ul" sx={{ pl: 0, listStyle: "none", m: 0 }}>
          <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
            • Generará 4 títulos optimizados para SEO
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
            • Sugerirá un slug y categoría apropiados
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
            • Optimizará el contenido con negritas y subtítulos
          </Typography>
          <Typography component="li" variant="body2">
            • Propondrá enlaces internos relevantes
          </Typography>
        </Box>
      </Alert>
    </Box>
  )
}
