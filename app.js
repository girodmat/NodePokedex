import express from "express";
import { succes } from "./helper.js";
import Pokemon from "./mock-pokemon.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("hello"));
app.get("/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.params.id);
  const pokemon = Pokemon.find((p) => p.id === id);
  const message = "Nous avons trouvé un pokemon";
  res.json(succes(message, pokemon));
});

app.get("/pokemons", (req, res) => {
  const totalPokemon = Pokemon.length;
  const message = "Voici la liste des Pokémons";

  res.json(succes(message, Pokemon));
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);
