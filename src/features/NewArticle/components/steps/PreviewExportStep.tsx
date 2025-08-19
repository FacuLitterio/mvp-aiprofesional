import { OpenInNew as ExternalLinkIcon } from "@mui/icons-material"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material"
import { useNewArticleContext } from "../../context/NewArticleContext"
import {
  calculateSEOMetrics,
  extractKeyTerms,
  generateSubtitles,
} from "../../utils"

export const PreviewExportStep = () => {
  const { state, handleRestart } = useNewArticleContext()

  // Calculate metrics and extract data
  const seoMetrics = calculateSEOMetrics(
    state.wizardState.editableTitle || "Título no disponible",
    state.wizardState.slug || "",
    state.wizardState.optimizedNews || "",
  )
  const keyTerms = extractKeyTerms(state.wizardState.optimizedNews || "")
  const subtitles = generateSubtitles(state.wizardState.optimizedNews || "")

  // Sanitize content for display (basic sanitization)
  const sanitizedContent = (state.wizardState.optimizedNews || "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")

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
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Longitud del título
                  </Typography>
                  <Chip
                    label={`${seoMetrics.titleLength.toString()} caracteres`}
                    color={seoMetrics.isValidTitle ? "success" : "warning"}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Longitud del slug
                  </Typography>
                  <Chip
                    label={`${seoMetrics.slugLength.toString()} caracteres`}
                    color={seoMetrics.isValidSlug ? "success" : "warning"}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Densidad de palabras clave
                  </Typography>
                  <Chip
                    label={`${seoMetrics.keywordDensity.toFixed(1)}%`}
                    color={
                      seoMetrics.keywordDensity > 0 &&
                      seoMetrics.keywordDensity < 5
                        ? "success"
                        : "info"
                    }
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Términos clave detectados
            </Typography>
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

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Enlaces internos sugeridos
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {state.wizardState.internalLinks.length > 0 ? (
                state.wizardState.internalLinks.map((link, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <ExternalLinkIcon
                      sx={{ fontSize: 16, color: "primary.main" }}
                    />
                    <Typography variant="body2" color="primary.main">
                      {link}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No hay enlaces sugeridos
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

              {subtitles.map((subtitle, index) => (
                <Typography
                  key={index}
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    mt: 3,
                    mb: 2,
                    color: "text.primary",
                  }}
                >
                  {subtitle}
                </Typography>
              ))}

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
                }}
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
