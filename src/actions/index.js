import { createAction } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetched, heroesFetchingError } from '../components/heroesList/heroesSlice'


export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetching = createAction('HEROES_FETCHING')

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetched = createAction('HEROES_FETCHED')

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')


// export const heroDelete = (heroes, id) => {
//     return {
//         type: 'HERO_DELETE',
//         payload: heroes.filter(hero => hero.id !== id),
//     }
// }

// export const heroDelete = createAction('HERO_DELETE', (heroes, id) => {
//     return {
//         payload: heroes.filter(hero => hero.id !== id)
//     }
// })

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters,
//     }
// }

// export const filterActive = (filterName) => {
//     return {
//         type: 'FILTER_ACTIVE',
//         payload: filterName,
//     }
// }