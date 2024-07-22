import React, { useContext } from 'react'
import Signup from './Signup'
import { blogStore } from '../../store/Blogstore'
import Login from './Login'

const Auth = () => {

    const {getAuthenticate} = useContext(blogStore)
  return (
    <div>
    {getAuthenticate === "signup" ? 
        <Signup /> : <Login />}
        </div>
  )
}

export default Auth