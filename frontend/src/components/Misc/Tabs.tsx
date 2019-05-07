import React, { FC, ReactNode, Fragment } from 'react'
import { useTabsState } from '../../hooks/useTabsState'
import { Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap'

interface Tab {
  name: string
  label: string
  content: ReactNode
}
interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onSwitched?: (tab: string) => void
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  defaultTab = tabs[0].name,
  onSwitched,
}) => {
  const { activeTab, switchToTab } = useTabsState(defaultTab)
  const switchTo = (tab: string): void => {
    switchToTab(name)
    if (onSwitched) onSwitched(tab)
  }

  return (
    <Fragment>
      <Nav tabs className="mb-4">
        {tabs.map(({ name, label }) => (
          <NavItem key={name}>
            <NavLink
              active={activeTab === name}
              onClick={switchTo.bind(undefined, name)}
              style={{ cursor: activeTab !== name ? 'pointer' : 'default' }}
            >
              {label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={activeTab}>
        {tabs.map(({ content, name }) => (
          <TabPane tabId={name} key={name}>
            {content}
          </TabPane>
        ))}
      </TabContent>
    </Fragment>
  )
}
