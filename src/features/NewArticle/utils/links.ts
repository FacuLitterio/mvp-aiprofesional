// Function to extract markdown links and HTML links from content
export const extractMarkdownLinks = (htmlContent: string): string[] => {
  if (!htmlContent) return []

  const links: string[] = []

  // Match markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let markdownMatch

  while ((markdownMatch = markdownLinkRegex.exec(htmlContent)) !== null) {
    const linkText = markdownMatch[1]
    const linkUrl = markdownMatch[2]
    links.push(`${linkText} (${linkUrl})`)
  }

  // Match HTML links: <a href="url">text</a>
  const htmlLinkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/g
  let htmlMatch

  while ((htmlMatch = htmlLinkRegex.exec(htmlContent)) !== null) {
    const linkUrl = htmlMatch[1]
    const linkText = htmlMatch[2].trim()
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
