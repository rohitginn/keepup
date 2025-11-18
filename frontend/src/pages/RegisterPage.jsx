import { SignupForm } from '../components/signup-form'
import React from 'react'

const RegisterPage = ({ setIsRegister }) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg font-inter">
        <SignupForm setIsRegister={setIsRegister} />
      </div>
    </div>
  )
}

export default RegisterPage