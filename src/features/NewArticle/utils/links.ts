// Function to extract markdown links from HTML content
export const extractMarkdownLinks = (htmlContent: string): string[] => {
  if (!htmlContent) return []

  // Match markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const links: string[] = []
  let match

  while ((match = markdownLinkRegex.exec(htmlContent)) !== null) {
    const linkText = match[1]
    const linkUrl = match[2]
    links.push(`${linkText} (${linkUrl})`)
  }

  return links
}

// Function to convert markdown links to HTML links
export const convertMarkdownLinksToHTML = (htmlContent: string): string => {
  if (!htmlContent) return ""

  return htmlContent.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  )
}

// Function to extract URL and text from internal link format
export const parseInternalLink = (
  linkText: string,
): { url: string; text: string } => {
  const urlRegex = /\(([^)]+)\)$/
  const urlMatch = urlRegex.exec(linkText)
  const url = urlMatch ? urlMatch[1] : ""
  const text = linkText.replace(/\s*\([^)]+\)$/, "")

  return { url, text }
}
