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

export enum STEPPER_TITLES {
  ARTICLE_INPUT = "Entrada de Artículo",
  TITLES = "Títulos",
  METADATA = "Metadatos",
  PREVIEW_EXPORT = "Vista Previa y Exportar",
}

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
    title: "Elige tu título optimizado",
    description:
      "Selecciona uno de los títulos propuestos o edítalos según tus necesidades.",
  },
  2: {
    title: "Configura URL y categoría",
    description:
      "Define el slug de la URL y la categoría para optimizar la organización del contenido.",
  },
  3: {
    title: "Vista Previa y Exportar",
    description:
      "Revisa tu artículo optimizado y expórtalo en el formato deseado.",
  },
}

export type StepKey = (typeof STEP_KEYS)[keyof typeof STEP_KEYS]
