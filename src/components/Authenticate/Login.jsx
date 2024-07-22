import React, { useRef } from 'react'

const Login = () => {
    const refUsername = useRef("")
    const refPassword = useRef("")
    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div className='h-100 w-100 d-flex justify-content-center'>
        <form onSubmit={(e) => handleSubmit(e)} className='w-100 h-100 d-flex flex-column justify-content-center align-items-center m-5'>
            <label id='username'><span className='fw-bold fs-2'>Username</span></label>
            <input type="text" placeholder='Username' ref={refUsername} required/>
            
            <label id='password'><span className='fw-bold fs-2'>Password</span></label>
            <input type="text" placeholder='password' ref={refPassword} required/>

        </form>
    </div>
  )
}

export default Login