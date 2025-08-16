import { Box, Button, Container, Paper, useTheme } from "@mui/material"
import { NEW_ARTICLE_STEPS } from "../constants/steps"
import { useNewArticleContext } from "../context/NewArticleContext"

export const NewArticleFooter = () => {
  const theme = useTheme()
  const { state, handleNext, handleBack, handleReset, isStepValid } =
    useNewArticleContext()

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
                onClick={handleNext}
                disabled={!isStepValid()}
                sx={{ minWidth: 100 }}
              >
                Siguiente
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </Paper>
  )
}
