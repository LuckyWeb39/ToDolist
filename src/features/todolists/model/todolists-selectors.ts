import type { RootState } from "@/app/store"
import {DomainTodolists} from "./todolists-slice.ts"

export const selectTodolists = (state: RootState): DomainTodolists[] => state.todolists
