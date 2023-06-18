import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
  const { heroes, heroesLoadingStatus, activeFilter } = useSelector(state => state);
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
    request(`http://localhost:3001/heroes/${id}`, 'DELETE').then(() => dispatch(heroDelete(heroes, id)))
  }

  const renderHeroesList = (arr) => {
    if (activeFilter !== 'all') {
      arr = arr.filter(item => item.element === activeFilter)
    }
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>
    }

    return arr.map(({ id, ...props }) => {
      return <HeroesListItem heroDelete={() => onHeroDelete(id)} key={id} {...props} />
    })
  }

  const elements = renderHeroesList(heroes);
  return (
    <ul>
      {elements}
    </ul>
  )
}

export default HeroesList;