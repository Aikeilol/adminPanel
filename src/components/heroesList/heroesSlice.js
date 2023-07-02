import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'loading',
}

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroesFetching: state => {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = 'idle'
      state.heroes = action.payload
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = 'error'
    },
    heroDelete: (state, action) => {
      state.heroes = action.payload
    },
  }
})

const { actions, reducer } = heroesSlice

export default reducer;

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDelete,
} = actions