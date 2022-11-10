import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function TransactionsTable({ state, setState }) {
  const [transactionData, setTransactionData] = useState([])

  useEffect(() => {
    getTransactionData()
  }, [])

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
      <h2>Transaction Data Table</h2>
    </div>
  )
}
