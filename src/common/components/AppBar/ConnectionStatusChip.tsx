import { Chip, Tooltip, useTheme } from "@mui/material"
import { NewArticleContext } from "features/NewArticle/context/NewArticleContext"
import { motion } from "framer-motion"
import { useContext } from "react"

export const ConnectionStatusChip = () => {
  const theme = useTheme()

  // Try to get context, but don't throw error if not available
  const context = useContext(NewArticleContext)

  // If context is not available, don't render the chip
  if (!context) {
    return null
  }

  const { state } = context

  // Only show chip from step 1 onwards
  if (state.activeStep < 1) {
    return null
  }

  // Determine connection status based on context state
  const isOnline = !state.showError && state.wizardState.step > 0
  const isConnecting = state.loading && state.activeStep === 0

  const pulseAnimation = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const connectingAnimation = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  }

  const getStatusInfo = () => {
    if (isConnecting) {
      return {
        label: "Generando...",
        color: "warning" as const,
        message:
          "La inteligencia artificial está procesando tu solicitud y generando contenido optimizado para SEO.",
      }
    } else if (isOnline) {
      return {
        label: "IA Disponible",
        color: "success" as const,
        message:
          "La inteligencia artificial está disponible y lista para generar contenido. El primer paso se completó exitosamente.",
      }
    } else {
      return {
        label: "IA No Disponible",
        color: "error" as const,
        message:
          "La inteligencia artificial no está disponible en este momento. Se utilizará el modo de respaldo local para continuar.",
      }
    }
  }

  const status = getStatusInfo()

  return (
    <Tooltip
      title={status.message}
      arrow
      placement="bottom"
      sx={{
        "& .MuiTooltip-tooltip": {
          bgcolor: "rgba(0, 0, 0, 0.87)",
          color: "white",
          fontSize: "0.875rem",
          maxWidth: 300,
          p: 1.5,
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Chip
          icon={
            isConnecting ? (
              <motion.div
                variants={connectingAnimation}
                animate="animate"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.warning.main,
                  marginRight: 4,
                }}
              />
            ) : (
              <motion.div
                variants={pulseAnimation}
                animate="animate"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: isOnline
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                  marginRight: 4,
                }}
              />
            )
          }
          label={status.label}
          color={status.color}
          variant="outlined"
          size="small"
          sx={{
            height: 28,
            fontSize: "0.75rem",
            fontWeight: 500,
            borderColor: isConnecting
              ? theme.palette.warning.main
              : isOnline
                ? theme.palette.success.main
                : theme.palette.error.main,
            color: isConnecting
              ? theme.palette.warning.main
              : isOnline
                ? theme.palette.success.main
                : theme.palette.error.main,
            backgroundColor: isConnecting
              ? `rgba(${theme.palette.warning.main}, 0.08)`
              : isOnline
                ? `rgba(${theme.palette.success.main}, 0.08)`
                : `rgba(${theme.palette.error.main}, 0.08)`,
            "&:hover": {
              backgroundColor: isConnecting
                ? `rgba(${theme.palette.warning.main}, 0.12)`
                : isOnline
                  ? `rgba(${theme.palette.success.main}, 0.12)`
                  : `rgba(${theme.palette.error.main}, 0.12)`,
            },
            "& .MuiChip-icon": {
              marginLeft: 1,
            },
            "& .MuiChip-label": {
              paddingLeft: 0.5,
              paddingRight: 1,
            },
            cursor: "pointer",
          }}
        />
      </motion.div>
    </Tooltip>
  )
}
