import React, { Component } from 'react';
import Header from './Header';

export default class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile">Profile</div>
      </>
    );
  }
}
