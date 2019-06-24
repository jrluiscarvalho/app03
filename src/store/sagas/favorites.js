import {
    call,
    put,
    select
} from 'redux-saga/effects'
import api from '../../services/api'

import {
    Creators as FavoriteActions
} from '../ducks/favorites'


export default function* addFavorite(action) {

    try {
        const {
            data
        } = yield call(api.get, `/repos/${action.payload.repository}`)

        const isDuplicate = yield select(state => state.favorites.data.find(f => f.id === data.id))

        if(isDuplicate) {
            yield put(FavoriteActions.addFavoriteFailure("Repositorio Duplicado"));
        }else{
            const repositoryData = {
                id: data.id,
                name: data.name,
                description: data.description,
                url: data.url
            }
    
            yield put(FavoriteActions.addFavoriteSuccess(repositoryData));    
        }

        
    } catch (error) {
        yield put(FavoriteActions.addFavoriteFailure("Erro ao adicionar repositorio"));
        console.error(error)
    }


}