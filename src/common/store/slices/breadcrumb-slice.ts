import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type BreadcrumbNode = {
  text?: string
  url?: string
}

type BreadcrumbState = {
  nodes: BreadcrumbNode[]
}

const initialState: BreadcrumbState = {
  nodes: [],
}

const slice = createSlice({
  name: "Breadcrumb",
  initialState,
  reducers: {
    replaceNodesBreadcrumb: (
      state,
      action: PayloadAction<BreadcrumbNode[]>,
    ): void => {
      const breadcrumNodes = action.payload
      state.nodes = [...initialState.nodes, ...breadcrumNodes]
    },

    cleanBreadcrumb: (state): void => {
      state.nodes = []
    },
  },
})

export const { replaceNodesBreadcrumb, cleanBreadcrumb } = slice.actions

export default slice.reducer
