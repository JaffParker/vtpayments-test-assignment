import { useState, useCallback } from 'react'

interface TabsState {
  activeTab: string
  switchToTab: (tab: string) => void
}

export function useTabsState(defaultTab = '1'): TabsState {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const switchToTab = useCallback(
    (tab: string) => activeTab !== tab && setActiveTab(tab),
    [activeTab],
  )

  return {
    activeTab,
    switchToTab,
  }
}
