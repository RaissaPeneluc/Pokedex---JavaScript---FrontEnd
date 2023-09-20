const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;



function convertPokemonToLi (pokemon){
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit){

    /* Requisição HTTP buscar a lista de pokemons. 

    - pokemons = Recebendo a lista */
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        /* Transformando esses pokemons em uma lista HTML (de Li's). 

        - join = Concatenação da lista, sem separador (,), essas strings, 
         juntando elas em uma string só, virando praticamento um novo HTML. */

        const newHtml = pokemons.map( convertPokemonToLi).join('');

        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit);

/* Regra de  Paginação */

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords){

        /* Cálculo do novo limite*/

        const newLimit =  maxRecords - offset;

        /* Pesquisa ela com o novo limite */

        loadPokemonItens(offset, newLimit);

        /* Remoção do botão */

        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemonItens(offset, limit);
    }
})


