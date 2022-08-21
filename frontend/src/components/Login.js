import { React, useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form className="login-form" noValidate onSubmit={handleSubmit}>
      <h2 className="login-form__header">Вход</h2>

      <input
        className="login-form__item"
        onChange={handleEmailChange}
        type="text"
        name="email"
        value={email}
        placeholder="Email"
        required
        minLength="2"
        maxLength="40"
      />
      <input
        className="login-form__item"
        onChange={handlePasswordChange}
        type="password"
        name="password"
        value={password}
        autoComplete="on"
        placeholder="Пароль"
        required
        minLength="2"
        maxLength="200"
      />

      <button className="login-form__save-button" type="submit">
        Войти
      </button>
    </form>
  );
};

export default Login;
