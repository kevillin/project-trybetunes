import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

export default class Album extends Component {
  state = {
    albunsTodos: [],
    primeiroAlbum: {},
    loading: false,
  };

  componentDidMount() {
    this.puxaMusica();
  }

  puxaMusica = async () => {
    this.setState({ loading: true });
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      albunsTodos: response,
      primeiroAlbum: response[0],
      loading: false,
    });
  };

  render() {
    const {
      primeiroAlbum,
      albunsTodos,
      loading,
    } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : null}
        <div data-testid="page-album">
          <h1 data-testid="album-name">{ primeiroAlbum.collectionName }</h1>
          <p data-testid="artist-name">{ primeiroAlbum.artistName }</p>
        </div>
        {albunsTodos.map((music, index) => index !== 0 && (
          <span key={ index }>
            <MusicCard
              music={ music }
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
