import { createContext } from 'react'
import {
  CreateMerchantInput,
  EditMerchantInput,
  EditResellerInput,
} from '../../../api/src/types/Api'

export interface MerchantContext {
  createMerchant: (merchant: CreateMerchantInput) => void
  editMerchant: (merchant: EditMerchantInput) => void
  editReseller: (merchant: EditResellerInput) => void
}
export type MerchantContextState = MerchantContext

export const MerchantContext = createContext<MerchantContextState>({
  createMerchant: () => {},
  editMerchant: () => {},
  editReseller: () => {},
})
export const MerchantProvider = MerchantContext.Provider
