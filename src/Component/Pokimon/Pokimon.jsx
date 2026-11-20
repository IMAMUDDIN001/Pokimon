function Pokimon({ name, url, type }) {
    return (
        <div className="pokimon">
            <h4>{name}</h4>
            <img src={url} alt={name} />
            <p>Type: {type.map(pokemonType => pokemonType.type.name).join(', ')}</p>
        </div>
    )

}

export default Pokimon