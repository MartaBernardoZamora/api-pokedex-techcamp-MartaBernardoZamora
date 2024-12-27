const poke_container = document.getElementById('poke-container');
const pokemon_count = 150;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

let getData = async(url) => {
    try {
        let api_connection = await fetch(url);
        if(!api_connection.ok) throw new Error('Failed to fetch data');
        return await api_connection.json();
    } catch (error){
        console.error(`Error fetching data ${error}`);       
    }
}
const findDataPokemon = async(pokemon) => {
	try{
		const pokedata=await getData(pokemon);
		return pokedata;
	}catch (error){
        console.error(`Error print data ${error}`);       
    }
}
const createEl = (tag, className=null, text=null) => {
	const element =document.createElement(tag);
	className && element.classList.add(className);
	text && (element.textContent = text);
	return element;
}
const createCard =(pokedata) =>{
	const [firstLetter, ...rest] = pokedata.name;
	const name=`${firstLetter.toUpperCase()}${rest.join('')}`;
	const pokeType=pokedata.types[0].type.name;


	const pokemon = createEl('div', 'pokemon');
	pokemon.style.backgroundColor= colors[pokeType]|| '#FFFFFF';

	const imgContainer=createEl('div', 'img-container');

	const img=document.createElement('img');
	img.src=pokedata.sprites.other["official-artwork"].front_default;
	img.alt=name;

	imgContainer.appendChild(img);
	pokemon.appendChild(imgContainer);

	const info=createEl('div', 'info');

	const span=createEl('span', 'number', `#${pokedata.id.toString().padStart(3, "0")}`)
	info.appendChild(span);

	const pokeName=createEl('h3', 'name', name);
	pokeName.id=`name${pokedata.id}`;
	info.appendChild(pokeName);

	const smallType=createEl('small', 'type', `Type: `);
	const spanType=createEl('span', null, pokeType);
	smallType.appendChild(spanType);
	info.appendChild(smallType);

	pokemon.appendChild(info);

	return pokemon;
}
const printDataPokemon = async()=> {
	const data = await getData(`https://pokeapi.co/api/v2/pokemon?limit=${pokemon_count}`);
	const container = document.createDocumentFragment();
	for (const pokemon of data.results) {
		try{
			const pokedata =await findDataPokemon(pokemon.url);
			container.appendChild(createCard(pokedata));
		}catch (error) {
            console.error(`Error fetching pokemon data: ${error}`);
        }	
	};	
	poke_container.appendChild(container);
}
printDataPokemon();