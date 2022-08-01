import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">Search</div>
      </>
    );
  }
}
