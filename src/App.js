import './App.css'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import Accounts from './components/Accounts'
import Transactions from './components/Transactions'
import { useState } from 'react'

const initialState = {
  isLoading: false,
  email: false,
  isBanker: false,
}
function App() {
  // useEffect(() => {
  //   getAllUsers()
  // }, [])

  // const getAllUsers = async () => {
  //   const response = await fetch('http://localhost:3030/user')
  //   let data = await response.json()
  //   console.log(data)
  // }
  const [state, setState] = useState(initialState)

  return (
    <div className="App">
      <h3>Banker System</h3>
      <Routes>
        <Route path="/" element={<Login state={state} setState={setState}/>}></Route>
        <Route path="/accounts" element={<Accounts state={state} setState={setState}/>}></Route>
        <Route path="/accounts/:email" element={<Transactions state={state} setState={setState}/>}></Route>
      </Routes>
    </div>
  )
}

export default App
