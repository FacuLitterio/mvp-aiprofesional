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

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(true)
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
              Reset Your Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type in your email and we'll send you a link to reset your
              password
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
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                }}
                required
                autoFocus
                placeholder="you@example.com"
                disabled={loading || success}
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
                  ? "Sending..."
                  : success
                    ? "Email Sent!"
                    : "Send Reset Email"}
              </Button>
            </Stack>
          </form>
          <Stack direction="row" justifyContent="center" spacing={0.5}>
            <Typography variant="body2" display="inline" color="text.secondary">
              Already have an account?
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

export default ForgotPasswordPage
