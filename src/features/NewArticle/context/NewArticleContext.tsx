import { createContext, type ReactNode, useContext, useState } from "react"

export type TitleSuggestion = {
  id: string
  title: string
  type: "h1" | "google" | "homepage" | "social"
  isSelected: boolean
}

export type NewArticleState = {
  activeStep: number
  articleContent: string
  titles: TitleSuggestion[]
}

type NewArticleContextType = {
  state: NewArticleState
  setActiveStep: (step: number) => void
  setArticleContent: (content: string) => void
  setTitles: (titles: TitleSuggestion[]) => void
  updateTitle: (id: string, updates: Partial<TitleSuggestion>) => void
  regenerateTitles: () => void
  handleNext: () => void
  handleBack: () => void
  handleReset: () => void
  isStepValid: () => boolean
}

const NewArticleContext = createContext<NewArticleContextType | undefined>(
  undefined,
)

type NewArticleProviderProps = {
  children: ReactNode
}

// Mock data for titles
const generateMockTitles = (): TitleSuggestion[] => [
  {
    id: "h1-1",
    title:
      "Créditos UVA: Todo lo que necesitas saber sobre la nueva normativa 2024",
    type: "h1",
    isSelected: true,
  },
  {
    id: "google-1",
    title: "Créditos UVA 2024: Guía completa de la nueva normativa",
    type: "google",
    isSelected: false,
  },
  {
    id: "homepage-1",
    title: "Nueva normativa de Créditos UVA: Cambios importantes para 2024",
    type: "homepage",
    isSelected: false,
  },
  {
    id: "social-1",
    title:
      "¿Sabías que cambiaron las reglas de los Créditos UVA? Te contamos todo",
    type: "social",
    isSelected: false,
  },
]

const generateAlternativeMockTitles = (): TitleSuggestion[] => [
  {
    id: "h1-2",
    title:
      "Créditos UVA 2024: La revolución en el sistema crediticio argentino",
    type: "h1",
    isSelected: true,
  },
  {
    id: "google-2",
    title: "Créditos UVA: Nueva normativa 2024 y cómo afecta a los usuarios",
    type: "google",
    isSelected: false,
  },
  {
    id: "homepage-2",
    title: "Todo sobre los Créditos UVA: Normativa actualizada para 2024",
    type: "homepage",
    isSelected: false,
  },
  {
    id: "social-2",
    title: "Créditos UVA: Los cambios que debes conocer en 2024",
    type: "social",
    isSelected: false,
  },
]

export const NewArticleProvider = ({ children }: NewArticleProviderProps) => {
  const [state, setState] = useState<NewArticleState>({
    activeStep: 0,
    articleContent:
      "Breakthrough in AI: xAI Unveils Grok 5, Revolutionizing Human-Machine Interaction\n\nxAI, the artificial intelligence company founded by Elon Musk, has unveiled Grok 5, its most advanced AI model to date. This breakthrough represents a significant leap forward in human-machine interaction capabilities.\n\nGrok 5 demonstrates unprecedented abilities in natural language understanding, creative problem-solving, and real-time data analysis. The model's enhanced multimodal processing allows it to seamlessly integrate text, images, and video inputs, making it one of the most versatile AI systems ever developed.\n\n\"We're not just building smarter AI; we're creating companions that understand the world like we do,\" said Elon Musk during the virtual launch event, which was streamed live on X.",
    titles: generateMockTitles(),
  })

  const setActiveStep = (step: number) => {
    setState(prev => ({ ...prev, activeStep: step }))
  }

  const setArticleContent = (content: string) => {
    setState(prev => ({ ...prev, articleContent: content }))
  }

  const setTitles = (titles: TitleSuggestion[]) => {
    setState(prev => ({ ...prev, titles }))
  }

  const updateTitle = (id: string, updates: Partial<TitleSuggestion>) => {
    setState(prev => ({
      ...prev,
      titles: prev.titles.map(title =>
        title.id === id ? { ...title, ...updates } : title,
      ),
    }))
  }

  const regenerateTitles = () => {
    // Toggle between two sets of mock data
    const currentTitles = state.titles
    const isFirstSet = currentTitles[0]?.id === "h1-1"
    setState(prev => ({
      ...prev,
      titles: isFirstSet
        ? generateAlternativeMockTitles()
        : generateMockTitles(),
    }))
  }

  const handleNext = () => {
    setState(prev => ({ ...prev, activeStep: prev.activeStep + 1 }))
  }

  const handleBack = () => {
    setState(prev => ({ ...prev, activeStep: prev.activeStep - 1 }))
  }

  const handleReset = () => {
    setState(prev => ({
      ...prev,
      activeStep: 0,
      titles: generateMockTitles(),
    }))
  }

  const isStepValid = () => {
    switch (state.activeStep) {
      case 0:
        return (
          state.articleContent.length >= 50 &&
          state.articleContent.length <= 20000
        )
      case 1:
        // Validate that at least one title is selected
        return state.titles.some(title => title.isSelected)
      default:
        return true
    }
  }

  const value: NewArticleContextType = {
    state,
    setActiveStep,
    setArticleContent,
    setTitles,
    updateTitle,
    regenerateTitles,
    handleNext,
    handleBack,
    handleReset,
    isStepValid,
  }

  return (
    <NewArticleContext.Provider value={value}>
      {children}
    </NewArticleContext.Provider>
  )
}

export const useNewArticleContext = () => {
  const context = useContext(NewArticleContext)
  if (context === undefined) {
    throw new Error(
      "useNewArticleContext must be used within a NewArticleProvider",
    )
  }
  return context
}
