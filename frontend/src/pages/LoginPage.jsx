
import LoginForm  from '../components/login-form'
import React from 'react'

const LoginPage = ({ setIsRegister, onNavigate}) => {
  return (
    <div className='flex h-screen w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
      <LoginForm setIsRegister={setIsRegister} onNavigate={onNavigate} />
      </div>
    </div>
  )
}

export default LoginPage