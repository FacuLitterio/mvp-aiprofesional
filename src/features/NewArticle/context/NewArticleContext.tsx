import { createContext, type ReactNode, useContext, useState } from "react"
import { useNewsGenerator } from "../hooks/useNewsGenerator"
import type { WizardState } from "../types"

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
  // Wizard state
  wizardState: WizardState
  showError: boolean
  loading: boolean
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
  // Wizard functions
  handleStep0Submit: (news: string) => Promise<void>
  handleStep1Submit: (title: string) => void
  handleStep1Next: () => void
  handleStep2Submit: (slug: string, category: string) => void
  handlePublish: () => void
  handleRestart: () => void
  // New function to update wizard titles
  updateWizardTitle: (index: number, newTitle: string) => void
}

const NewArticleContext = createContext<NewArticleContextType | undefined>(
  undefined,
)

type NewArticleProviderProps = {
  children: ReactNode
}

// Initial wizard state
const getInitialWizardState = (): WizardState => ({
  step: 0,
  originalNews: "",
  selectedTitle: "",
  editableTitle: "",
  slug: "",
  category: "",
  optimizedNews: "",
  titles: [],
  internalLinks: [],
  subtitles: [],
  keyTerms: [],
})

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
  wizardState: getInitialWizardState(),
  showError: false,
  loading: false,
})

export const NewArticleProvider = ({ children }: NewArticleProviderProps) => {
  const [state, setState] = useState<NewArticleState>(getInitialState())
  const { generateNews, generateFallback, loading } = useNewsGenerator()

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

  // Wizard functions
  const handleStep0Submit = async (news: string) => {
    setState(prev => ({
      ...prev,
      wizardState: { ...prev.wizardState, originalNews: news },
      loading: true,
      showError: false,
    }))

    try {
      const response = await generateNews(news)
      setState(prev => ({
        ...prev,
        wizardState: {
          ...prev.wizardState,
          titles: response.Titulos,
          slug: response.Slug,
          category: response.Categoria,
          optimizedNews: response.Noticia,
          selectedTitle: response.Titulos[0],
          editableTitle: response.Titulos[0],
          step: 1,
        },
        activeStep: 1, // Update activeStep to navigate to next step
        loading: false,
        showError: false,
      }))
    } catch {
      // Usar fallback local
      const fallbackResponse = generateFallback(news)
      setState(prev => ({
        ...prev,
        wizardState: {
          ...prev.wizardState,
          titles: fallbackResponse.Titulos,
          slug: fallbackResponse.Slug,
          category: fallbackResponse.Categoria,
          optimizedNews: fallbackResponse.Noticia,
          selectedTitle: fallbackResponse.Titulos[0],
          editableTitle: fallbackResponse.Titulos[0],
          step: 1,
        },
        activeStep: 1, // Update activeStep to navigate to next step
        loading: false,
        showError: true,
      }))
    }
  }

  const handleStep1Submit = (title: string) => {
    setState(prev => ({
      ...prev,
      wizardState: {
        ...prev.wizardState,
        selectedTitle: title,
        editableTitle: title,
        // Don't advance step here, just update the selected title
      },
    }))
  }

  const handleStep1Next = () => {
    setState(prev => ({
      ...prev,
      wizardState: {
        ...prev.wizardState,
        step: 2,
      },
      activeStep: 2, // Update activeStep to navigate to next step
    }))
  }

  const handleStep2Submit = (slug: string, category: string) => {
    setState(prev => ({
      ...prev,
      wizardState: {
        ...prev.wizardState,
        slug,
        category,
        step: 3,
      },
      activeStep: 3, // Update activeStep to navigate to next step
    }))
  }

  const updateWizardTitle = (index: number, newTitle: string) => {
    setState(prev => ({
      ...prev,
      wizardState: {
        ...prev.wizardState,
        titles: prev.wizardState.titles.map((title, i) =>
          i === index ? newTitle : title,
        ),
      },
    }))
  }

  const handlePublish = () => {
    // Aquí iría la lógica de publicación real
    alert("¡Noticia publicada exitosamente!")
    handleRestart()
  }

  const handleRestart = () => {
    setState(prev => ({
      ...prev,
      wizardState: getInitialWizardState(),
      showError: false,
    }))
  }

  const isStepValid = () => {
    switch (state.activeStep) {
      case 0:
        return (
          state.articleContent.length >= 100 &&
          state.articleContent.length <= 20000
        )
      case 1:
        // Validate that a title is selected in wizard state
        return state.wizardState.selectedTitle.length > 0
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
    state: {
      ...state,
      loading,
    },
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
    handleStep0Submit,
    handleStep1Submit,
    handleStep1Next,
    handleStep2Submit,
    handlePublish,
    handleRestart,
    updateWizardTitle,
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
