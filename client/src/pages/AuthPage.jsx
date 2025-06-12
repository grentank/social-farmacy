import React from 'react'
import AuthButton from '../components/UserFormPage/UserFormPage'; 
import Form from 'react-bootstrap/Form';

export default function AuthPage() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder='Ввидите ваше имя' />
      <input name="email" placeholder='Ввидите ваш email' />
      <input name="password" placeholder='Введите пароль' />
      <AuthButton mode={'auth'} />
    </form>
  )
}

