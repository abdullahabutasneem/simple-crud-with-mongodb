import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import User from './User'
import Update from './Update'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App></App>
  },
  {
    path: "/books",
    element: <User></User>,
    loader: () => fetch('http://localhost:5000/books/')
  },
  {
    path: "/update/:id",
    element: <Update></Update>,
    loader: ({params}) => fetch(`http://localhost:5000/books/${params.id}`)
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
