import routes from './app.routes'
import { RouterProvider } from 'react-router'
import './App.css'
import { UserProvider } from '../context/UserContext'

function App() {
  return (
    <UserProvider>
      <RouterProvider router={routes} />
    </UserProvider>
  )
}

export default App
