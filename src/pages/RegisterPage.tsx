import {
  CheckCircle,
  RadioButtonUnchecked,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material"
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { CONFIRMATION_EMAIL_PATH, LOGIN_PATH } from "common/routes"
import { Form, Formik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[^A-Za-z0-9]/, "Must contain a symbol"),
})

const passwordChecks = [
  {
    label: "Uppercase & Lowercase letter",
    test: (pw: string) => /[A-Z]/.test(pw) && /[a-z]/.test(pw),
  },
  {
    label: "Number",
    test: (pw: string) => /[0-9]/.test(pw),
  },
  {
    label: "Symbol",
    test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
  },
  {
    label: "Minimum 8 characters",
    test: (pw: string) => pw.length >= 8,
  },
]

const RegisterPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleGoToLogin = () => {
    void navigate(LOGIN_PATH)
  }

  const handleSubmit = (values: { email: string; password: string }) => {
    void navigate(`${CONFIRMATION_EMAIL_PATH}?email=${values.email}`)
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
            <Box textAlign="left" mb={1}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Get started
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create a new account
              </Typography>
            </Box>

            {/* Formulario */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
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
                      required
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
                      required
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
                    {/* Password requirements checks: solo si el email es válido y no vacío */}
                    <Stack spacing={0.5} sx={{ mb: 1 }}>
                      {passwordChecks.map(({ label, test }) => (
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          key={label}
                        >
                          {test(values.password) ? (
                            <CheckCircle fontSize="small" color="primary" />
                          ) : (
                            <RadioButtonUnchecked
                              fontSize="small"
                              color="disabled"
                            />
                          )}
                          <Typography variant="body2" color="text.secondary">
                            {label}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      fullWidth
                      disabled={isSubmitting}
                      disableElevation
                    >
                      Sign Up
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>

            {/* Sign in link */}
            <Stack direction="row" justifyContent="center" spacing={0.5}>
              <Typography variant="body2" display="inline" color="#aaa">
                Already have an account?
              </Typography>
              <Link
                component="button"
                underline="none"
                ml={0.5}
                typography="body2"
                onClick={handleGoToLogin}
              >
                Sign In Now
              </Link>
            </Stack>
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
            Landyf.ai made launching my product so much easier.
            <br />
            The AI-generated landing page was spot on!
            <Box
              component="span"
              sx={theme => ({ color: theme.palette.primary.main })}
            >
              {" "}
              #AIMagic
            </Box>
            <Box
              component="span"
              sx={theme => ({ color: theme.palette.primary.main })}
            >
              {" "}
              #StartNow
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
              src="https://randomuser.me/api/portraits/women/44.jpg"
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
                @sarah.codes
              </Typography>
              <Typography variant="body2" color="primary.main">
                Indie Maker
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default RegisterPage
