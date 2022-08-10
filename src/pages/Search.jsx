import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

export default class Search extends Component {
  state = {
    buttonDisable: true,
    carregando: false,
    artistSongs: [],
    confereRetorno: false,
    artistName: '',
    searchArtist: '',
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

  renderizaArtista = async (event) => {
    event.preventDefault();
    this.setState({ carregando: true }, async () => {
      const { searchArtist } = this.state;
      const artistInfo = await searchAlbumsAPI(searchArtist);
      this.setState({
        artistName: searchArtist,
        artistSongs: artistInfo,
        searchArtist: '',
        carregando: false,
        confereRetorno: true,
      });
    });
  };

  render() {
    const {
      buttonDisable,
      searchArtist,
      artistSongs,
      carregando,
      artistName,
      confereRetorno,
    } = this.state;

    return (
      <>
        <Header />
        {carregando ? <Loading /> : (
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
              onClick={ this.renderizaArtista }
              type="button"
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
            {confereRetorno && artistSongs.length === 0
              ? <h1>Nenhum álbum foi encontrado</h1>
              : <h1>{`Resultado de álbuns de: ${artistName}`}</h1>}
            {
              artistSongs.map((artist) => (
                <>
                  <p data-testid="artist-name">{artist.artistName}</p>
                  <p>{artist.collectionName}</p>
                  <p>{artist.collectionPrice}</p>
                  <img src={ artist.artworkUrl100 } alt={ artist.artistName } />
                  <p>{artist.trackCount}</p>

                  <Link
                    to={ `/album/${artist.collectionId}` }
                    data-testid={ `link-to-album-${artist.collectionId}` }
                    key={ `${artist.collectionId}` }
                  >
                    Acesse o Album
                  </Link>
                </>
              ))
            }
          </div>
        )}

      </>

    );
  }
}
