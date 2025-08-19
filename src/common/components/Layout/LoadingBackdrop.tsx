import { Backdrop, Box, CircularProgress, Typography } from "@mui/material"

type LoadingBackdropProps = {
  open: boolean
  message?: string
}

export const LoadingBackdrop = ({
  open,
  message = "Procesando...",
}: LoadingBackdropProps) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: theme => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" size={60} />
        <Typography variant="h6" color="inherit">
          {message}
        </Typography>
        <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
          Esto puede tomar unos minutos...
        </Typography>
      </Box>
    </Backdrop>
  )
}
