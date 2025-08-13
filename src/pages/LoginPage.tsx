import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import GithubButton from "common/components/Buttons/GithubButton"
import GoogleButton from "common/components/Buttons/GoogleButton"
import { FORGOT_PASSWORD_PATH, REGISTER_PATH, ROOT_PATH } from "common/routes"
import { Form, Formik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleForgotPassword = () => {
    void navigate(FORGOT_PASSWORD_PATH)
  }

  const handleSignUp = () => {
    void navigate(REGISTER_PATH)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (_values: { email: string; password: string }) => {
    void navigate(ROOT_PATH)
  }

  return (
    <Grid container sx={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Izquierda: Formulario */}
      <Grid
        size={{ xs: 12, md: 5 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.paper",
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
            {/* Logo y título */}
            <Box textAlign="left">
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Welcome back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to your account
              </Typography>
            </Box>

            {/* Botones sociales */}
            <Stack spacing={1.5}>
              <GoogleButton />
              <GithubButton />
            </Stack>

            {/* Divider "or" */}
            <Box sx={{ my: 1 }}>
              <Divider>
                <Typography variant="body2">Or</Typography>
              </Divider>
            </Box>

            {/* Formulario */}
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form autoComplete="off">
                  <Stack spacing={2}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      fullWidth
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoFocus
                      placeholder="you@example.com"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="••••••••"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => {
                                  setShowPassword(s => !s)
                                }}
                                edge="end"
                                size="small"
                                tabIndex={-1}
                              >
                                {showPassword ? (
                                  <VisibilityOff
                                    fontSize="small"
                                    color="action"
                                  />
                                ) : (
                                  <Visibility fontSize="small" color="action" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <Box display="flex" justifyContent="flex-end" mt={-1}>
                      <Link
                        href="#"
                        underline="hover"
                        color="text.secondary"
                        fontSize={14}
                        onClick={handleForgotPassword}
                      >
                        Forgot Password?
                      </Link>
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      fullWidth
                      disableElevation
                    >
                      Sign In
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>

            {/* Sign up link */}
            <Box textAlign="center" mt={1}>
              <Typography variant="body2" display="inline" color="#aaa">
                Don&apos;t have an account?
              </Typography>
              <Link
                href="#"
                underline="none"
                ml={0.5}
                typography="body2"
                onClick={handleSignUp}
              >
                Sign Up Now
              </Link>
            </Box>
          </Stack>
          {/* Aviso legal */}
          <Box mt={4} textAlign="center">
            <Typography variant="caption" color="#aaa">
              By continuing, you agree to our{" "}
              <Link href="#" color="#aaa" underline="always">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" color="#aaa" underline="always">
                Privacy Policy
              </Link>
              .
            </Typography>
          </Box>
        </Paper>
      </Grid>
      {/* Derecha: Testimonio */}
      <Grid
        size={{ xs: 0, md: 7 }}
        sx={{
          backgroundColor: "background.default",
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box textAlign="center" maxWidth={420}>
          <Typography
            variant="h3"
            fontWeight={600}
            gutterBottom
            sx={{ mb: 4, fontSize: 32, lineHeight: 1.2, textAlign: "center" }}
          >
            <Box
              component="span"
              sx={theme => ({
                fontSize: 40,
                verticalAlign: "middle",
                display: "inline-block",
                color: theme.palette.primary.main,
              })}
            >
              &ldquo;
            </Box>
            Create stunning landing pages in minutes with AI.
            <br />
            Unlock your brand's potential!{" "}
            <Box
              component="span"
              sx={theme => ({ color: theme.palette.primary.main })}
            >
              #AILanding
            </Box>
            <br />
            <Box
              component="span"
              sx={theme => ({ color: theme.palette.primary.main })}
            >
              #NextLevel
            </Box>
            <Box
              component="span"
              sx={theme => ({
                fontSize: 40,
                verticalAlign: "middle",
                display: "inline-block",
                color: theme.palette.primary.main,
                mt: 1,
              })}
            >
              &rdquo;
            </Box>
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            <Box
              component="img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="avatar"
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                mr: 2,
              }}
            />
            <Box>
              <Typography fontWeight={600} color="text.primary">
                @digitaldaswani
              </Typography>
              <Typography variant="body2" color="primary.main">
                Product Hunter
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginPage
