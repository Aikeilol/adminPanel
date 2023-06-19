import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { heroesFetching, heroesFetched, heroesFetchingError, heroDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
  const activeFilterSelector = createSelector(
    (state) => state.filters.activeFilter,
    (state) => state.heroes.heroes,
    (activeFilter, heroes) => {
      if (activeFilter !== 'all') {
        return heroes = heroes.filter(item => item.element === activeFilter)
      }
      return heroes
    }
  )
  // const { activeFilter } = useSelector(state => state.filters);
  const { heroesLoadingStatus, } = useSelector(state => state.heroes);
  const filteredHeroes = useSelector(activeFilterSelector)
  const dispatch = useDispatch();
  const { request } = useHttp();
  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()))

    // eslint-disable-next-line
  }, []);

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
  }

  const onHeroDelete = (id) => {
    request(`http://localhost:3001/heroes/${id}`, 'DELETE').then(() => dispatch(heroDelete(filteredHeroes, id)))
  }

  const renderHeroesList = (arr) => {

    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem heroDelete={() => onHeroDelete(id)} key={id} {...props} />
    })
  }

  const elements = renderHeroesList(filteredHeroes);
  return (
    <ul>
      {elements}
    </ul>
  )
}

export default HeroesList;