import { Box, Button, Link, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const ConfirmationEmailPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  useEffect(() => {
    const emailFromParams = searchParams.get("email")
    if (emailFromParams) {
      setEmail(emailFromParams)
    } else {
      void navigate("/register", { replace: true })
    }
  }, [searchParams, navigate])

  const handleResendEmail = () => {
    setLoading(true)
    setResendSuccess(false)
    console.log("Reenviando email a:", email)
    setTimeout(() => {
      setLoading(false)
      setResendSuccess(true)
    }, 1200)
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
          <Box textAlign="center">
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Check Your Email
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              We've sent a verification link to
            </Typography>
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{
                p: 1,
                border: "1px solid",
                borderColor: "grey.700",
                borderRadius: 1,
              }}
            >
              {email}
            </Typography>
          </Box>

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Click the link in the email to verify your account and complete
              your registration.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Didn't receive the email? Check your spam folder or try resending.
            </Typography>
          </Box>

          <Stack spacing={2}>
            <Button
              variant="outlined"
              onClick={handleResendEmail}
              disabled={loading}
              fullWidth
              sx={{
                textTransform: "none",
              }}
            >
              {loading
                ? "Sending..."
                : resendSuccess
                  ? "Email Sent!"
                  : "Resend Verification Email"}
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                void navigate("/login")
              }}
              sx={{
                textTransform: "none",
              }}
              fullWidth
              disableElevation
            >
              Back to Sign In
            </Button>
          </Stack>

          <Stack direction="row" justifyContent="center" spacing={0.5}>
            <Typography variant="body2" display="inline" color="text.secondary">
              Need help?
            </Typography>
            <Link
              component="button"
              underline="hover"
              typography="body2"
              onClick={() => {
                // Aquí iría la lógica para contactar soporte
                console.log("Contact support")
              }}
              sx={{ fontWeight: 500 }}
            >
              Contact Support
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default ConfirmationEmailPage
