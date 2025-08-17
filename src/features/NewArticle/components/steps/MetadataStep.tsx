import {
  Add as AddIcon,
  AutoAwesome as AutoAwesomeIcon,
  Close as CloseIcon,
} from "@mui/icons-material"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useNewArticleContext } from "../../context/NewArticleContext"

const AVAILABLE_SECTIONS = [
  "Finanzas",
  "Economía",
  "Política",
  "Autos",
  "Tecnología",
  "Mercado",
  "Negocios",
  "Empleo",
  "Propiedades",
  "Salud",
]

export const MetadataStep = () => {
  const { state, updateMetadata, regenerateMetadata } = useNewArticleContext()
  const [newKeyword, setNewKeyword] = useState("")
  const [newSubtitle, setNewSubtitle] = useState("")

  const handleAddKeyword = () => {
    if (
      newKeyword.trim() &&
      !state.metadata.keywords.includes(newKeyword.trim())
    ) {
      updateMetadata({
        keywords: [...state.metadata.keywords, newKeyword.trim()],
      })
      setNewKeyword("")
    }
  }

  const handleRemoveKeyword = (keywordToRemove: string) => {
    updateMetadata({
      keywords: state.metadata.keywords.filter(k => k !== keywordToRemove),
    })
  }

  const handleAddSubtitle = () => {
    if (
      newSubtitle.trim() &&
      !state.metadata.subtitles.includes(newSubtitle.trim())
    ) {
      updateMetadata({
        subtitles: [...state.metadata.subtitles, newSubtitle.trim()],
      })
      setNewSubtitle("")
    }
  }

  const handleRemoveSubtitle = (subtitleToRemove: string) => {
    updateMetadata({
      subtitles: state.metadata.subtitles.filter(s => s !== subtitleToRemove),
    })
  }

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

  const copeteCharCount = state.metadata.copete.length
  const volantaCharCount = state.metadata.volanta.length
  const metaDescriptionCharCount = state.metadata.metaDescription.length

  return (
    <Box sx={{ mt: 3 }}>
      {/* Header */}
      <Box>
        {/* Regenerate Button */}
        <Button
          variant="outlined"
          onClick={regenerateMetadata}
          sx={{ mb: 3 }}
          startIcon={<AutoAwesomeIcon />}
        >
          Regenerar Metadatos
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Copete */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Copete (Resumen/Lead)
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 2 }}
            >
              Párrafo introductorio optimizado para enganchar al lector y SEO
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={3}
              value={state.metadata.copete}
              onChange={e => {
                updateMetadata({ copete: e.target.value })
              }}
              placeholder="Escribe el copete del artículo..."
              sx={{ mb: 1 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {copeteCharCount}/155 caracteres
              </Typography>
              {copeteCharCount > 155 && (
                <Alert severity="warning" sx={{ py: 0, px: 1 }}>
                  Excede el límite recomendado
                </Alert>
              )}
            </Box>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Tip:</strong> Debe ser conciso (127-155 caracteres) para
                aparecer en home y búsquedas; incluye keywords principales.
              </Typography>
            </Alert>
          </CardContent>
        </Card>

        {/* Volanta */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Volanta (Subtítulo/Epígrafe)
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 2 }}
            >
              Frase impactante o contextual arriba del título principal
            </Typography>

            <TextField
              fullWidth
              value={state.metadata.volanta}
              onChange={e => {
                updateMetadata({ volanta: e.target.value })
              }}
              placeholder="Escribe la volanta..."
              sx={{ mb: 1 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {volantaCharCount}/25 caracteres
              </Typography>
              {volantaCharCount > 25 && (
                <Alert severity="warning" sx={{ py: 0, px: 1 }}>
                  Excede el límite
                </Alert>
              )}
            </Box>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Tip:</strong> Usa para destacar el gancho; opcional,
                pero mejora clics en redes.
              </Typography>
            </Alert>
          </CardContent>
        </Card>

        {/* Keywords */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Palabras Clave / Tags SEO
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 2 }}
            >
              Keywords para optimizar búsquedas y meta tags
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={newKeyword}
                onChange={e => {
                  setNewKeyword(e.target.value)
                }}
                placeholder="Agregar keyword..."
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleAddKeyword()
                  }
                }}
              />
              <IconButton onClick={handleAddKeyword} color="primary">
                <AddIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {state.metadata.keywords.map((keyword, index) => (
                <Chip
                  key={index}
                  label={keyword}
                  onDelete={() => {
                    handleRemoveKeyword(keyword)
                  }}
                  deleteIcon={<CloseIcon />}
                  size="small"
                />
              ))}
            </Box>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Tip:</strong> Estas se usan para optimizar búsquedas;
                agrégalas al final del Copete o en meta tags del CMS.
              </Typography>
            </Alert>
          </CardContent>
        </Card>

        {/* Sections */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Secciones / Categorías
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 2 }}
            >
              Categorización para el sitio de IProfesional
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
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

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Tip:</strong> Selecciona al menos una principal; esto
                categoriza la nota en el sitio de IProfesional.
              </Typography>
            </Alert>
          </CardContent>
        </Card>

        {/* Slug */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Slug (URL Amigable)
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 2 }}
            >
              URL optimizada para SEO generada del título principal
            </Typography>

            <TextField
              fullWidth
              value={state.metadata.slug}
              onChange={e => {
                updateMetadata({ slug: e.target.value })
              }}
              placeholder="toyota-rav-4-suv-mas-vendido-2025"
              sx={{ mb: 2 }}
            />

            <Alert severity="info">
              <Typography variant="body2">
                <strong>Tip:</strong> Debe ser corto y con guiones; cópialo
                directamente al campo Slug del CMS para SEO.
              </Typography>
            </Alert>
          </CardContent>
        </Card>

        {/* Meta Description */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Meta Descripción
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 2 }}
            >
              Descripción que aparece en resultados de Google
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={3}
              value={state.metadata.metaDescription}
              onChange={e => {
                updateMetadata({ metaDescription: e.target.value })
              }}
              placeholder="Escribe la meta descripción..."
              sx={{ mb: 1 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {metaDescriptionCharCount}/160 caracteres
              </Typography>
              {metaDescriptionCharCount > 160 && (
                <Alert severity="warning" sx={{ py: 0, px: 1 }}>
                  Excede el límite recomendado
                </Alert>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Subtitles */}
        <Card sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Subtítulos (H2 Internos)
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 2 }}
            >
              Sugerencias para estructurar el cuerpo del artículo
            </Typography>

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                size="small"
                value={newSubtitle}
                onChange={e => {
                  setNewSubtitle(e.target.value)
                }}
                placeholder="Agregar subtítulo..."
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    handleAddSubtitle()
                  }
                }}
              />
              <IconButton onClick={handleAddSubtitle} color="primary">
                <AddIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {state.metadata.subtitles.map((subtitle, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {index + 1}. {subtitle}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => {
                      handleRemoveSubtitle(subtitle)
                    }}
                    color="error"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Tip:</strong> Usa estos subtítulos para estructurar el
                contenido del artículo en el editor del CMS.
              </Typography>
            </Alert>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
