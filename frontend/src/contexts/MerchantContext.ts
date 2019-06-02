import { createContext } from 'react'
import {
  CreateMerchantInput,
  EditMerchantInput,
} from '../../../api/src/types/Api'

export interface MerchantContext {
  createMerchant: (merchant: CreateMerchantInput) => void
  editMerchant: (merchant: EditMerchantInput) => void
}
export type MerchantContextState = MerchantContext

export const MerchantContext = createContext<MerchantContextState>({
  createMerchant: () => {},
  editMerchant: () => {},
})
export const MerchantProvider = MerchantContext.Provider
