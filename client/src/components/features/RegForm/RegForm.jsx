

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { UserValidator } from '../../entities/user/userValidate';
import UserApi from '../../entities/user/userApi';
import { setAccessToken } from '../../shared/lib/axiosInstance';

const INITIAL_INPUT_DATA = {
  username: '',
  email: '',
  password: ''
}

export default function RegForm({ user, setUser}) {

  const [inputs, setInputs] = useState(INITIAL_INPUT_DATA)

  const navigate = useNavigate()
  
  const changeHandler = (event) => {
    setInputs((pre) => ({...pre, [event.target.name]: event.target.value}))
  }

  const sumbitHandler = async (e) => {
    e.preventDefault()
    try {
      const { isValid, error } = UserValidator.validate(inputs)

      if (isValid) {
        const data = await UserApi.registration(inputs)
        if (data.statusCode === 200 && data.data.accessToken) {
          // setUsers((pre) => [...pre, data.data.user])
          setUser((pre) => ({...pre, ...data.data.user}))
          // * сохраняем токен на клиенте
          setAccessToken(data.data.accessToken)
          navigate('/')  
        } else {
          console.log('============>>', data.response.data)
          return alert(data.response.data.error)
        }
      } else {
        console.log('Ошибка из валидатора', error)
        return alert(error)
      }
    } catch (error) {
      console.log('~~~~~~>>', error)
      return alert(error.response.data.error)
    }
  }

  return (
    <>
    <form onSubmit={sumbitHandler}> 
      <div>
        <div>Name</div>
        <input name="username" type="text" required onChange={changeHandler} value={inputs.username}/>
        <div>Email</div>
        <input name="email" type="email" required onChange={changeHandler} value={inputs.email}/>
        <div>Password</div>
        <input name="password" type="password" required onChange={changeHandler} value={inputs.password}/>
      </div>
      <button type='submit'>Зарегистрироваться</button>
      </form>
    </>
  );
}
