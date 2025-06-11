
import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import UserApi from '../entities/user/userApi';

function Footer() {


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
          <div>Телефон: 8943284293429</div>
          <div>
          ООО "Деловые информационные решения" • ИНН: 7720420114 КПП: 770301001 • Разработка компьютерного программного обеспечения (62.01)
            123112, Москва, Пресненская наб., д. 6 стр. 2, помещ. 5313 • contact@rusprofile.ru
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Footer;
