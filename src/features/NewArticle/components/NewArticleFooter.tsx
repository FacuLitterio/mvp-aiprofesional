import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  AutoAwesome,
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  RestartAlt as RestartIcon,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  Divider,
  Menu,
  MenuItem,
  Paper,
  useTheme,
} from "@mui/material"
import { useState } from "react"
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

  // Menu states
  const [copyMenuAnchor, setCopyMenuAnchor] = useState<null | HTMLElement>(null)
  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    useState<null | HTMLElement>(null)

  const handleCopyMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCopyMenuAnchor(event.currentTarget)
  }

  const handleCopyMenuClose = () => {
    setCopyMenuAnchor(null)
  }

  const handleDownloadMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadMenuAnchor(event.currentTarget)
  }

  const handleDownloadMenuClose = () => {
    setDownloadMenuAnchor(null)
  }

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
                variant="text"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                sx={{ minWidth: 100 }}
              >
                Anterior
              </Button>
            )}
          </Box>

          {/* Right side - Action buttons */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {state.activeStep === NEW_ARTICLE_STEPS.length - 1 ? (
              <>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<CopyIcon />}
                  onClick={handleCopyMenuOpen}
                  sx={{ minWidth: 120 }}
                >
                  Copiar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadMenuOpen}
                  sx={{ minWidth: 130 }}
                >
                  Descargar
                </Button>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<RestartIcon />}
                  onClick={handleReset}
                  sx={{ minWidth: 100 }}
                >
                  Reiniciar
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => void handleNextStep()}
                disabled={!isStepValid() || state.loading}
                endIcon={
                  state.activeStep === 0 ? (
                    <AutoAwesome />
                  ) : (
                    <ArrowForwardIcon />
                  )
                }
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

      {/* Copy Menu */}
      <Menu
        anchorEl={copyMenuAnchor}
        open={Boolean(copyMenuAnchor)}
        onClose={handleCopyMenuClose}
      >
        <MenuItem
          onClick={() => {
            void copyToClipboard(generateHTML())
            handleCopyMenuClose()
          }}
        >
          Copiar HTML
        </MenuItem>
        <MenuItem
          onClick={() => {
            void copyToClipboard(generateMarkdown())
            handleCopyMenuClose()
          }}
        >
          Copiar Markdown
        </MenuItem>
      </Menu>

      {/* Download Menu */}
      <Menu
        anchorEl={downloadMenuAnchor}
        open={Boolean(downloadMenuAnchor)}
        onClose={handleDownloadMenuClose}
      >
        <MenuItem
          onClick={() => {
            downloadFile(generateHTML(), `${state.wizardState.slug}.html`)
            handleDownloadMenuClose()
          }}
        >
          Descargar HTML
        </MenuItem>
        <MenuItem
          onClick={() => {
            downloadFile(generateMarkdown(), `${state.wizardState.slug}.md`)
            handleDownloadMenuClose()
          }}
        >
          Descargar Markdown
        </MenuItem>
      </Menu>
    </Paper>
  )
}
