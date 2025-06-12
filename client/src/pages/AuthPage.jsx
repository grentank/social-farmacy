import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { UserApi } from '../services/UserApi'; 
import AuthButton from '../components/AuthButton/AuthButton';

export default function AuthPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = isLogin
        ? await UserApi.login(form)
        : await UserApi.register(form);

      setCurrentUser(data.user || null);
      alert(data.message || 'Успешно');
    } catch (error) {
      alert(error.response?.data?.error || 'Ошибка при отправке');
    }
  };

  const handleLogout = async () => {
    try {
      await UserApi.logout();
      setCurrentUser(null);
      alert('Вы вышли из системы');
    } catch (error) {
      alert('Ошибка при выходе');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Введите имя"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Введите email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <AuthButton isLogin={isLogin} />
      </Form>

      <Button
        variant="link"
        onClick={() => setIsLogin(!isLogin)}
        className="mt-3 w-100"
      >
        Переключиться на {isLogin ? 'регистрацию' : 'вход'}
      </Button>

      {currentUser && (
        <>
          <p className="mt-3">Вы вошли как: {currentUser.name || currentUser.email}</p>
          <Button variant="danger" onClick={handleLogout}>Выйти</Button>
        </>
      )}
    </div>
  );
}

