import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Demo1 from './pages/Demo1'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    <Demo1 />
    </div>
  )
}

export default App
