import { Link } from 'react-router-dom';

function Pokimon({ id, name, url, type }) {
    return (
        <Link className="pokimon" to={`/pokemon/${id}`} aria-label={`View ${name} details`}>
            <h4>{name}</h4>
            <img src={url} alt="" />
            <p>Type: {type.map(pokemonType => pokemonType.type.name).join(', ')}</p>
        </Link>
    )

}

export default Pokimon