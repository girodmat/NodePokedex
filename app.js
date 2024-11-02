import express from "express";
import { succes } from "./helper.js";
import PokemonArray from "./mock-pokemon.js";
import morgan from "morgan";
import { getUniqueId } from "./helper.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let Pokemon = PokemonArray;
app.use(morgan("dev")).use(bodyParser.json());

app.get("/", (req, res) => res.send("hello"));
app.get("/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.params.id);
  const pokemon = Pokemon.find((p) => p.id === id);
  const message = "Nous avons trouvé un pokemon";
  res.json(succes(message, pokemon));
});

app.post("/add/pokemon", (req, res) => {
  const id = getUniqueId(Pokemon);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  Pokemon.push(pokemonCreated);
  const message = `le Pokemon ${pokemonCreated.name} à été crée`;
  res.json(succes(message, pokemonCreated));
});

app.get("/pokemons", (req, res) => {
  const totalPokemon = Pokemon.length;
  const message = "Voici la liste des Pokémons";

  res.json(succes(message, Pokemon));
});

app.put("/edit/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  Pokemon = Pokemon.map((p) => {
    return p.id === id ? pokemonUpdated : p;
  });
  const message = `le Pokémon ${pokemonUpdated.name} à bien été edit `;
  res.json(succes(message, pokemonUpdated));
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
