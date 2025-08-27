import {
  OpenInNew as ExternalLinkIcon,
  InfoOutlined as InfoIcon,
} from "@mui/icons-material"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material"
import parse from "html-react-parser"
import { useNewArticleContext } from "../../context/NewArticleContext"
import {
  calculateSEOMetrics,
  extractKeyTerms,
  parseInternalLink,
} from "../../utils"

// Componente para métricas SEO con información
const SEOMetricItem = ({
  label,
  value,
  color,
  infoText,
}: {
  label: string
  value: string
  color: "success" | "warning" | "error" | "info"
  infoText: string
}) => (
  <Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Tooltip
          title={infoText}
          arrow
          placement="top"
          sx={{
            "& .MuiTooltip-tooltip": {
              bgcolor: "rgba(0, 0, 0, 0.87)",
              color: "white",
              fontSize: "0.75rem",
              maxWidth: 300,
              p: 1.5,
              lineHeight: 1.4,
            },
          }}
        >
          <IconButton size="small" sx={{ p: 0.25 }}>
            <InfoIcon sx={{ fontSize: 16, color: "text.secondary" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Chip label={value} color={color} size="small" variant="outlined" />
    </Box>
  </Box>
)

export const PreviewExportStep = () => {
  const { state, handleRestart } = useNewArticleContext()

  // Calculate metrics and extract data
  const seoMetrics = calculateSEOMetrics(
    state.wizardState.editableTitle || "Título no disponible",
    state.wizardState.slug || "",
    state.wizardState.optimizedNews || "",
  )
  const keyTerms = extractKeyTerms(state.wizardState.optimizedNews || "")

  // Parse HTML content using html-react-parser
  const parsedContent = parse(state.wizardState.optimizedNews || "")

  // Check if we have content to preview
  const hasContent =
    state.wizardState.optimizedNews &&
    state.wizardState.optimizedNews.trim().length > 0

  if (!hasContent) {
    return (
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body1">
            No hay contenido disponible para previsualizar. Completa los pasos
            anteriores para generar el contenido optimizado.
          </Typography>
        </Alert>
        <Button variant="outlined" onClick={handleRestart}>
          Empezar de nuevo
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ mt: 3, maxWidth: "1200px", mx: "auto" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 2fr" },
          gap: 3,
          mb: 4,
        }}
      >
        {/* SEO Metrics */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Métricas SEO
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <SEOMetricItem
                label="Longitud del título"
                value={`${seoMetrics.titleLength.toString()} caracteres`}
                color={seoMetrics.isValidTitle ? "success" : "warning"}
                infoText="El título debe tener entre 35 y 65 caracteres para que aparezca completo en los resultados de búsqueda. Títulos muy cortos no describen bien el contenido, mientras que títulos muy largos se cortan y no se ven completos."
              />

              <SEOMetricItem
                label="Longitud del slug"
                value={`${seoMetrics.slugLength.toString()} caracteres`}
                color={seoMetrics.isValidSlug ? "success" : "warning"}
                infoText="El slug es la parte final de la URL que identifica tu artículo. Debe tener entre 1 y 60 caracteres, usar solo letras minúsculas, números y guiones. No debe comenzar ni terminar con guiones. Un slug descriptivo hace que la URL sea más fácil de leer y recordar."
              />

              <SEOMetricItem
                label="Densidad de palabras clave"
                value={`${seoMetrics.keywordDensity.toFixed(1)}%`}
                color={
                  seoMetrics.keywordDensity > 0 && seoMetrics.keywordDensity < 5
                    ? "success"
                    : "info"
                }
                infoText="La densidad de palabras clave indica qué tan frecuentemente aparece la palabra principal del título en el contenido. Debe estar entre 0.5% y 2.5% para que el contenido se vea natural. Una densidad muy baja significa que la palabra principal no está bien integrada en el texto, mientras que una densidad muy alta puede hacer que el texto se vea forzado."
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Términos clave detectados
              </Typography>
              <Tooltip
                title="Los términos clave son las palabras más importantes que aparecen en tu artículo. Se extraen automáticamente del contenido, excluyendo palabras comunes como 'el', 'la', 'de', etc. Estos términos te ayudan a identificar los temas principales que estás tratando en tu artículo."
                arrow
                placement="top"
                sx={{
                  "& .MuiTooltip-tooltip": {
                    bgcolor: "rgba(0, 0, 0, 0.87)",
                    color: "white",
                    fontSize: "0.75rem",
                    maxWidth: 300,
                    p: 1.5,
                    lineHeight: 1.4,
                  },
                }}
              >
                <IconButton size="small" sx={{ p: 0.25 }}>
                  <InfoIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {keyTerms.slice(0, 8).map((term, index) => (
                <Chip
                  key={index}
                  label={term}
                  color="info"
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.75rem" }}
                />
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Enlaces internos
              </Typography>
              <Tooltip
                title="Los enlaces internos son enlaces que conectan tu artículo con otras páginas relacionadas. Estos enlaces ayudan a los lectores a encontrar más información sobre temas relacionados y mejoran la navegación en tu sitio web. Se muestran como enlaces clickeables que abren en nueva pestaña."
                arrow
                placement="top"
                sx={{
                  "& .MuiTooltip-tooltip": {
                    bgcolor: "rgba(0, 0, 0, 0.87)",
                    color: "white",
                    fontSize: "0.75rem",
                    maxWidth: 300,
                    p: 1.5,
                    lineHeight: 1.4,
                  },
                }}
              >
                <IconButton size="small" sx={{ p: 0.25 }}>
                  <InfoIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {state.wizardState.internalLinks.length > 0 ? (
                state.wizardState.internalLinks.map((link, index) => {
                  const { url, text: linkText } = parseInternalLink(link)

                  return (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <ExternalLinkIcon
                        sx={{ fontSize: 16, color: "primary.main" }}
                      />
                      <Typography
                        variant="body2"
                        component="a"
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "primary.main",
                          textDecoration: "underline",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "none",
                          },
                        }}
                      >
                        {linkText}
                      </Typography>
                    </Box>
                  )
                })
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay enlaces internos
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Article Preview */}
        <Card>
          <CardContent>
            <Box sx={{ mb: 3, pb: 2, borderBottom: 1, borderColor: "divider" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Chip label={state.wizardState.category} color="info" />
                <Typography variant="body2" color="text.secondary">
                  /{state.wizardState.slug}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                "& h1": {
                  fontSize: "2rem",
                  fontWeight: 700,
                  mb: 2,
                  lineHeight: 1.2,
                },
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: 700, mb: 3, lineHeight: 1.2 }}
              >
                {state.wizardState.editableTitle}
              </Typography>

              {/* Render the HTML content using html-react-parser */}
              <Box
                sx={{
                  color: "text.primary",
                  lineHeight: 1.6,
                  "& p": { mb: 2 },
                  "& strong": { fontWeight: 600 },
                  "& h2": {
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    mt: 3,
                    mb: 2,
                  },
                  "& ul": { mb: 2, pl: 3 },
                  "& li": { mb: 1 },
                  "& a": {
                    color: "primary.main",
                    textDecoration: "underline",
                    "&:hover": {
                      textDecoration: "none",
                    },
                  },
                }}
              >
                {parsedContent}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
