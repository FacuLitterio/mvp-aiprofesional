import { AppBar, Toolbar } from "@mui/material"
import { AvatarUser, Breadcrumb } from "common/components/AppBar"
import { ROOT_PATH } from "common/routes"
import { useAppDispatch } from "common/store/hooks"
import {
  replaceNodesBreadcrumb,
  type BreadcrumbNode,
} from "common/store/slices/breadcrumb-slice"
import React from "react"
import { NEW_ARTICLE_STEPS } from "../constants/steps"
import { useNewArticleContext } from "../context/NewArticleContext"

export const NewArticleHeader = () => {
  const dispatch = useAppDispatch()
  const { state } = useNewArticleContext()

  // Update breadcrumb when step changes
  React.useEffect(() => {
    const currentStepTitle = NEW_ARTICLE_STEPS[state.activeStep]

    const newBreadcrumbNodes: BreadcrumbNode[] = [
      { text: "AiProfesional", url: ROOT_PATH },
      { text: "Generador de Noticias con IA" },
      { text: currentStepTitle },
    ]

    dispatch(replaceNodesBreadcrumb(newBreadcrumbNodes))
  }, [state.activeStep, dispatch])

  return (
    <AppBar position="sticky" elevation={0} color="secondary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Breadcrumb />
        <AvatarUser />
      </Toolbar>
    </AppBar>
  )
}
