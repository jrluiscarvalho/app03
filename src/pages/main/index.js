import React, {
  Component,
  Fragment
} from 'react'

import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'
import {
  Creators as FavoriteActions
} from '../../store/ducks/favorites'
 
class Main extends Component {
  state = {
    repositoryInput: '',
  };

  handleAddRepository = (event) => {
    event.preventDefault();
    this.props.addFavoriteRequest(this.state.repositoryInput);
    this.setState({
      repositoryInput: ''
    })
  }

  render(){
    return (
      <Fragment>
        <form onSubmit={this.handleAddRepository}>
          <input 
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({repositoryInput: e.target.value})}
            />
          <button type="submit">Adicionar</button>

          {this.props.favorites.loading && <span>Carregando...</span>}

          { !! this.props.favorites.error && <span>{this.props.favorites.error}</span>}
        </form>

        <ul>
          {this.props.favorites.data.map(f => (
            <li key={f.id}>
              <p>
                <strong>{f.name}</strong> ({f.description})
              </p>
                <a href={f.url}>Acessar</a>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
})

const mapDispatchToProps = dispatch => bindActionCreators(FavoriteActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main)