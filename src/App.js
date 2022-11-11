import './App.css'
import Login from './components/Login'
import { Routes, Route } from 'react-router-dom'
import Accounts from './components/Accounts'
import { useState } from 'react'
import { useEffect } from 'react'
import TransactionsTable from './components/TransactionsTable'
import 'antd/dist/antd.css'

const initialState = {
  isLoading: false,
  email: false,
  isBanker: false,
  allUsers: false,
}
function App() {
  // useEffect(() => {
  //   getAllUsers()
  // }, [])
  const [state, setState] = useState(initialState)

  useEffect(() => {
    // console.log('state', state)
  }, [state])
  // const getAllUsers = async () => {
  //   const response = await fetch('http://localhost:3030/user')
  //   let data = await response.json()
  //   console.log(data)
  // }

  return (
    <div className="App">
      <h3 className="text-center">Banker System</h3>
      <Routes>
        <Route
          path="/"
          element={<Login state={state} setState={setState} />}
        ></Route>
        {/* {state.userLoggedIn?.isBanker ? (
          <Route
            path={`/transactions/?${state?.selectedAccount}`}
            element={<TransactionsTable state={state} setState={setState} />}
          ></Route>
        ) : null} */}
      </Routes>
    </div>
  )
}

export default App
