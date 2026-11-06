import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { MediaLayout } from './layouts/MediaLayout'
import { HomePage } from './pages/HomePage'
import { OnlineTVPage } from './pages/OnlineTVPage'
import { AudioPage } from './pages/AudioPage'
import { TestimoniesPage } from './pages/TestimoniesPage'
import { MagazinesPage } from './pages/MagazinesPage'
import { MagazineViewerPage } from './pages/MagazineViewerPage'
import { VideoModalProvider } from './context/VideoModalContext'

const basenameRaw = import.meta.env.BASE_URL.replace(/\/$/, '')
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'online-tv',
          element: <MediaLayout />,
          children: [
            { index: true, element: <OnlineTVPage /> },
            { path: 'audio', element: <AudioPage /> },
          ],
        },
        { path: 'testimonies', element: <TestimoniesPage /> },
        { path: 'podcasts', element: <Navigate to="/online-tv/audio" replace /> },
        { path: 'magazines', element: <MagazinesPage /> },
        { path: 'magazines/:slug', element: <MagazineViewerPage /> },
      ],
    },
  ],
  { basename: basenameRaw === '' ? undefined : basenameRaw }
)

export default function App() {
  return (
    <VideoModalProvider>
      <RouterProvider router={router} />
    </VideoModalProvider>
  )
}
