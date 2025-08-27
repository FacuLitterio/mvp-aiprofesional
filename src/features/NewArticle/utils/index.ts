// Re-export all functions from their respective modules to maintain backward compatibility

// Validation functions
export { generateSlug, validateSlug, validateTitle } from "./validation"

// SEO functions
export { calculateKeywordDensity, calculateSEOMetrics } from "./seo"

// Key terms extraction
export { extractKeyTerms, type KeyTermsConfig } from "./keyTerms"

// Content processing
export { extractSubtitlesFromHTML, generateSubtitles } from "./content"

// Link processing
export {
  convertMarkdownLinksToHTML,
  extractMarkdownLinks,
  parseInternalLink,
} from "./links"
