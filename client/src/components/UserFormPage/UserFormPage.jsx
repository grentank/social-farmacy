import { useState, useEffect } from 'react';

export default function AuthButton({ mode }) {
  const [authBut, setAuthBut] = useState(false);

  const handleClick = () => {
    setAuthBut((prev) => !prev); 
  };

  useEffect(() => {
    console.log('Текущее состояние:', authBut ? 'Регистрация' : 'Авторизация');
  }, [authBut]);

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: authBut ? 'green' : 'blue',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
      }}
    >
      {authBut ? 'Регистрация' : 'Авторизация'}
    </button>
  );
}

