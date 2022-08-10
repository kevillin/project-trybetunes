import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

export default class Album extends Component {
  state = {
    albunsTodos: [],
    primeiroAlbum: {},
    // carregando: false,
  };

  componentDidMount() {
    this.puxaMusica();
  }

  puxaMusica = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      albunsTodos: response,
      primeiroAlbum: response[0],
    });
  };

  render() {
    const {
      primeiroAlbum,
      albunsTodos,
    } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1 data-testid="album-name">{ primeiroAlbum.collectionName }</h1>
          <p data-testid="artist-name">{ primeiroAlbum.artistName }</p>
        </div>
        {albunsTodos.map((music, index) => index !== 0 && (
          <span key={ index }>
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
            />
          </span>
        ))}
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
