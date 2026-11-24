# Pokédex

A React Pokédex for browsing Pokémon and searching by Pokémon name or type. Pokémon information and artwork are loaded from the [PokéAPI](https://pokeapi.co/).

## Features

- Browse Pokémon with **Prev** and **Next** pagination.
- Search by Pokémon name or type (for example, `Pikachu` or `fire`).
- Search is case-insensitive and trims extra spaces.
- View each Pokémon's name, image, and type.
- Open a Pokémon detail page by selecting its card.
- Use fallback artwork when a Pokémon has no Dream World sprite.
- See an error message when a search or API request fails.

## Built With

- React
- React Router
- Vite
- Axios
- CSS
- [PokéAPI](https://pokeapi.co/)

## Getting Started

### Prerequisites

- Node.js and npm
- An internet connection to load Pokémon data from PokéAPI

### Install and Run

```bash
# Clone your GitHub repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# Enter the project directory
cd YOUR_REPOSITORY

# Install dependencies
npm ci

# Start the development server
npm run dev
```

Vite prints the local development URL in the terminal after the server starts.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint on the project. |

## Routing

The app uses React Router for client-side navigation. Selecting a Pokémon card opens its detail page without a full page reload.

| Route | Page |
| --- | --- |
| `/` | Pokédex list and search |
| `/pokemon/:pokemonId` | Pokémon details, loaded using the Pokémon ID |
| Any other path | Not-found page |

The route definitions and `BrowserRouter` are in `src/Component/PokemonDetails/PokemonDetails.jsx`. Pokémon cards navigate to `/pokemon/<id>`, and the detail page links back to `/`.

## Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── Component/
│   │   ├── Pokidex/
│   │   │   ├── Pokidex.jsx
│   │   │   └── Pokidex.css
│   │   ├── PokemonDetails/
│   │   │   ├── PokemonDetails.jsx
│   │   │   └── PokemonDetails.css
│   │   ├── Pokimon/
│   │   │   ├── Pokimon.jsx
│   │   │   └── Pokimon.css
│   │   ├── PokimonList/
│   │   │   ├── PokimonList.jsx
│   │   │   └── PokimonList.css
│   │   └── Search/
│   │       ├── Search.jsx
│   │       └── search.css
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Data Source

Pokémon data and sprites are provided by [PokéAPI](https://pokeapi.co/). The app requests this data at runtime, so API access requires an internet connection.

## License

This repository does not currently include a license. Add a `LICENSE` file if you want to specify how others may use, modify, or distribute the project.
