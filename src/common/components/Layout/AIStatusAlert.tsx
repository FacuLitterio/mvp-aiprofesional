import { CheckCircle } from "@mui/icons-material"
import { Alert, AlertTitle, Box, Chip } from "@mui/material"
import type { IAPIError } from "../../../features/NewArticle/types"

type AIStatusAlertProps = {
  showError: boolean
  error: IAPIError | null
  step: number
}

export const AIStatusAlert = ({
  showError,
  error,
  step,
}: AIStatusAlertProps) => {
  if (showError && error) {
    return (
      <Alert severity="warning" sx={{ mb: 3 }}>
        <AlertTitle>Modo fallback activado</AlertTitle>
        <Box sx={{ mt: 1 }}>
          <Box sx={{ mb: 1 }}>
            No se pudo conectar con la IA. Se generaron propuestas básicas
            usando algoritmos locales.
          </Box>
          <Chip
            label="Funcionalidad limitada"
            size="small"
            color="warning"
            variant="outlined"
          />
        </Box>
      </Alert>
    )
  }

  if (step > 0 && !showError) {
    return (
      <Alert severity="success" sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CheckCircle />
          <span>Conectado con IA - Propuestas optimizadas</span>
        </Box>
      </Alert>
    )
  }

  return null
}
