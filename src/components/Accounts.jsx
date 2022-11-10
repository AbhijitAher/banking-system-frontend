import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export default function Accounts({ state, setState }) {

  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = (email, password) => {
    setState({ isLoading: true, ...state })
    axios
      .get(`http://localhost:3030/user/all`)
      .then((res) => {
        console.log('All Users Response', res)
        let customers = res.data.items.filter((users)=> users.isBanker != true)
        setState({ ...state, allUsers: customers  })
      })
      .catch((e) => {
        console.log('Error', e)
      })
    setState({...state, isLoading: false  })
  }

  return (
    state.allUsers ? 
        <div>
        {state?.allUsers?.map((user) => {
            return user.email !== state.userLoggedIn.email || !user.isBanker ? (
                <div className="row">
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{}</div>
                </div>
                ) : null
            })}
            </div>
    : null
  )
}
