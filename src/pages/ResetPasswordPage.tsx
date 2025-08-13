import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const validatePasswords = () => {
    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres")
      return false
    }
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden")
      return false
    }
    setPasswordError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePasswords()) {
      return
    }

    setLoading(true)
    setSuccess(true)
    setTimeout(() => {
      void navigate("/login")
    }, 2000)
    setLoading(false)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 430,
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Stack spacing={3}>
          <Box textAlign="left">
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Establecer Nueva Contraseña
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ingresa tu nueva contraseña a continuación
            </Typography>
          </Box>
          <form
            onSubmit={e => {
              handleSubmit(e)
            }}
            autoComplete="off"
          >
            <Stack spacing={2}>
              <TextField
                label="Nueva Contraseña"
                name="password"
                type="password"
                fullWidth
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  if (passwordError) setPasswordError("")
                }}
                required
                autoFocus
                placeholder="Ingresa tu nueva contraseña"
                disabled={loading || success}
                error={!!passwordError}
                helperText={passwordError}
              />
              <TextField
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value)
                  if (passwordError) setPasswordError("")
                }}
                required
                placeholder="Confirma tu nueva contraseña"
                disabled={loading || success}
                error={!!passwordError}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  bgcolor: "#00844A",
                  "&:hover": { bgcolor: "#006838" },
                }}
                fullWidth
                disableElevation
                disabled={loading || success}
              >
                {loading
                  ? "Actualizando..."
                  : success
                    ? "¡Contraseña Actualizada!"
                    : "Actualizar Contraseña"}
              </Button>
            </Stack>
          </form>
          <Stack direction="row" justifyContent="center" spacing={0.5}>
            <Typography variant="body2" display="inline" color="text.secondary">
              ¿Recuerdas tu contraseña?
            </Typography>
            <Link
              component="button"
              underline="hover"
              typography="body2"
              onClick={() => {
                void navigate("/login")
              }}
              sx={{ fontWeight: 500 }}
            >
              Iniciar Sesión
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ResetPasswordPage
