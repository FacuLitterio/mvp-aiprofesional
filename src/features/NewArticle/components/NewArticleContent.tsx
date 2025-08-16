import {
  Box,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { NEW_ARTICLE_STEPS, STEP_CONTENT } from "../constants/steps"
import { useNewArticleContext } from "../context/NewArticleContext"
import { ArticleInputStep } from "./steps/ArticleInputStep"
import { MetadataStep } from "./steps/MetadataStep"
import { PreviewExportStep } from "./steps/PreviewExportStep"
import { TitlesStep } from "./steps/TitlesStep"

export const NewArticleContent = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { state } = useNewArticleContext()
  const currentStepContent = STEP_CONTENT[state.activeStep]

  const renderStepContent = () => {
    switch (state.activeStep) {
      case 0:
        return <ArticleInputStep />
      case 1:
        return <TitlesStep />
      case 2:
        return <MetadataStep />
      case 3:
        return <PreviewExportStep />
      default:
        return null
    }
  }

  return (
    <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
      {/* Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper
          activeStep={state.activeStep}
          orientation={isMobile ? "vertical" : "horizontal"}
          sx={{
            "& .MuiStepLabel-root .Mui-completed": {
              color: theme.palette.primary.main,
            },
            "& .MuiStepLabel-root .Mui-active": {
              color: theme.palette.primary.main,
            },
            "& .MuiStepLabel-root .Mui-disabled": {
              color: theme.palette.text.disabled,
            },
            "& .MuiStepLabel-label": {
              fontSize: isMobile ? "0.8rem" : "0.875rem",
              fontWeight: 500,
            },
            "& .MuiStepConnector-line": {
              minHeight: isMobile ? "20px" : "auto",
            },
          }}
        >
          {NEW_ARTICLE_STEPS.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Main Content */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, md: 4 },
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box sx={{ minHeight: "400px" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {currentStepContent.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {currentStepContent.description}
          </Typography>
          {renderStepContent()}
        </Box>
      </Paper>
    </Container>
  )
}
