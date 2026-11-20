import { useState } from 'react';
import PokimonList from '../PokimonList/PokimonList';
import Search from '../Search/Search';
import './Pokidex.css';

function Pokidex() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
        <h1 className="pokidex-title">POKEDEX</h1>
        <Search onSearch={setSearchTerm} />
        <PokimonList searchTerm={searchTerm} />



   </>
    )
}

export default Pokidex  