import { Home as HomeIcon } from "@mui/icons-material"
import { AppBar, Breadcrumbs, Link, Toolbar, Typography } from "@mui/material"
import { ROOT_PATH } from "common/routes"
import { useAppDispatch, useAppSelector } from "common/store/hooks"
import {
  replaceNodesBreadcrumb,
  type BreadcrumbNode,
} from "common/store/slices/breadcrumb-slice"
import React from "react"
import { useNavigate } from "react-router-dom"
import { NEW_ARTICLE_STEPS } from "../constants/steps"
import { useNewArticleContext } from "../context/NewArticleContext"

export const NewArticleHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { state } = useNewArticleContext()
  const breadcrumbNodes = useAppSelector(state => state.common.breadcrumb.nodes)

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
      <Toolbar>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            color: "white",
            "& .MuiBreadcrumbs-separator": {
              color: "white",
            },
          }}
        >
          {breadcrumbNodes.map((node: BreadcrumbNode, index: number) => (
            <React.Fragment key={index}>
              {index === 0 && node.url ? (
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => void navigate(node.url ?? ROOT_PATH)}
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    "&:hover": {
                      color: "white",
                      textDecoration: "underline",
                    },
                  }}
                >
                  <HomeIcon fontSize="small" />
                  {node.text}
                </Link>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      index === breadcrumbNodes.length - 1
                        ? "white"
                        : "rgba(255, 255, 255, 0.7)",
                    fontWeight:
                      index === breadcrumbNodes.length - 1 ? 600 : 400,
                  }}
                >
                  {node.text}
                </Typography>
              )}
            </React.Fragment>
          ))}
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  )
}
