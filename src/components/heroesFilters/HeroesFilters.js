import { useDispatch, useSelector } from 'react-redux';
import { filterActive } from '../../actions';

const buttonCollors = {
    all: 'btn-outline-dark',
    fire: 'btn-danger',
    water: 'btn-primary',
    wind: 'btn-success',
    earth: 'btn-secondary',
}

const HeroesFilters = () => {
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filters.filters)
    const activeFilter = useSelector(state => state.filters.activeFilter)

    const onSetActiveFilter = (filterName) => {
        dispatch(filterActive(filterName))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(filter => {
                        return <button key={filter} onClick={() => onSetActiveFilter(filter)} className={`btn ${buttonCollors[filter]} ${activeFilter === filter ? 'active' : ''}`}>
                            {filter}
                        </button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;