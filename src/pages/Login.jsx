import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    userInput: '',
    buttonDisabled: true,
    loading: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const liberBotaoNumber = 3;
      const { userInput } = this.state;
      const buttonIsDisable = userInput.length < liberBotaoNumber;
      this.setState({ buttonDisabled: buttonIsDisable });
    });
  };

  funcaoEnviaDado = async (name, event) => {
    this.setState({ loading: true });
    event.preventDefault();
    await createUser({ name });

    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { userInput, buttonDisabled, loading } = this.state;
    return (
      <>
        <div data-testid="page-login">Login</div>
        <forms>
          <input
            value={ userInput }
            onChange={ this.handleChange }
            data-testid="login-name-input"
            type="text"
            name="userInput"
            id="login-name-input"
          />

          <button
            disabled={ buttonDisabled }
            onChange={ this.handleChange }
            onClick={ (event) => this.funcaoEnviaDado(userInput, event) }
            data-testid="login-submit-button"
            type="submit"
          >
            Entrar
          </button>
          {loading ? <Loading /> : null}
        </forms>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};
