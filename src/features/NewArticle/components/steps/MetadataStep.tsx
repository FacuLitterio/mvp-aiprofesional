import {
  Alert,
  Autocomplete,
  Box,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  FormGroup,
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
  const { state, updateMetadata, updateWizardCategory } = useNewArticleContext()

  const handleSectionChange = (section: string, isSecondary = false) => {
    console.log("handleSectionChange called:", { section, isSecondary })

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
      // Update wizardState directly for the category
      console.log("Updating wizard category to:", section)
      updateWizardCategory(section)
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: 2, md: 3 },
        }}
      >
        {/* Slug */}
        <Card sx={{ height: "fit-content" }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Slug de la URL
            </Typography>

            <TextField
              fullWidth
              value={state.metadata.slug}
              onChange={e => {
                updateMetadata({ slug: e.target.value })
              }}
              placeholder="presunta-infidelidad-separacion-vazquez-accardi"
              sx={{ mb: 2 }}
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
            <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
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
                p: { xs: 1.5, md: 2 },
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
        <Card sx={{ height: "fit-content" }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Secciones / Categorías
            </Typography>

            <Autocomplete
              freeSolo
              options={AVAILABLE_SECTIONS}
              value={state.wizardState.category}
              sx={{ mb: 3 }}
              onChange={(_, newValue) => {
                handleSectionChange(newValue ?? "")
              }}
              onInputChange={(_, newInputValue) => {
                // This handles the case when user types custom text
                if (newInputValue !== state.wizardState.category) {
                  handleSectionChange(newInputValue)
                }
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Sección Principal"
                  placeholder="Selecciona o escribe una categoría"
                />
              )}
            />

            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
              Secciones Secundarias
            </Typography>
            <FormGroup>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: { xs: 0.5, sm: 1 },
                }}
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
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      "& .MuiFormControlLabel-label": {
                        fontSize: "inherit",
                      },
                    }}
                  />
                ))}
              </Box>
            </FormGroup>
          </CardContent>
        </Card>
      </Box>

      {/* Current Configuration Alert */}
      <Box sx={{ mt: { xs: 2, md: 3 } }}>
        <Alert
          severity="info"
          sx={{
            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, mb: { xs: 1.5, md: 2 }, color: "info.main" }}
          >
            Configuración actual:
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 0.5, md: 1 },
            }}
          >
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
                {state.wizardState.category || "No seleccionada"}
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
