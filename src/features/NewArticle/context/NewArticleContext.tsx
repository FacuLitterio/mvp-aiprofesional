import { createContext, type ReactNode, useContext, useState } from "react"

export type TitleSuggestion = {
  id: string
  title: string
  type: "h1" | "google" | "homepage" | "social"
  isSelected: boolean
}

export type Metadata = {
  copete: string
  volanta: string
  keywords: string[]
  sections: {
    principal: string
    secundarias: string[]
  }
  slug: string
  metaDescription: string
  subtitles: string[]
}

export type NewArticleState = {
  activeStep: number
  articleContent: string
  titles: TitleSuggestion[]
  metadata: Metadata
}

type NewArticleContextType = {
  state: NewArticleState
  setActiveStep: (step: number) => void
  setArticleContent: (content: string) => void
  setTitles: (titles: TitleSuggestion[]) => void
  updateTitle: (id: string, updates: Partial<TitleSuggestion>) => void
  regenerateTitles: () => void
  setMetadata: (metadata: Metadata) => void
  updateMetadata: (updates: Partial<Metadata>) => void
  regenerateMetadata: () => void
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

// Initial empty state
const getInitialState = (): NewArticleState => ({
  activeStep: 0,
  articleContent: "",
  titles: [],
  metadata: {
    copete: "",
    volanta: "",
    keywords: [],
    sections: {
      principal: "",
      secundarias: [],
    },
    slug: "",
    metaDescription: "",
    subtitles: [],
  },
})

export const NewArticleProvider = ({ children }: NewArticleProviderProps) => {
  const [state, setState] = useState<NewArticleState>(getInitialState())

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
    // TODO: Integrate with AI endpoint to regenerate titles
    console.log("Regenerating titles for content:", state.articleContent)
    // This will be replaced with actual API call
  }

  const setMetadata = (metadata: Metadata) => {
    setState(prev => ({ ...prev, metadata }))
  }

  const updateMetadata = (updates: Partial<Metadata>) => {
    setState(prev => ({
      ...prev,
      metadata: { ...prev.metadata, ...updates },
    }))
  }

  const regenerateMetadata = () => {
    // TODO: Integrate with AI endpoint to regenerate metadata
    console.log("Regenerating metadata for content:", state.articleContent)
    // This will be replaced with actual API call
  }

  const handleNext = () => {
    setState(prev => ({ ...prev, activeStep: prev.activeStep + 1 }))
  }

  const handleBack = () => {
    setState(prev => ({ ...prev, activeStep: prev.activeStep - 1 }))
  }

  const handleReset = () => {
    setState(getInitialState())
  }

  const isStepValid = () => {
    switch (state.activeStep) {
      case 0:
        return (
          state.articleContent.length >= 100 &&
          state.articleContent.length <= 20000
        )
      case 1:
        // Validate that at least one title is selected
        return state.titles.some(title => title.isSelected)
      case 2:
        // Validate that metadata has required fields
        return (
          state.metadata.copete.trim().length > 0 &&
          state.metadata.copete.length <= 155 &&
          state.metadata.sections.principal.trim().length > 0
        )
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
    setMetadata,
    updateMetadata,
    regenerateMetadata,
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
