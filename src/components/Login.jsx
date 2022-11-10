import React from 'react'
import '../App.css'
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

  const handleLogout = () => {
    setState({ ...state, userLoggedIn: false })
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
    <div className="ml-100">
      {!state.userLoggedIn ? (
        <div className="width-300">
          <h3 className="text-center">User Login</h3>
          <form onSubmit={handleOnSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="textbox"
            />
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="textbox"
            />
            <br />
            <input type="submit" className="button" />
          </form>
        </div>
      ) : null}

      {state?.userLoggedIn?.isBanker ? (
        <div>
          <h5>{state.userLoggedIn.name} (banker) logged In</h5>
          <button className='button' onClick={handleLogout}>Logout</button>
          <Accounts state={state} setState={setState} />
        </div>
      ) : null}

      <TransactionsTable state={state} setState={setState} />
    </div>
  )
}
