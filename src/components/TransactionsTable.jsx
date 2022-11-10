import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function TransactionsTable({ state, setState }) {
  const [transactionData, setTransactionData] = useState([])

  useEffect(() => {
    getTransactionData()
  }, [])

  const handleLogout = () => {
    setState({ ...state, userLoggedIn: false })
  }

  const getTransactionData = () => {
    setState({ isLoading: true, ...state })
    axios
      .get('')
      .then((res) => {
        setTransactionData()
      })
      .catch((e) => {
        console.log('Error', e)
      })
    setState({ isLoading: true, ...state })
  }

  return state?.isLoading ? (
    <div>...Loading</div>
  ) : (
    <div>
      {!state?.userLoggedIn?.isBanker && state?.userLoggedIn ? (
        <div>
          <h5>{state.userLoggedIn.name} (customer) logged In</h5>
          <button className='button' onClick={handleLogout}>Logout</button>
          <h2>Transaction Data Table</h2>
      <div>
        <button className='button'>Deposite</button>
        <button className='button'>Withdraw</button>
      </div>
        </div>
      ) : null}
      
    </div>
  )
}
