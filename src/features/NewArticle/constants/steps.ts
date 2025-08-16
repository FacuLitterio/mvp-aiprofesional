export const NEW_ARTICLE_STEPS = [
  "Entrada de Artículo",
  "Títulos",
  "Metadatos",
  "Vista Previa y Exportar",
] as const

export const STEP_KEYS = {
  ARTICLE_INPUT: 0,
  TITLES: 1,
  METADATA: 2,
  PREVIEW_EXPORT: 3,
} as const

export type StepContent = {
  title: string
  description: string
}

export const STEP_CONTENT: Record<number, StepContent> = {
  0: {
    title: "Pega tu Artículo",
    description:
      "Ingresa tu contenido de artículo sin procesar a continuación. Nuestra IA sugerirá mejoras de SEO.",
  },
  1: {
    title: "Generar Títulos",
    description:
      "Crea títulos optimizados para SEO que capturen la atención de los lectores. Revisa y edita las sugerencias de títulos generadas por IA. Selecciona el título principal que mejor se adapte a tu contenido.",
  },
  2: {
    title: "Configurar Metadatos",
    description:
      "Define los metadatos necesarios para mejorar el posicionamiento en buscadores.",
  },
  3: {
    title: "Vista Previa y Exportar",
    description:
      "Revisa tu artículo optimizado y expórtalo en el formato deseado.",
  },
}

export type StepKey = (typeof STEP_KEYS)[keyof typeof STEP_KEYS]
