import { createContext } from 'react'
import { CreateResellerInput } from '../../../api/src/types/Api'

export interface ResellerContext {
  createReseller: (Reseller: CreateResellerInput) => void // enforce implementation of createReseller
}
export type ResellerContextState = ResellerContext

export const ResellerContext = createContext<ResellerContextState>({
  createReseller: () => {},
})
export const ResellerProvider = ResellerContext.Provider
