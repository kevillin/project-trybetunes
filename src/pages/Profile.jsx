import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';

export default class Profile extends Component {
  state = {
    loading: false,
    user: {},
  }

  componentDidMount() {
    this.pegaInfoUsuario();
  }

  pegaInfoUsuario = async () => {
    this.setState({ loading: true });
    const usuarioInfo = await getUser();
    this.setState({
      user: usuarioInfo,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div data-testid="page-profile">
            <h1>Profile</h1>
            <img data-testid="profile-image" src="url-to-image" alt="profile-img" />
            <Link
              to="/profile/edit"
            >
              Editar perfil
            </Link>
            <h2>Name</h2>
            <h3>{user.name}</h3>
            <h2>E-mail</h2>
            <h3>{user.email}</h3>
            <h2>Descrição</h2>
            <h3>{user.description}</h3>
          </div>
        ) }

      </>
    );
  }
}
