import { Box } from "@mui/material"
import { AIStatusAlert } from "../../common/components/Layout/AIStatusAlert"
import { LoadingBackdrop } from "../../common/components/Layout/LoadingBackdrop"
import { NewArticleContent } from "./components/NewArticleContent"
import { NewArticleFooter } from "./components/NewArticleFooter"
import { NewArticleHeader } from "./components/NewArticleHeader"
import {
  NewArticleProvider,
  useNewArticleContext,
} from "./context/NewArticleContext"

const NewArticleContentWithProviders = () => {
  const { state } = useNewArticleContext()

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NewArticleHeader />

      {/* AI Status Alerts */}
      <AIStatusAlert
        showError={state.showError}
        error={null}
        step={state.wizardState.step}
      />

      <NewArticleContent />
      <NewArticleFooter />

      {/* Loading Backdrop */}
      <LoadingBackdrop
        open={state.loading}
        message="Generando contenido con IA..."
      />
    </Box>
  )
}

const NewArticle = () => {
  return (
    <NewArticleProvider>
      <NewArticleContentWithProviders />
    </NewArticleProvider>
  )
}

export default NewArticle
