import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'


function App() {
  const [color, setColor] = useState("#646cff")
  const [count, setCount] = useState(0)
  const viteURL = "https://vitejs.dev"
  const reactURL = "https://react.dev"
  const bgChange = (e) => {
    const button = e.target; // Get the button element
    const computedStyle = window.getComputedStyle(button); // Get the computed style
    // Retrieve the background color
    const backgroundColor = computedStyle.backgroundColor;
    setColor(backgroundColor)
    setTimeout(() => setColor("#646cff"), 2000)
  }
  return (
    <>
     
    </>
  )
}

export default App