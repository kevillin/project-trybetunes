import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  state = {
    searchArtist: '',
    buttonDisable: true,
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const validaSearchArtist = 2;
      const { searchArtist } = this.state;
      const buttonIsDisable = searchArtist.length < validaSearchArtist;
      this.setState({ buttonDisable: buttonIsDisable });
    });
  }

  render() {
    const { buttonDisable, searchArtist } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <input
            value={ searchArtist }
            onChange={ this.handleChange }
            type="text"
            name="searchArtist"
            id="searchArtist"
            data-testid="search-artist-input"
          />
          <button
            disabled={ buttonDisable }
            onChange={ this.handleChange }
            type="submit"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}
