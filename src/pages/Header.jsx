import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    userInput: '',
    loading: false,
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({
        userInput: user.name,
        loading: false,
      });
    });
  }

  render() {
    const { userInput, loading } = this.state;
    return (
      <>
        <header data-testid="header-component">
          <div data-testid="header-user-name">{userInput}</div>
          <Link to="/search" data-testid="link-to-search">search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </header>

        {loading ? <Loading /> : null}
      </>
    );
  }
}
