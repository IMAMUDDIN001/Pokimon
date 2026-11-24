// import css
import { useEffect, useState } from 'react';
import './PokimonList.css';
import Pokimon from '../Pokimon/Pokimon';
import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2'
const DEFAULT_URL = `${API_URL}/pokemon`

function toPokemonCard(pokemon) {
    return {
        id: pokemon.id,
        name: pokemon.name,
        image:
            pokemon.sprites.other?.dream_world?.front_default
            ?? pokemon.sprites.other?.['official-artwork']?.front_default
            ?? pokemon.sprites.front_default,
        type: pokemon.types
    }
}

function PokimonList({ searchTerm }) {
    const [pokimonList, setPokimonList] = useState([])
    const [pokidexUrl, setPokidexUrl] = useState(DEFAULT_URL)
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        let isCurrentRequest = true

        async function loadPokimonPage() {
            let typeWasFound = false

            try {
                let pokemonList
                let nextPageUrl = null
                let previousPageUrl = null

                if (searchTerm) {
                    const searchValue = encodeURIComponent(
                        searchTerm.toLowerCase().trim().replace(/\s+/g, '-')
                    )

                    try {
                        const { data: pokemon } = await axios.get(`${DEFAULT_URL}/${searchValue}`)
                        pokemonList = [toPokemonCard(pokemon)]
                    } catch (nameError) {
                        if (nameError.response?.status !== 404) throw nameError

                        const { data: typeData } = await axios.get(`${API_URL}/type/${searchValue}`)
                        typeWasFound = true
                        pokemonList = []

                        for (let index = 0; index < typeData.pokemon.length; index += 10) {
                            if (!isCurrentRequest) return

                            const pokemonBatch = typeData.pokemon.slice(index, index + 10)
                            const pokemonResponses = await Promise.all(
                                pokemonBatch.map(({ pokemon }) => axios.get(pokemon.url))
                            )
                            pokemonList.push(
                                ...pokemonResponses.map(({ data: pokemon }) => toPokemonCard(pokemon))
                            )
                        }
                    }
                } else {
                    const response = await axios.get(pokidexUrl)
                    const pokemonResponses = await Promise.all(
                        response.data.results.map(pokemon => axios.get(pokemon.url))
                    )
                    pokemonList = pokemonResponses.map(({ data: pokemon }) => toPokemonCard(pokemon))
                    nextPageUrl = response.data.next
                    previousPageUrl = response.data.previous
                }

                if (!isCurrentRequest) return

                setNextUrl(nextPageUrl)
                setPrevUrl(previousPageUrl)
                setPokimonList(pokemonList)
                setError('')
            } catch (requestError) {
                if (isCurrentRequest) {
                    setPokimonList([])
                    setNextUrl(null)
                    setPrevUrl(null)
                    setError(searchTerm
                        ? requestError.response?.status === 404 && !typeWasFound
                            ? 'No Pokémon or type found with that search.'
                            : 'Unable to search Pokémon. Please try again.'
                        : 'Unable to load Pokémon. Please try again.')
                }
            }
        }

        loadPokimonPage()
        return () => {
            isCurrentRequest = false
        }
    }, [pokidexUrl, searchTerm])

    return (
        <div className="pokimonList_wraper">
            <h2 className="pokimonList_title">
                Pokémon List    
            </h2>
            {!searchTerm && <div className="pagination">
                <button
                    className="pagination_button"
                    type="button"
                    onClick={() => setPokidexUrl(prevUrl)}
                    disabled={!prevUrl}
                >
                    Prev
                </button>
                <button
                    className="pagination_button"
                    type="button"
                    onClick={() => setPokidexUrl(nextUrl)}
                    disabled={!nextUrl}
                >
                    Next
                </button>
            </div>}
            {error && <p className="pokimonList_error" role="alert">{error}</p>}
            {pokimonList.map(pokimon => (
                <Pokimon
                    key={pokimon.id}
                    id={pokimon.id}
                    name={pokimon.name}
                    url={pokimon.image}
                    type={pokimon.type}
                />
            ))}


        </div>



    )
}
export default PokimonList
