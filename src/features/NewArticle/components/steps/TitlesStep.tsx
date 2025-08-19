import {
  Check as CheckIcon,
  Close as CloseIcon,
  Edit as EditIcon,
} from "@mui/icons-material"
import {
  Alert,
  Box,
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

export const TitlesStep = () => {
  const theme = useTheme()
  const { state, handleStep1Submit, updateWizardTitle } = useNewArticleContext()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Convert wizard titles to TitleSuggestion format
  const titleSuggestions = state.wizardState.titles.map((title, index) => ({
    id: `title-${index.toString()}`,
    title,
    isSelected: title === state.wizardState.selectedTitle, // Check if this title is selected
  }))

  const handleEditStart = (title: { id: string; title: string }) => {
    setEditingId(title.id)
    setEditValue(title.title)
  }

  const handleEditSave = () => {
    if (editingId) {
      // Update the title in the wizard state
      const titleIndex = parseInt(editingId.split("-")[1] ?? "0")
      updateWizardTitle(titleIndex, editValue)
      setEditingId(null)
      setEditValue("")
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditValue("")
  }

  const handleTitleSelect = (id: string) => {
    const titleIndex = parseInt(id.split("-")[1] ?? "0")
    const selectedTitle = state.wizardState.titles[titleIndex]
    handleStep1Submit(selectedTitle) // This now only selects the title, doesn't advance
  }

  // Show empty state if no titles are available
  if (state.wizardState.titles.length === 0) {
    return (
      <Box sx={{ mt: 3 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            No hay títulos generados aún. Haz clic en "Generar Títulos" para
            crear títulos optimizados para tu contenido.
          </Typography>
        </Alert>

        <Box
          sx={{
            mt: 4,
            p: 2,
            bgcolor: theme.palette.grey[50],
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <strong>Instrucciones:</strong> Una vez que se generen los títulos,
            podrás seleccionar uno como principal y editarlo según tus
            necesidades. El título seleccionado será el que se use en el
            artículo final.
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ mt: 3 }}>
      {/* Titles Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        {titleSuggestions.map(title => {
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
                height: "fit-content",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  boxShadow: 2,
                },
              }}
              onClick={() => {
                handleTitleSelect(title.id)
              }}
              onMouseEnter={() => {
                setHoveredCard(title.id)
              }}
              onMouseLeave={() => {
                setHoveredCard(null)
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

              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                {/* Edit button - absolutely positioned */}
                {!isEditing && (
                  <IconButton
                    size="small"
                    onClick={e => {
                      e.stopPropagation()
                      handleEditStart(title)
                    }}
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      opacity: hoveredCard === title.id ? 1 : 0,
                      transition: "opacity 0.2s ease-in-out",
                      visibility:
                        hoveredCard === title.id ? "visible" : "hidden",
                      zIndex: 2,
                      backgroundColor: theme.palette.background.paper,
                      boxShadow: 1,
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}

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
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: title.isSelected ? 600 : 400,
                        color: theme.palette.text.primary,
                        lineHeight: 1.4,
                        mb: 1.5,
                      }}
                    >
                      {title.title}
                    </Typography>

                    {/* Chips section */}
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Chip
                        label="SEO Optimizado"
                        color="info"
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: 20,
                          "& .MuiChip-label": {
                            px: 1,
                          },
                        }}
                      />
                      <Chip
                        label={`${title.title.length.toString()} caracteres`}
                        color="info"
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: 20,
                          "& .MuiChip-label": {
                            px: 1,
                          },
                        }}
                      />
                    </Box>
                  </>
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
