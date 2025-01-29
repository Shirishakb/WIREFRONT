import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import App from './App.jsx'
import LandingPage from './pages/LandingPage'
import PageEditor from './pages/pageeditor'
import ProjectPage from './pages/projectPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: '/pageeditor/:pageId',
        element: <PageEditor />
      },
      {
        path: '/project/:projectId',
        element: <ProjectPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
