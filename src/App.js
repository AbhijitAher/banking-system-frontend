import './App.css'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    getAllUsers()
  }, [])

  const getAllUsers = () => {
    fetch('http://localhost:3030/user')
      .then(async (res) => {
        let users = await res.json()
        console.log(users)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return <div className="App"></div>
}

export default App
