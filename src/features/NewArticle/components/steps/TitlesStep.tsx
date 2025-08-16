import {
  Check as CheckIcon,
  Close as CloseIcon,
  Edit as EditIcon,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import { useState } from "react"
import { useNewArticleContext } from "../../context/NewArticleContext"

const getTitleTypeInfo = (type: string) => {
  switch (type) {
    case "h1":
      return {
        label: "Título Principal",
        color: "primary" as const,
        description: "Optimizado para SEO",
      }
    case "google":
      return {
        label: "Google",
        color: "secondary" as const,
        description: "Para resultados de búsqueda",
      }
    case "homepage":
      return {
        label: "Homepage",
        color: "success" as const,
        description: "Para página principal",
      }
    case "social":
      return {
        label: "Redes Sociales",
        color: "warning" as const,
        description: "Para compartir en redes",
      }
    default:
      return { label: type, color: "primary" as const, description: "" }
  }
}

export const TitlesStep = () => {
  const theme = useTheme()
  const { state, updateTitle, regenerateTitles } = useNewArticleContext()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleEditStart = (title: { id: string; title: string }) => {
    setEditingId(title.id)
    setEditValue(title.title)
  }

  const handleEditSave = () => {
    if (editingId) {
      updateTitle(editingId, { title: editValue })
      setEditingId(null)
      setEditValue("")
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditValue("")
  }

  const handleTitleSelect = (id: string) => {
    // Deselect all titles first
    state.titles.forEach(title => {
      updateTitle(title.id, { isSelected: false })
    })
    // Select the clicked title
    updateTitle(id, { isSelected: true })
  }

  return (
    <Box sx={{ mt: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        {/* Regenerate Button */}
        <Button variant="outlined" onClick={regenerateTitles}>
          Regenerar Títulos
        </Button>
      </Box>

      {/* Titles Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {state.titles.map(title => {
          const typeInfo = getTitleTypeInfo(title.type)
          const isEditing = editingId === title.id

          return (
            <Card
              key={title.id}
              sx={{
                border: title.isSelected
                  ? `2px solid ${theme.palette.primary.main}`
                  : `1px solid ${theme.palette.divider}`,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                position: "relative",
                overflow: "visible",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  boxShadow: 2,
                },
              }}
              onClick={() => {
                handleTitleSelect(title.id)
              }}
            >
              {/* Selection indicator - positioned at top right */}
              {title.isSelected && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -12,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <Chip
                    label="Seleccionado"
                    color="primary"
                    size="small"
                    variant="filled"
                    sx={{
                      fontSize: "0.75rem",
                      height: 24,
                      "& .MuiChip-label": {
                        px: 1,
                      },
                    }}
                  />
                </Box>
              )}

              <CardContent>
                {/* Header with type label and edit button */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {typeInfo.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {typeInfo.description}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={e => {
                      e.stopPropagation()
                      handleEditStart(title)
                    }}
                    sx={{ ml: 1 }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* Title content */}
                {isEditing ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TextField
                      fullWidth
                      value={editValue}
                      onChange={e => {
                        setEditValue(e.target.value)
                      }}
                      multiline
                      rows={2}
                      size="small"
                      onClick={e => {
                        e.stopPropagation()
                      }}
                      sx={{ flex: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={e => {
                        e.stopPropagation()
                        handleEditSave()
                      }}
                      color="primary"
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={e => {
                        e.stopPropagation()
                        handleEditCancel()
                      }}
                      color="error"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: title.isSelected ? 600 : 400,
                      color: theme.palette.text.primary,
                      lineHeight: 1.4,
                    }}
                  >
                    {title.title}
                  </Typography>
                )}
              </CardContent>
            </Card>
          )
        })}
      </Box>

      {/* Instructions */}
      <Box
        sx={{ mt: 4, p: 2, bgcolor: theme.palette.grey[50], borderRadius: 1 }}
      >
        <Typography variant="body2" color="text.secondary">
          <strong>Instrucciones:</strong> Haz clic en un título para
          seleccionarlo como principal. Usa el ícono de edición para
          personalizar el texto. El título seleccionado será el que se use en el
          artículo final.
        </Typography>
      </Box>
    </Box>
  )
}
