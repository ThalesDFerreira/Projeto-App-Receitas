import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Login() {
  const { handleChange, isDisabled, handleSubmit } = useContext(MyContext);

  return (
    <div
      className="flex flex-col
      h-screen
      justify-center
      items-center
      login-page
      "
    >
      <p
        className="title-app
        text-5xl"
      >
        TastyFood

      </p>
      <div
        className="flex flex-col

        "
      >

        <input
          type="email"
          id="email"
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
          placeholder="Email"
          className="login-input
          "
        />

        <br />
        <input
          type="password"
          id="senha"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
          placeholder="Password"
          className="login-input"

        />
        <br />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleSubmit }
          className="login-button
        w-full
        py-1
        rounded-lg
        bg-red-500
        disabled:bg-red-300
        text-white
        "
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
