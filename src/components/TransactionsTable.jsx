import React from 'react'
import { Button, Modal } from 'antd'
import '../App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import TransactionModal from './TransactionModal'

export default function TransactionsTable({ state, setState }) {
  const [transactionData, setTransactionData] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [transactionType, setTransactionType] = useState('')

  const showModal = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (!state?.userLoggedIn?.isBanker) {
      getTransactionData(state?.userLoggedIn?._id)
    } else if (state?.userLoggedIn?.isBanker) {
      getTransactionData(state?.selectedAccount)
      console.log('banker accounts transactions', state)
    }
  }, [
    state?.userLoggedIn?._id,
    state?.userLoggedIn?.balance,
    state?.selectedAccount,
  ])

  const handleLogout = () => {
    setState({ ...state, userLoggedIn: false })
    setTransactionData(false)
  }

  const getTransactionData = (userID) => {
    setState({ isLoading: true, ...state })
    console.log('from getTransaction', userID)
    axios
      .get(`http://localhost:3030/transaction/transact?userID=${userID}`)
      .then((res) => {
        console.log('Transactions Response', res)
        setTransactionData(res.data.transactions.reverse())
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
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <div>
            <span>Balance: ₹ {state.userLoggedIn?.balance}</span>
            <Button
              type="primary"
              className="button"
              onClick={() => {
                setTransactionType('deposit')
                showModal()
              }}
            >
              Deposit
            </Button>
            <Button
              type="primary"
              className="button"
              onClick={() => {
                setTransactionType('withdraw')
                showModal()
              }}
            >
              Withdraw
            </Button>
          </div>
        </div>
      ) : null}

      {state?.userLoggedIn && transactionData ? (
        <div className="transaction-table">
          <div className="row transaction-table-header">
            <div className="lp-10">Transaction Date</div>
            <div className="text-center">Transaction Time</div>
            <div className="text-center">Amount</div>
            <div>Type</div>
          </div>
          {transactionData?.map((transaction) => (
            <div className="row">
              <div className="lp-10">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </div>
              <div className="text-center">
                {new Date(transaction.createdAt).toLocaleTimeString()}
              </div>
              <div className="text-center">{transaction.amount + ' ₹'}</div>
              <div>{transaction.type.toUpperCase()}</div>
            </div>
          ))}
        </div>
      ) : null}

      <TransactionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        transactionType={transactionType}
        state={state}
        setState={setState}
      />
    </div>
  )
}
