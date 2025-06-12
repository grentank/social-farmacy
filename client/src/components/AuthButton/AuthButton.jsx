import React from 'react';
import Button from 'react-bootstrap/Button';

export default function AuthButton({ isLogin }) {
  return (
    <Button
      variant={isLogin ? 'primary' : 'success'}
      type="submit"
      className="w-100"
    >
      {isLogin ? 'Войти' : 'Зарегистрироваться'}
    </Button>
  );
}