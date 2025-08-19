import { Box, Breadcrumbs, Link, Typography } from "@mui/material"
import AIProfesionalLogo from "common/assets/AIProfesional-Logo.svg"
import { useAppSelector } from "common/store/hooks"
import React from "react"
import { useNavigate } from "react-router-dom"

export const Breadcrumb = () => {
  const navigate = useNavigate()
  const breadcrumbNodes = useAppSelector(state => state.common.breadcrumb.nodes)

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        color: "white",
        "& .MuiBreadcrumbs-separator": {
          color: "white",
        },
      }}
    >
      {breadcrumbNodes.map((node, index: number) => (
        <React.Fragment key={index}>
          {index === 0 && node.url ? (
            <Link
              component="button"
              variant="body2"
              onClick={() => void navigate(node.url ?? "/")}
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
              <Box
                component="img"
                src={AIProfesionalLogo}
                alt="AIProfesional Logo"
                sx={{
                  width: 120,
                  height: "auto",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.7,
                  transition: "opacity 0.2s ease-in-out",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              />
            </Link>
          ) : (
            <Typography
              variant="body2"
              sx={{
                color:
                  index === breadcrumbNodes.length - 1
                    ? "white"
                    : "rgba(255, 255, 255, 0.7)",
                fontWeight: index === breadcrumbNodes.length - 1 ? 600 : 400,
              }}
            >
              {node.text}
            </Typography>
          )}
        </React.Fragment>
      ))}
    </Breadcrumbs>
  )
}
