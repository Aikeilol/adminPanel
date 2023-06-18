import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { heroesFetched, heroesFetchingError } from '../../actions';


const HeroesAddForm = () => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [element, setElement] = useState('all')

    const { request } = useHttp()
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filters)
    const onSubmit = (e) => {
        e.preventDefault()
        const id = uuidv4()
        const heroData = {
            id,
            name,
            description,
            element,
        }

        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(heroData))
            .then(() => {
                request("http://localhost:3001/heroes").then(data => dispatch(heroesFetched(data)))
            })
            .catch(() => dispatch(heroesFetchingError()))
    }
    
    return (
        <form onSubmit={onSubmit} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    style={{ "height": '130px' }} />
            </div>
            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    onChange={(e) => setElement(e.target.value)} 
                    value={element}>
                    {filters.map(filter => {
                        return <option key={filter} value={filter}>{filter}</option>
                    })}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;