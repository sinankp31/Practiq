import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './AppShell'
import DashboardPage from '@/pages/DashboardPage'
import QuestionsPage from '@/pages/QuestionsPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'questions', element: <QuestionsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
