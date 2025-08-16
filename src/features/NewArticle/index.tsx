import { Box } from "@mui/material"
import { NewArticleContent } from "./components/NewArticleContent"
import { NewArticleFooter } from "./components/NewArticleFooter"
import { NewArticleHeader } from "./components/NewArticleHeader"
import { NewArticleProvider } from "./context/NewArticleContext"

const NewArticle = () => {
  return (
    <NewArticleProvider>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <NewArticleHeader />
        <NewArticleContent />
        <NewArticleFooter />
      </Box>
    </NewArticleProvider>
  )
}

export default NewArticle
