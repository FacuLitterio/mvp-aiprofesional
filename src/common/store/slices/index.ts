import { combineSlices } from "@reduxjs/toolkit"
import { default as BreadcrumbSlice } from "./breadcrumb-slice"

export const commonSlices = combineSlices({
  breadcrumb: BreadcrumbSlice,
})

export default commonSlices
