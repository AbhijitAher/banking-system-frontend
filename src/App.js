import './App.css'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = async () => {
    const response = await fetch('http://localhost:3030/user')
    let data = await response.json()
    console.log(data)
  }

  return <div className="App">
    <h3>Banker System</h3>
  </div>
}

export default App
