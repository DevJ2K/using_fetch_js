async function fetchData() {
	try {
		const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
		if (response.ok == false)
		{
			throw new Error("Could not fetch resource.");
		}
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}
// fetchData();

async function searchPokemon() {
	var loader = document.getElementById("loader");
	var card = document.getElementById("card");

	card.style.display = "none";
	loader.style.display = "block";
	const pokemon = document.getElementById("pokesearch");

	var isBlank = true;
	var response;
	if (pokemon.value != "")
	{
		const poke_request = "https://pokeapi.co/api/v2/pokemon/" + pokemon.value.toLowerCase();
		console.log(poke_request);
		response = await fetch(poke_request);
		isBlank = false;
	}
	else
	{
		var error_content = "";
		console.log("Nothing to fetch...")
		error_content += '<div class="alert alert-primary" role="alert">';
		error_content += 'Nothing to fetch...';
		error_content += '</div>';
		card.innerHTML = error_content;
	}

	if (isBlank){}
	else if (response.ok == false)
	{
		var error_content = "";
		console.log("Failed to fetch resource.")
		error_content += '<div class="alert alert-danger" role="alert">';
		error_content += 'Failed to fetch data of Pokemon : ' + pokemon.value.toLowerCase();
		error_content += '</div>';
		card.innerHTML = error_content;
	}
	else
	{
		const data = await response.json();
		console.log(data);

		var templateCard = await fetch("/pokecard.html").then((response) => response.text());
		templateCard = templateCard.replace("IMG_LINK", data.sprites.front_default);

		var allTypes = "";
		for (let i = 0; i < data.types.length; i++) {
			allTypes += '<button type="button" class="btn btn-info">';
			allTypes += data.types[i].type.name;
			allTypes += '</button>';
		}

		var allAbilities = "";
		for (let i = 0; i < data.abilities.length; i++) {
			allAbilities += '<li class="list-group-item">';
			allAbilities += data.abilities[i].ability.name;
			allAbilities += '</li>';
		}

		templateCard = templateCard.replace("NAME_HERE", data.name);
		templateCard = templateCard.replace("TYPE_HERE", allTypes);
		templateCard = templateCard.replace("ABILITIES_HERE", allAbilities);

		card.innerHTML = templateCard;
	}
	card.style.display = "block";
	loader.style.display = "none";
}

// searchPokemon();
const button = document.querySelector('button');
button.addEventListener('click', (event) => {
      event.preventDefault();
      // Custom logic
});


/* USING FETCH
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
.then(response => {
	if (response.ok == false)
	{
		throw new Error("Could not fetch resource");
	}
	return response.json();
})
.then(data => console.log(data))
.catch(error => console.error(error));
*/
