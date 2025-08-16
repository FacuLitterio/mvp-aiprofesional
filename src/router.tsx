import {
  CONFIRMATION_EMAIL_PATH,
  FORGOT_PASSWORD_PATH,
  LOGIN_PATH,
  NEW_PATH,
  REGISTER_PATH,
  RESET_PASSWORD_PATH,
} from "common/routes"
import NewArticle from "features/NewArticle"
import ConfirmationEmailPage from "pages/ConfirmationEmailPage"
import ForgotPasswordPage from "pages/ForgotPasswordPage"
import HomePage from "pages/HomePage"
import LoginPage from "pages/LoginPage"
import RegisterPage from "pages/RegisterPage"
import ResetPasswordPage from "pages/ResetPasswordPage"
import { createBrowserRouter, Navigate } from "react-router"

const rootPath = (import.meta.env.VITE_APP_ROOT_PATH as string) || "/"

const router = createBrowserRouter([
  {
    path: rootPath,
    element: <HomePage />,
  },
  {
    path: LOGIN_PATH,
    element: <LoginPage />,
  },
  {
    path: FORGOT_PASSWORD_PATH,
    element: <ForgotPasswordPage />,
  },
  {
    path: REGISTER_PATH,
    element: <RegisterPage />,
  },
  {
    path: CONFIRMATION_EMAIL_PATH,
    element: <ConfirmationEmailPage />,
  },
  {
    path: RESET_PASSWORD_PATH,
    element: <ResetPasswordPage />,
  },
  {
    path: NEW_PATH,
    element: <NewArticle />,
  },
  {
    path: "*",
    element: <Navigate to={LOGIN_PATH} replace />,
  },
])

export default router
