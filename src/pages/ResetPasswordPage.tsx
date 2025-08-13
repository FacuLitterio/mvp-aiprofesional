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
      setPasswordError("Password must be at least 6 characters long")
      return false
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
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
              Set New Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your new password below
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
                label="New Password"
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
                placeholder="Enter your new password"
                disabled={loading || success}
                error={!!passwordError}
                helperText={passwordError}
              />
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value)
                  if (passwordError) setPasswordError("")
                }}
                required
                placeholder="Confirm your new password"
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
                  ? "Updating..."
                  : success
                    ? "Password Updated!"
                    : "Update Password"}
              </Button>
            </Stack>
          </form>
          <Stack direction="row" justifyContent="center" spacing={0.5}>
            <Typography variant="body2" display="inline" color="text.secondary">
              Remember your password?
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
              Sign In
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ResetPasswordPage
