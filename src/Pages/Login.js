import React from 'react';

function Login() {
  // enableButton = () => {
  //   const { inputName, inputEmail } = useState();
  //   const minCharacters = 1;
  //   const regex = /\S+@\S+\.\S+/;
  //   if (inputName.length >= minCharacters
  //     && regex.test(inputEmail)) {
  //     setState({ isEnabled: true });
  //   } else {
  //     setState({ isEnabled: false });
  //   }
  // };
  return (
    <div>
      <label htmlFor="email">
        <input
          type="email"
          id="email"
          data-testid="email-input"
          onChange={ handleChangeEmail }
          value={ email }
        />
      </label>
      <br />
      <label htmlFor="senha">
        <input
          type="password"
          id="senha"
          data-testid="password-input"
          // minLength="6"
          // onChange={ this.setInput }
          // value={ senha }
        />
      </label>
      <br />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonDisabled }
        // onClick={ this.handleClick }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
