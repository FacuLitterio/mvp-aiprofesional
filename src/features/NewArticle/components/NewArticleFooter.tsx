import {
  AutoAwesome,
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
} from "@mui/icons-material"
import { Box, Button, Container, Paper, useTheme } from "@mui/material"
import { NEW_ARTICLE_STEPS } from "../constants/steps"
import { useNewArticleContext } from "../context/NewArticleContext"

export const NewArticleFooter = () => {
  const theme = useTheme()
  const {
    state,
    handleNext,
    handleBack,
    handleReset,
    isStepValid,
    handleStep0Submit,
    handleStep1Next,
    copyToClipboard,
    downloadFile,
    generateHTML,
    generateMarkdown,
  } = useNewArticleContext()

  const handleNextStep = async () => {
    if (state.activeStep === 0) {
      // For step 0, generate content with AI
      await handleStep0Submit(state.articleContent)
    } else if (state.activeStep === 1) {
      // For step 1, advance to next step if title is selected
      handleStep1Next()
    } else {
      // For other steps, just go to next
      handleNext()
    }
  }

  return (
    <Paper
      elevation={2}
      sx={{
        position: "sticky",
        bottom: 0,
        zIndex: 1000,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
            gap: 2,
          }}
        >
          {/* Left side - Navigation buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {state.activeStep > 0 && (
              <Button
                onClick={handleBack}
                variant="outlined"
                color="primary"
                sx={{ minWidth: 100 }}
              >
                Anterior
              </Button>
            )}
          </Box>

          {/* Center - Export buttons (only on final step) */}
          {state.activeStep === NEW_ARTICLE_STEPS.length - 1 && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="info"
                startIcon={<CopyIcon />}
                onClick={() => {
                  void copyToClipboard(generateHTML())
                }}
                sx={{ minWidth: 120 }}
              >
                Copiar HTML
              </Button>
              <Button
                variant="outlined"
                color="info"
                startIcon={<CopyIcon />}
                onClick={() => {
                  void copyToClipboard(generateMarkdown())
                }}
                sx={{ minWidth: 140 }}
              >
                Copiar Markdown
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DownloadIcon />}
                onClick={() => {
                  downloadFile(generateHTML(), `${state.wizardState.slug}.html`)
                }}
                sx={{ minWidth: 130 }}
              >
                Descargar HTML
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DownloadIcon />}
                onClick={() => {
                  downloadFile(
                    generateMarkdown(),
                    `${state.wizardState.slug}.md`,
                  )
                }}
                sx={{ minWidth: 150 }}
              >
                Descargar Markdown
              </Button>
            </Box>
          )}

          {/* Right side - Action buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {state.activeStep === NEW_ARTICLE_STEPS.length - 1 ? (
              <Button
                variant="contained"
                color="warning"
                onClick={handleReset}
                sx={{ minWidth: 100 }}
              >
                Reiniciar
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => void handleNextStep()}
                disabled={!isStepValid() || state.loading}
                startIcon={state.activeStep === 0 ? <AutoAwesome /> : undefined}
                sx={{ minWidth: 100 }}
              >
                {state.loading && state.activeStep === 0
                  ? "Generando..."
                  : state.activeStep === 0
                    ? "Generar Contenido"
                    : "Siguiente"}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Paper>
  )
}
