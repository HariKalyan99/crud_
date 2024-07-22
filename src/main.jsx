import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './routes/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreatePost from './components/CreatePost'
import Dashboard from './components/Dashboard'
import Signup from './components/Authenticate/Signup'
import Login from './components/Authenticate/Login'


const router = createBrowserRouter([
  {path: "/", element: <App />, children: [
    {path: "/", element: <Signup />},
    {path: "/login", element: <Login />},
    {path: "/createpost", element: <CreatePost />},
    {path: "/dashboard", element: <Dashboard />},
  ]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
