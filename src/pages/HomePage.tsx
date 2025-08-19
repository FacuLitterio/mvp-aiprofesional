import { Article, AutoAwesome, Image, NavigateNext } from "@mui/icons-material"
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import AIProfesionalAvatar from "common/assets/AIProfesionalAvatar.png"
import { AppBar } from "common/components/AppBar"
import { NEW_PATH, ROOT_PATH } from "common/routes"
import { useAppDispatch } from "common/store/hooks"
import { replaceNodesBreadcrumb } from "common/store/slices/breadcrumb-slice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const HomePage = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isHovered, setIsHovered] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  // Set breadcrumb for home page
  useEffect(() => {
    dispatch(
      replaceNodesBreadcrumb([{ text: "AiProfesional", url: ROOT_PATH }]),
    )
  }, [dispatch])

  const handleGenerateNews = () => {
    void navigate(NEW_PATH)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AppBar />
      {/* Main Content */}
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Stack spacing={2} alignItems="center">
          {/* Welcome Section */}
          <Box textAlign="center">
            {/* AI Avatar */}
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                mb: 2,
              }}
            >
              <Box
                component="img"
                src={AIProfesionalAvatar}
                alt="AIProfesional Avatar"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "3px solid rgba(255,255,255,0.2)",
                  background: theme.palette.background.paper,
                  backdropFilter: "blur(10px)",
                  mb: 2,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease",
                  },
                }}
              />

              {/* Sparkle effect */}
              <Box
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  animation: "sparkle 2s infinite",
                  "@keyframes sparkle": {
                    "0%, 100%": { opacity: 0, transform: "scale(0)" },
                    "50%": { opacity: 1, transform: "scale(1)" },
                  },
                }}
              >
                <AutoAwesome
                  sx={{
                    color: theme.palette.warning.main,
                    fontSize: 24,
                  }}
                />
              </Box>
            </Box>

            {/* Greeting */}
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 700,
                mb: 2,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                fontSize: { xs: "2rem", sm: "2.5rem" },
              }}
            >
              ¡Hola, soy AiProfesional!
            </Typography>

            {/* Description */}
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontWeight: 400,
                mb: 3,
                lineHeight: 1.5,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              Soy una IA especializada en crear contenido periodístico
              optimizado para SEO que te ayudará a simplificar tu trabajo.
            </Typography>

            {/* Call to Action */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <AutoAwesome
                sx={{
                  color: theme.palette.warning.main,
                  fontSize: 20,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                }}
              >
                ¿Con qué te ayudo hoy?
              </Typography>
              <AutoAwesome
                sx={{
                  color: theme.palette.warning.main,
                  fontSize: 20,
                }}
              />
            </Box>
          </Box>

          {/* Feature Card */}
          <Card
            onMouseEnter={() => {
              setIsHovered(true)
            }}
            onMouseLeave={() => {
              setIsHovered(false)
            }}
            onClick={handleGenerateNews}
            sx={{
              width: "100%",
              maxWidth: 650,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: isHovered ? "translateY(-4px)" : "translateY(0)",
              boxShadow: isHovered
                ? "0 8px 32px rgba(0,0,0,0.3)"
                : "0 4px 16px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Article
                      sx={{
                        color: "white",
                        fontSize: 28,
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        mb: 0.5,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                      }}
                    >
                      Generador de Noticias con IA
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        lineHeight: 1.4,
                        fontSize: { xs: "0.875rem", sm: "0.9rem" },
                      }}
                    >
                      Elabora un artículo completo optimizado para SEO a partir
                      de una descripción.
                    </Typography>
                  </Box>
                </Box>

                {/* Arrow */}
                <NavigateNext
                  sx={{
                    color: "white",
                    fontSize: 28,
                    opacity: isHovered ? 1 : 0.7,
                    transition: "opacity 0.3s ease",
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Image Generation Card */}
          <Card
            onMouseEnter={() => {
              setIsImageHovered(true)
            }}
            onMouseLeave={() => {
              setIsImageHovered(false)
            }}
            sx={{
              width: "100%",
              maxWidth: 650,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 3,
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: isImageHovered ? "translateY(-4px)" : "translateY(0)",
              boxShadow: isImageHovered
                ? "0 8px 32px rgba(0,0,0,0.3)"
                : "0 4px 16px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    flex: 1,
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      sx={{
                        color: "white",
                        fontSize: 28,
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        mb: 0.5,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                      }}
                    >
                      Generar Imágenes
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        lineHeight: 1.4,
                        fontSize: { xs: "0.875rem", sm: "0.9rem" },
                      }}
                    >
                      Crea imágenes personalizadas para acompañar tus artículos
                      con IA generativa.
                    </Typography>
                  </Box>
                </Box>

                {/* Arrow */}
                <NavigateNext
                  sx={{
                    color: "white",
                    fontSize: 28,
                    opacity: isImageHovered ? 1 : 0.7,
                    transition: "opacity 0.3s ease",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  )
}

export default HomePage
