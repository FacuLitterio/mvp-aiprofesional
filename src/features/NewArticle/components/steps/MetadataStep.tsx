import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { useNewArticleContext } from "../../context/NewArticleContext"

const AVAILABLE_SECTIONS = [
  "General",
  "Tecnología",
  "Economía",
  "Política",
  "Deportes",
  "Salud",
  "Educación",
  "Cultura",
  "Ciencia",
  "Internacional",
  "Finanzas",
  "Autos",
  "Mercado",
  "Negocios",
  "Empleo",
  "Propiedades",
]

export const MetadataStep = () => {
  const { state, updateMetadata } = useNewArticleContext()

  const handleSectionChange = (section: string, isSecondary = false) => {
    if (isSecondary) {
      const newSecundarias = state.metadata.sections.secundarias.includes(
        section,
      )
        ? state.metadata.sections.secundarias.filter(s => s !== section)
        : [...state.metadata.sections.secundarias, section]

      updateMetadata({
        sections: {
          ...state.metadata.sections,
          secundarias: newSecundarias,
        },
      })
    } else {
      updateMetadata({
        sections: {
          ...state.metadata.sections,
          principal: section,
        },
      })
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Slug */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Slug de la URL
            </Typography>

            <TextField
              fullWidth
              value={state.metadata.slug}
              onChange={e => {
                updateMetadata({ slug: e.target.value })
              }}
              placeholder="presunta-infidelidad-separacion-vazquez-accardi"
              sx={{ mb: 1 }}
            />

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 2 }}
            >
              Solo minúsculas, números y guiones. Máximo 60 caracteres.
            </Typography>

            {/* Validation chips */}
            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              <Chip
                label={`${state.metadata.slug.length.toString()}/60 caracteres`}
                color={state.metadata.slug.length > 60 ? "error" : "default"}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: "0.7rem",
                  height: 20,
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
              {state.metadata.slug.length > 0 &&
                (/^[a-z0-9-]+$/.test(state.metadata.slug) ? (
                  <Chip
                    label="Formato Válido"
                    color="info"
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      height: 20,
                      "& .MuiChip-label": {
                        px: 1,
                      },
                    }}
                  />
                ) : (
                  <Chip
                    label="Formato Inválido"
                    color="error"
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      height: 20,
                      "& .MuiChip-label": {
                        px: 1,
                      },
                    }}
                  />
                ))}
            </Box>

            {/* URL Preview */}
            <Box
              sx={{
                p: 2,
                bgcolor: "grey.50",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                Vista previa URL:
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                }}
              >
                https://ejemplo.com/noticias/
                {state.metadata.slug || "slug-ejemplo"}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Sections */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Secciones / Categorías
            </Typography>

            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel>Sección Principal</InputLabel>
              <Select
                value={state.metadata.sections.principal}
                onChange={e => {
                  handleSectionChange(e.target.value)
                }}
                label="Sección Principal"
              >
                {AVAILABLE_SECTIONS.map(section => (
                  <MenuItem key={section} value={section}>
                    {section}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Secciones Secundarias
            </Typography>
            <FormGroup>
              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}
              >
                {AVAILABLE_SECTIONS.map(section => (
                  <FormControlLabel
                    key={section}
                    control={
                      <input
                        type="checkbox"
                        checked={state.metadata.sections.secundarias.includes(
                          section,
                        )}
                        onChange={() => {
                          handleSectionChange(section, true)
                        }}
                      />
                    }
                    label={section}
                    sx={{ fontSize: "0.875rem" }}
                  />
                ))}
              </Box>
            </FormGroup>
          </CardContent>
        </Card>
      </Box>

      {/* Current Configuration Alert */}
      <Box sx={{ mt: 3 }}>
        <Alert
          severity="info"
          sx={{
            backgroundColor: "info.50",
            border: "1px solid",
            borderColor: "info.200",
            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: 2, color: "info.main" }}
          >
            Configuración actual:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "info.main", minWidth: 80 }}
              >
                Slug:
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontFamily: "monospace" }}
              >
                {state.metadata.slug || "No configurado"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "info.main", minWidth: 80 }}
              >
                Categoría:
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {state.metadata.sections.principal || "No seleccionada"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "info.main", minWidth: 80 }}
              >
                URL completa:
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontFamily: "monospace" }}
              >
                /noticias/{state.metadata.slug || "slug-ejemplo"}
              </Typography>
            </Box>
          </Box>
        </Alert>
      </Box>
    </Box>
  )
}
