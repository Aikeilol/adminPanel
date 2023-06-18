import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { filtersFetched } from '../../actions';
import { useEffect } from 'react';

import './app.scss';

const App = () => {
    
    const dispatch = useDispatch()
    const { request } = useHttp()
    useEffect(() => {
        request('http://localhost:3001/filters').then(data => dispatch(filtersFetched(data)))
        // eslint-disable-next-line
    }, [])

    return (
        <main className="app">
            <div className="content">
                <HeroesList />
                <div className="content__interactive">
                    <HeroesAddForm />
                    <HeroesFilters />
                </div>
            </div>
        </main>
    )
}

export default App;