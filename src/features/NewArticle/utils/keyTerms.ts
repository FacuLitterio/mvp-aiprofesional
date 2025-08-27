// Stop words en español para filtrar palabras comunes
const SPANISH_STOP_WORDS = new Set([
  "el",
  "la",
  "de",
  "que",
  "y",
  "a",
  "en",
  "un",
  "es",
  "se",
  "no",
  "te",
  "lo",
  "le",
  "da",
  "su",
  "por",
  "son",
  "con",
  "para",
  "al",
  "del",
  "los",
  "las",
  "una",
  "como",
  "pero",
  "sus",
  "me",
  "hasta",
  "hay",
  "donde",
  "han",
  "quien",
  "están",
  "estado",
  "desde",
  "todo",
  "nos",
  "durante",
  "todos",
  "uno",
  "les",
  "ni",
  "contra",
  "otros",
  "ese",
  "eso",
  "ante",
  "ellos",
  "e",
  "esto",
  "mí",
  "antes",
  "algunos",
  "qué",
  "unos",
  "yo",
  "otro",
  "otras",
  "otra",
  "él",
  "tanto",
  "esa",
  "estos",
  "mucho",
  "quienes",
  "nada",
  "muchos",
  "cual",
  "poco",
  "ella",
  "estar",
  "estas",
  "algunas",
  "algo",
  "nosotros",
  "mi",
  "mis",
  "tú",
  "te",
  "ti",
  "tu",
  "tus",
  "ellas",
  "nosotras",
  "vosotros",
  "vosotras",
  "os",
  "mío",
  "mía",
  "míos",
  "mías",
  "tuyo",
  "tuya",
  "tuyos",
  "tuyas",
  "suyo",
  "suya",
  "suyos",
  "suyas",
  "nuestro",
  "nuestra",
  "nuestros",
  "nuestras",
  "vuestro",
  "vuestra",
  "vuestros",
  "vuestras",
  "esos",
  "esas",
  "estoy",
  "estás",
  "está",
  "estamos",
  "estáis",
  "están",
  "esté",
  "estés",
  "estemos",
  "estéis",
  "estén",
  "estaré",
  "estarás",
  "estará",
  "estaremos",
  "estaréis",
  "estarán",
  "estaría",
  "estarías",
  "estaríamos",
  "estaríais",
  "estarían",
  "estaba",
  "estabas",
  "estábamos",
  "estabais",
  "estaban",
  "estuve",
  "estuviste",
  "estuvo",
  "estuvimos",
  "estuvisteis",
  "estuvieron",
  "estuviera",
  "estuvieras",
  "estuviéramos",
  "estuvierais",
  "estuvieran",
  "estuviese",
  "estuvieses",
  "estuviésemos",
  "estuvieseis",
  "estuviesen",
  "habiendo",
  "habido",
  "habida",
  "habidos",
  "habidas",
  "tened",
])

// Palabras comunes que no aportan valor semántico
const COMMON_WORDS = new Set([
  "este",
  "esta",
  "estos",
  "estas",
  "ese",
  "esa",
  "esos",
  "esas",
  "aquel",
  "aquella",
  "aquellos",
  "aquellas",
  "muy",
  "más",
  "menos",
  "bien",
  "mal",
  "bueno",
  "buena",
  "buenos",
  "buenas",
  "malo",
  "mala",
  "malos",
  "malas",
  "gran",
  "grande",
  "grandes",
  "pequeño",
  "pequeña",
  "pequeños",
  "pequeñas",
  "nuevo",
  "nueva",
  "nuevos",
  "nuevas",
  "primero",
  "primera",
  "primeros",
  "primeras",
  "último",
  "última",
  "últimos",
  "últimas",
  "mejor",
  "peor",
  "mayor",
  "menor",
  "superior",
  "inferior",
  "exterior",
  "interior",
  "central",
  "principal",
  "secundario",
  "general",
  "especial",
  "particular",
  "específico",
  "específica",
  "específicos",
  "específicas",
  "importante",
  "necesario",
  "necesaria",
  "necesarios",
  "necesarias",
  "posible",
  "imposible",
  "diferente",
  "diferentes",
  "similar",
  "similares",
  "igual",
  "iguales",
  "mismo",
  "misma",
  "mismos",
  "mismas",
  "otro",
  "otra",
  "otros",
  "otras",
  "varios",
  "varias",
  "muchos",
  "muchas",
  "pocos",
  "pocas",
  "algunos",
  "algunas",
  "todos",
  "todas",
  "ninguno",
  "ninguna",
  "ningunos",
  "ningunas",
  "cada",
  "cualquier",
  "cualesquiera",
  "cual",
  "cuál",
  "cuáles",
  "qué",
  "quién",
  "quiénes",
  "cuándo",
  "dónde",
  "cómo",
  "por qué",
  "para qué",
])

// Configuración para la extracción de términos clave
export type KeyTermsConfig = {
  maxTerms?: number
  minFrequency?: number
  excludeStopWords?: boolean
  excludeCommonWords?: boolean
  includeNumbers?: boolean
  minWordLength?: number
}

export const extractKeyTerms = (
  text: string,
  config: KeyTermsConfig = {},
): string[] => {
  const {
    maxTerms = 12,
    minFrequency = 1,
    excludeStopWords = true,
    excludeCommonWords = true,
    includeNumbers = false,
    minWordLength = 3,
  } = config

  if (!text || text.trim().length === 0) {
    return []
  }

  // Limpiar HTML tags si existen
  const cleanText = text.replace(/<[^>]*>/g, " ")

  // Normalizar texto: convertir a minúsculas, remover acentos y caracteres especiales
  const normalizedText = cleanText
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover diacríticos
    .replace(/[^\w\s]/g, " ") // Mantener solo letras, números y espacios
    .replace(/\s+/g, " ") // Normalizar espacios
    .trim()

  // Dividir en palabras y filtrar
  const words = normalizedText.split(/\s+/).filter(word => {
    // Filtrar por longitud mínima
    if (word.length < minWordLength) return false

    // Filtrar números si no se incluyen
    if (!includeNumbers && /^\d+$/.test(word)) return false

    // Filtrar stop words si se excluyen
    if (excludeStopWords && SPANISH_STOP_WORDS.has(word)) return false

    // Filtrar palabras comunes si se excluyen
    if (excludeCommonWords && COMMON_WORDS.has(word)) return false

    return true
  })

  // Contar frecuencia
  const frequency: Record<string, number> = {}
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })

  // Filtrar por frecuencia mínima y ordenar
  const filteredTerms = Object.entries(frequency)
    .filter(([, count]) => count >= minFrequency)
    .sort(([, a], [, b]) => {
      // Ordenar primero por frecuencia (descendente)
      if (b !== a) return b - a
      // Si tienen la misma frecuencia, ordenar alfabéticamente
      return 0
    })
    .slice(0, maxTerms)
    .map(([word]) => word)

  return filteredTerms
}
