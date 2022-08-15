import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';

export default class Favorites extends Component {
  state = {
    loading: true,
    listaFavoritas: [],
  };

  componentDidMount() {
    this.pegaFavoritas();
  }

  pegaFavoritas = () => {
    this.setState({ loading: true }, async () => {
      const favoritas = await getFavoriteSongs();
      this.setState({
        listaFavoritas: favoritas,
        loading: false,
      });
    });
    // não está renderizando, tentei usar a lógica do MusicCard, mas não está dando certo.
  }

  render() {
    const { loading, listaFavoritas } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div data-testid="page-favorites">
            <h1>Musicas Favoritas</h1>
            {listaFavoritas.map((music, index) => (
              <span key={ index }>
                <MusicCard
                  music={ music }
                  atualizaFavorito={ this.pegaFavoritas }
                />
              </span>
            ))}
          </div>
        )}
      </>
    );
  }
}
