import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom';
import Pokidex from '../Pokidex/Pokidex';
import './PokemonDetails.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const MAX_BASE_STAT = 255;

const typeColors = {
    bug: '#84a83b',
    dark: '#595365',
    dragon: '#6f59d9',
    electric: '#d9a51a',
    fairy: '#d879a8',
    fighting: '#c34b3c',
    fire: '#e27646',
    flying: '#8297cf',
    ghost: '#725b91',
    grass: '#67a95b',
    ground: '#c49b52',
    ice: '#64b8c5',
    normal: '#9299a3',
    poison: '#a45ca1',
    psychic: '#dd6481',
    rock: '#a89353',
    steel: '#7c91a0',
    water: '#548ed2'
};

function getStatFillPercentage(value) {
    const boundedValue = Math.min(Math.max(value, 0), MAX_BASE_STAT);
    return `${(boundedValue / MAX_BASE_STAT) * 100}%`;
}

function PokemonDetails() {
    const { pokemonId } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        let isCurrentRequest = true;

        async function loadPokemon() {
            setPokemon(null);
            setError('');

            try {
                const { data } = await axios.get(`${API_URL}/${pokemonId}`);
                if (isCurrentRequest) setPokemon(data);
            } catch {
                if (isCurrentRequest) {
                    setError('Unable to load this Pokémon. Please try again.');
                }
            }
        }

        loadPokemon();
        return () => {
            isCurrentRequest = false;
        };
    }, [pokemonId]);

    if (error) {
        return (
            <main className="pokemon-details-page">
                <Link className="pokemon-details-back" to="/">← Back to Pokédex</Link>
                <p className="pokemon-details-message" role="alert">{error}</p>
            </main>
        );
    }

    if (!pokemon) {
        return (
            <main className="pokemon-details-page">
                <Link className="pokemon-details-back" to="/">← Back to Pokédex</Link>
                <p className="pokemon-details-message" role="status">Loading Pokémon details…</p>
            </main>
        );
    }

    const primaryType = pokemon.types[0]?.type.name ?? 'normal';
    const artwork = pokemon.sprites.other?.['official-artwork']?.front_default
        ?? pokemon.sprites.other?.dream_world?.front_default
        ?? pokemon.sprites.front_default;

    return (
        <main
            className="pokemon-details-page"
            style={{ '--pokemon-accent': typeColors[primaryType] ?? '#64748b' }}
        >
            <Link className="pokemon-details-back" to="/">← Back to Pokédex</Link>
            <article className="pokemon-details-card">
                <header className="pokemon-details-header">
                    <div>
                        <p className="pokemon-details-number">
                            #{String(pokemon.id).padStart(3, '0')}
                        </p>
                        <h1>{pokemon.name}</h1>
                        <div className="pokemon-details-types" aria-label="Types">
                            {pokemon.types.map(({ type }) => (
                                <span className="pokemon-type" key={type.name}>{type.name}</span>
                            ))}
                        </div>
                    </div>
                    {artwork && <img className="pokemon-details-artwork" src={artwork} alt={pokemon.name} />}
                </header>

                <section className="pokemon-details-overview" aria-label="Physical attributes">
                    <div>
                        <span>Height</span>
                        <strong>{(pokemon.height / 10).toFixed(1)} m</strong>
                    </div>
                    <div>
                        <span>Weight</span>
                        <strong>{(pokemon.weight / 10).toFixed(1)} kg</strong>
                    </div>
                    <div>
                        <span>Abilities</span>
                        <strong>{pokemon.abilities.map(({ ability }) => ability.name.replace('-', ' ')).join(', ')}</strong>
                    </div>
                </section>

                <section className="pokemon-details-stats">
                    <h2>Base stats</h2>
                    {pokemon.stats.map(({ stat, base_stat: value }) => (
                        <div className="pokemon-stat" key={stat.name}>
                            <span>{stat.name.replace('-', ' ')}</span>
                            <strong>{value}</strong>
                            <div
                                className="pokemon-stat-track"
                                role="meter"
                                aria-label={stat.name.replace('-', ' ')}
                                aria-valuemin="0"
                                aria-valuemax="255"
                                aria-valuenow={value}
                            >
                                <span style={{ width: getStatFillPercentage(value) }} />
                            </div>
                        </div>
                    ))}
                </section>
            </article>
        </main>
    );
}

function NotFound() {
    return (
        <main className="pokemon-details-page">
            <p className="pokemon-details-message">Page not found.</p>
            <Link className="pokemon-details-back" to="/">Return to Pokédex</Link>
        </main>
    );
}

function PokemonRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Pokidex />} />
                <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PokemonRoutes;
