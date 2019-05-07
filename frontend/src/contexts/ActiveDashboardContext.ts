import { createContext } from 'react'

export const dashboards = ['merchant', 'reseller', 'superadmin']

export const ActiveDashboard = createContext(dashboards[0])

export const ActiveDashboardProvider = ActiveDashboard.Provider
