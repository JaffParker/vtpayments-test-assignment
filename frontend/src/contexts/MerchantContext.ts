import { createContext } from 'react'
import { CreateMerchantInput } from '../../../api/src/types/Api'

export interface MerchantContext {
  createMerchant: (merchant: CreateMerchantInput) => void // enforce implementation of createMerchant
}
export type MerchantContextState = MerchantContext

export const MerchantContext = createContext<MerchantContextState>({
  createMerchant: () => {},
})
export const MerchantProvider = MerchantContext.Provider
