import React, { useEffect, useState } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router';
import EditEntryPage from './components/pages/EditEntryPage';
import ErrorPage from './components/pages/ErrorPage';
import MainPage from './components/pages/MainPage';
import NewEntryPage from './components/pages/NewEntryPage';
import OneEntryPage from './components/pages/OneEntryPage';
import Layout from './components/Layout';
import LoginPage from './components/pages/LoginPage';
import RegPage from './components/pages/RegPage';
import { UserValidator } from './components/entities/user/userValidate';
import UserApi from './components/entities/user/userApi';
import { setAccessToken } from './components/shared/lib/axiosInstance';

const { VITE_API } = import.meta.env;

function App() {
  const [users, setUsers] = useState([]);

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [validateError, setValidateError] = useState('');

  const [user, setUser] = useState({});

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const { isValid, error } = UserValidator.validate(inputs);

      if (isValid) {
        const data = await UserApi.registration(inputs);
        if (data.statusCode === 200 && data.data.accessToken) {
          setUsers((users) => [...users, data.data.user]);
          setInputs({
            username: '',
            email: '',
            password: '',
          });
          setValidateError('');
        } else {
          console.log(error);
        }
      } else {
        setValidateError(error);
        console.log('Ошибка из валидатора', error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function loginHandler(e) {
    e.preventDefault();
    try {
      const { isValid, error } = UserValidator.validateLogin(inputs);

      if (isValid) {
        const data = await UserApi.login(inputs);
        if (data.statusCode === 200 && data.data.accessToken) {
          setUsers((users) => [...users, data.data.user]);
          setInputs({
            email: '',
            password: '',
          });
          setValidateError('');
        } else {
          console.log(error);
        }
      } else {
        setValidateError(error);
        console.log('Ошибка из валидатора', error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function inputsHandler(e) {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    console.log('Зашли в useEffect');
    const getUser = async () => {
      try {
        const data = await UserApi.refresh();
        // console.log('refresh data:+++++++++++++++++', data);
        if (data.statusCode === 200 && data.data.accessToken) {
          // ! ! ! ! ! !
          setUser((pre) => ({ ...pre, ...data.data.user }));
          setAccessToken(data.data.accessToken);
          console.log(data.data.accessToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  // console.log(user, '-----------------------');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} setUser={setUser}/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Navigate to="/entries" />,
        },
        {
          path: '/entries',
          element: <MainPage />,
        },
        {
          path: '/entries/new',
          element: <NewEntryPage />,
        },
        {
          path: '/entries/:id',
          element: <OneEntryPage />,
        },
        {
          path: '/entries/:id/edit',
          element: <EditEntryPage />,
        },
        {
          path: '/login',
          element: (
            <LoginPage
              loginHandler={loginHandler}
              inputsHandler={inputsHandler}
              inputs={inputs}
              user={user}
              setUser={setUser}
            />
          ),
        },
        {
          path: '/registration',
          element: (
            <RegPage
              submitHandler={submitHandler}
              inputsHandler={inputsHandler}
              inputs={inputs}
              user={user}
              setUser={setUser}
            />
          ),
        },
         {
          path: '/basket',
          element: (
            <Basket
            />
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
