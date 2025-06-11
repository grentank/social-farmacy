
import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import UserApi from '../entities/user/userApi';

function Header({ user, setUser}) {
  console.log(user, "---------------------------------")
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const data = await UserApi.logout()
      console.log(data)
      if (data.statusCode === 200) {
        setUser(() => ({}))
        navigate('/')
      } else {
        console.log(data.error)
      }
    } catch (error) {
      console.log(error)
      return alert(error.response.data.error)
    }
  }

  return (
    <header role="banner" className="mar-t-5 pad-t-2 pad-b-4 pad-s-1 wrap-float bg-white">
      <div className="max-w-700 center wrap-float">
        <nav className="clearfix mar-b-1">
          <ul className="no-bullets no-margin no-padding right">
            <li className="pipe-separate t-light-green left">
              <NavLink to="/">Главная</NavLink>
            </li>
            {user.username ? (
              <li className="pipe-separate t-light-green left" onClick={logoutHandler}>
                <NavLink to="/">Выйти</NavLink>
              </li>
            ) : (
              <>
                <li className="pipe-separate t-light-green left">
                  <NavLink to="/login">Войти</NavLink>
                </li>
                <li className="pipe-separate t-light-green left" >
                  <NavLink to="/registration">Зарегистрироваться</NavLink>
                </li>
              </>
            )}
             <li className="pipe-separate t-light-green left" >
                <img src="/images/basket.png" alt="brokk"/>
                 <NavLink to="/basket">Корзина</NavLink>
                </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
