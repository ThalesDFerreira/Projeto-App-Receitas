import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Login() {
  const { handleChange, isDisabled, handleSubmit } = useContext(MyContext);

  return (
    <div>
      <h1>Login</h1>
      <br />
      <h1> Email :</h1>
      <label htmlFor="email">
        <input
          type="email"
          id="email"
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
        />
      </label>
      <br />
      <h1> Senha :</h1>
      <label htmlFor="senha">
        <input
          type="password"
          id="senha"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
        />
      </label>
      <br />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
