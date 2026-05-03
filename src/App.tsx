import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { OnlineTVPage } from './pages/OnlineTVPage'
import { TestimoniesPage } from './pages/TestimoniesPage'
import { PodcastsPage } from './pages/PodcastsPage'
import { VideoModalProvider } from './context/VideoModalContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'online-tv', element: <OnlineTVPage /> },
      { path: 'testimonies', element: <TestimoniesPage /> },
      { path: 'podcasts', element: <PodcastsPage /> },
    ],
  },
])

export default function App() {
  return (
    <VideoModalProvider>
      <RouterProvider router={router} />
    </VideoModalProvider>
  )
}
