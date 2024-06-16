import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserContextProvider from './context/UserContextProvider'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/AboutUs.jsx'
import Contact from './components/Contact/ContactUs.jsx'
import Quiz from './components/Quiz/Quiz.jsx'
import SignIn from './components/SignIn/SignIn.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import Profile from './components/Profile/Profile.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "About",
        element: <About />
      },
      {
        path: "Contact",
        element: <Contact />
      },
      {
        path: "Quiz",
        element: <Quiz />
      },
      {
        path: "SignIn",
        element: <SignIn />
      },
      {
        path: "SignUp",
        element: <SignUp />
      },
      {
        path: "Profile",
        element: <Profile />
      }

    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
  // </React.StrictMode>
)
