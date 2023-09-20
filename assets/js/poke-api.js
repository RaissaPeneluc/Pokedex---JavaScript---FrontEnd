
const pokeApi = {}

/* Conversão do pokeDetail, é o modelo do  poke API, 
para o meu modelo */

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}


/* Acessando a URL do pokemon para pegar os detalhes 
e convertendo a response pra um JSON. */

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

/* Requisição para trazer a lista de pokemons. */

pokeApi.getPokemons = (offset = 0, limit = 5) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    /* Ida ao servidor para pegar a lista de pokemons. */

    return fetch(url)

        /* Convertendo a  lista pra JSON. */

        .then((response) => response.json())

        /* Pegando a lista. */

        .then((jsonBody) => jsonBody.results)

        /* Transformando a lista de pokemons em uma lista de busca 
        do detalhe. */

        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
       
       /* Esperando a lista de promessas ser resolvida,
       esperando todas requisições terminar. */

        .then((detailRequests)=> Promise.all (detailRequests))

        /* Lista de detalhes do pokemon */

        .then((pokemonsDetails) => pokemonsDetails)
}

/* Transformação dessa lista de pokemons em uma lista 
de novas requisições. */

 Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')

    /* Espera a resposta e usa os resultados dela. */

]).then((results) => {
    console.log(results);
})