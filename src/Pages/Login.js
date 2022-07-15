import React, { useState } from 'react';

function Login() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [disable, setEnabled] = useState(false);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
    enableButton(); // retorna a funcao enable e muda o estado.
  };

  enableButton = () => {
    const { password, email } = state; // mudar o estado
    const minCharacters = 6;
    const regex = /\S+@\S+\.\S+/;
    if (password.length >= minCharacters // se a senha for maior ou igual a 6, e conferindo se o email e um email
      && regex.test(email)) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  };
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
          onChange={ handleChange }
          // value={ context } nao precisa mais por conta de estar tudo no
        />
      </label>
      <br />
      <h1> Senha :</h1>
      <label htmlFor="senha">
        <input
          type="password"
          id="senha"
          data-testid="password-input"
          onChange={ handleChange }
          // value={ senha } mesma coisa
        />
      </label>
      <br />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disable }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
