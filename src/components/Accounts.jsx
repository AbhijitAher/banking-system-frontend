import React from 'react'
import '../App.css'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Accounts({ state, setState }) {
  useEffect(() => {
    getAllUser()
  }, [])

  console.log('state', state)

  const getAllUser = (email, password) => {
    setState({ isLoading: true, ...state })
    axios
      .get(`http://localhost:3030/user/all`)
      .then((res) => {
        console.log('All Users Response', res)
        let customers = res.data.items.filter((users) => users.isBanker != true)
        setState({ ...state, allUsers: customers })
      })
      .catch((e) => {
        console.log('Error', e)
      })
    setState({ ...state, isLoading: false })
  }

  return (
    <div className="width-80">
      <h2>Accounts</h2>

      {state.userLoggedIn && state.allUsers ? (
        <div className="accounts-table">
          <div className="row accounts-table-header">
            <div>Customer Name</div>
            <div>Customer Email</div>
            <div>Account Balance</div>
          </div>
          {state?.allUsers?.map((user) => {
            return user.email !== state.userLoggedIn.email || !user.isBanker ? (
              <Link to={`/accounts/${user.email}`}>
                <div className="row">
                  <div>{user.name}</div>
                  <div>{user.email}</div>
                  <div>{user.balance}</div>
                </div>
              </Link>
            ) : null
          })}
        </div>
      ) : null}
    </div>
  )
}
