
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserApi } from "../services/UserApi";
import AuthButton from "../components/AuthButton/AuthButton";
import { Navigate, useNavigate } from "react-router";
import "./AuthPage.css";
export default function AuthPage({setCurrentUser, currentUser}) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()
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
      alert(data.message || "Успешно");
      // console.log({data});
      // Очищаем инпуты
      setForm({ name: "", email: "", password: "" });
      navigate('/main')
    } catch (error) {
      alert(error.response?.data?.error || "Ошибка при отправке");
    }
  };

  const handleLogout = async () => {
    try {
      await UserApi.logout();
      setCurrentUser(null);
      alert("Вы вышли из системы");
    } catch (error) {
      alert("Ошибка при выходе");
    }
  };

  // const backgroundStyle = {
  //   backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20240720/pngtree-tablets-in-bulk-are-multicolored-on-a-blue-background-the-concept-image_15902349.jpg')",
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  //   minHeight: "55vh",
  //   padding: "20px"
  // };

  // const formStyle = {
  //   backgroundColor: "rgba(255, 255, 255, 0.9)",
  //   padding: "20px",
  //   borderRadius: "10px",
  //   maxWidth: "400px",
  //   margin: "0 auto"
  // };

  return (
   <div className="auth-bg">
  <div className="auth-form-wrap">
        <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
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
          onClick={() => {
            setIsLogin(!isLogin);
            setForm({ name: "", email: "", password: "" });
          }}
          className="mt-3 w-100"
        >
          Переключиться на {isLogin ? "регистрацию" : "вход"}
        </Button>

        {currentUser && (
          <>
            <p className="mt-3">
              Вы вошли как: {currentUser.name || currentUser.email}
            </p>
            <Button variant="danger" onClick={handleLogout}>
              Выйти
            </Button>
          </>
        )}
      </div>
    </div>
  );
}