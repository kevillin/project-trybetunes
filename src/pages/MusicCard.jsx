import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    trechosFav: [],
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const favorite = await getFavoriteSongs();
    this.setState({
      loading: false,
      trechosFav: favorite,
    });
  }

  pegaFavorito = async (music, event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { atualizaFavorito } = this.props;
    if (event.target.checked) {
      await addSong(music);
    } else if (!event.target.checked) {
      await removeSong(music);
    }
    const resgataFavorita = await getFavoriteSongs();
    this.setState({
      loading: false,
      trechosFav: resgataFavorita,
    });
    atualizaFavorito();
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loading, trechosFav } = this.state;
    return (
      <div>
        {loading ? <Loading /> : null}
        <h3>{trackName}</h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {`O seu navegador não suporta o elemento ${trackName}`}
          <code>audio</code>
        </audio>
        <label htmlFor="favorite-song">
          <h5>Favorita</h5>
          <input
            type="checkbox"
            name="favorite-song"
            id="favorite-song"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ trechosFav.some((fav) => (
              fav.trackId === music.trackId
            )) }
            onChange={ (event) => this.pegaFavorito(music, event) }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  atualizaFavorito: PropTypes.func,
};

MusicCard.defaultProps = {
  atualizaFavorito: () => { },
};
