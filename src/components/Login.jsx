import React from 'react'
import axios from 'axios'
import TransactionsTable from './TransactionsTable'
import Accounts from './Accounts'

export default function Login({ state, setState }) {
  const handleOnSubmit = (e) => {
    e.preventDefault()
    let email = e.target[0].value
    let password = e.target[1].value

    console.log(e)
    if (email && password) {
      console.log({ email, password })
      getUser(email, password)
    }
  }

  const getUser = (email, password) => {
    setState({ isLoading: true, ...state })
    axios
      .get(`http://localhost:3030/user/`, {
        params: {
          email: email,
          password: password,
        },
      })
      .then((res) => {
        console.log('Login Response', res)
        setState({ ...state, userLoggedIn: res.data.user })
      })
      .catch((e) => {
        console.log('Error', e)
      })
    setState({ isLoading: false, ...state })
  }

  return (
    <div>
      <h3>User Login</h3>
      <form onSubmit={handleOnSubmit}>
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <input type="submit" />
      </form>
      <TransactionsTable state={state} setState={setState} />
      {state.userLoggedIn?
      <Accounts state={state} setState={setState} /> : null
      }
    </div>
  )
}
