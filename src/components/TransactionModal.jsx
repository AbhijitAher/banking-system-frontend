import { Button, Modal } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'

export default function TransactionModal({
  isModalOpen,
  setIsModalOpen,
  transactionType,
  state,
  setState,
}) {
  const [isDisabled, setIsDisabled] = useState(true)
  const [amt, setAmt] = useState(false)

  const handleOk = (type) => {
    axios
      .post('http://localhost:3030/transaction', {
        data: {
          user: state?.userLoggedIn?._id,
          amount: amt,
          type: type,
        },
      })
      .then((res) => {
        // console.log('Transactions Response', res)

        setState({
          ...state,
          userLoggedIn: {
            ...state.userLoggedIn,
            balance: res.data.user.balance,
          },
        })
        setAmt(false)
      })
      .catch((e) => {
        console.log('Error', e)
      })
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleAmountChange = (e, type) => {
    // console.log(e.target.value)
    setAmt(+e.target.value)
    if (transactionType == 'deposit') {
      setIsDisabled(false)
    }
    if (!state?.userLoggedIn?.isBanker && transactionType != 'deposit') {
      if (
        state.userLoggedIn.balance < e.target.value ||
        e.target.value == '' ||
        e.target.value == 0
      ) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    }
  }

  return (
    <>
      <Modal
        title={transactionType == 'deposit' ? 'Deposit' : 'Withdraw'}
        open={isModalOpen}
        onOk={() => {
          transactionType == 'deposit'
            ? handleOk('deposit')
            : handleOk('withdraw')
        }}
        onCancel={handleCancel}
        okButtonProps={{ disabled: isDisabled }}
      >
        <h3>Balance: ₹ {state.userLoggedIn?.balance} </h3>
        <input
          type="number"
          placeholder="Enter Amount"
          onChange={(e) => {
            handleAmountChange(e)
          }}
        />
        {isDisabled && amt > 0 ? (
          <div className="text-red">Insufficient Funds</div>
        ) : null}
      </Modal>
    </>
  )
}
