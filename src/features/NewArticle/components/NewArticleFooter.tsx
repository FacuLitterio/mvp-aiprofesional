import { AutoAwesome } from "@mui/icons-material"
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
            justifyContent:
              state.activeStep === 0 ? "flex-end" : "space-between",
            alignItems: "center",
            py: 2,
            gap: 2,
          }}
        >
          {state.activeStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outlined"
              sx={{ minWidth: 100 }}
            >
              Anterior
            </Button>
          )}

          <Box sx={{ display: "flex", gap: 1 }}>
            {state.activeStep === NEW_ARTICLE_STEPS.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleReset}
                sx={{ minWidth: 100 }}
              >
                Reiniciar
              </Button>
            ) : (
              <Button
                variant="contained"
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
