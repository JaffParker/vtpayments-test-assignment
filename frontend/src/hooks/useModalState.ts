import { useState, useCallback } from 'react'

interface ModalState {
  isOpen: boolean
  toggle: () => void
}

export function useModalState(initial = false): ModalState {
  const [isOpen, setOpen] = useState(initial)

  const toggle = useCallback(() => setOpen(isOpen => !isOpen), [])

  return { isOpen, toggle }
}
