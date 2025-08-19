import { AutoAwesome } from "@mui/icons-material"
import { Alert, Box, TextField, Typography } from "@mui/material"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { useNewArticleContext } from "../../context/NewArticleContext"

// Validation schema
const ArticleContentSchema = Yup.object().shape({
  articleContent: Yup.string()
    .min(100, "El contenido debe tener al menos 100 caracteres")
    .max(20000, "El contenido no puede exceder los 20,000 caracteres")
    .required("El contenido del artículo es requerido")
    .trim(),
})

export const ArticleInputStep = () => {
  const { state, setArticleContent } = useNewArticleContext()

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Contenido Fuente Crudo
      </Typography>

      <Formik
        initialValues={{ articleContent: state.articleContent }}
        validationSchema={ArticleContentSchema}
        onSubmit={() => {
          // Empty submit since we handle it in footer
        }}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Field
              as={TextField}
              name="articleContent"
              multiline
              rows={12}
              fullWidth
              value={values.articleContent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e)
                setArticleContent(e.target.value)
              }}
              onBlur={handleBlur}
              placeholder="Pega tu contenido de artículo aquí..."
              variant="outlined"
              error={touched.articleContent && Boolean(errors.articleContent)}
              helperText={
                touched.articleContent && errors.articleContent
                  ? errors.articleContent
                  : `Mínimo 100 caracteres, máximo 20,000.\n${values.articleContent.length.toString()}/20,000 caracteres`
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "background.paper",
                },
                "& .MuiFormHelperText-root": {
                  color:
                    touched.articleContent && errors.articleContent
                      ? "error.main"
                      : values.articleContent.length > 18000
                        ? "warning.main"
                        : "text.secondary",
                },
              }}
            />

            <Alert severity="info" icon={<AutoAwesome />} sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 1 }}>
                ¿Qué hará la IA?
              </Typography>
              <Box component="ul" sx={{ pl: 0, listStyle: "none", m: 0 }}>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  • Generará 4 títulos optimizados para SEO
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  • Sugerirá un slug y categoría apropiados
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
                  • Optimizará el contenido con negritas y subtítulos
                </Typography>
                <Typography component="li" variant="body2">
                  • Propondrá enlaces internos relevantes
                </Typography>
              </Box>
            </Alert>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
