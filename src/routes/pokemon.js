const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const axios = require("axios");
const pool = require('../database')


// Rutas Pokemon
router.get('/Lista', isLoggedIn, (req, res) => {
    res.render('Pokemon/Lista');
});

router.get('/Pokedex', isLoggedIn, (req, res) => {
    res.render('Pokemon/Pokedex');
});

router.get('/Batalla', isLoggedIn, (req, res) => {
    res.render('Pokemon/Batalla');
});

//RUTAS

// router.get("/", async(req, res) => {
//     res.status(200).send('aaaaa');
// })

const getPokemon = async id => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id);
    const { data } = response;
    return {
        abilities: data.abilities,
        name: data.name,
        types: data.types,
        img: data.sprites.front_shiny,
        user_id: data.user_id,
        id
    };
};

router.post("/:id", isLoggedIn, async(req, res) => {
    const { id } = req.params
    const pokemon = await getPokemon(id)
    const types = pokemon.types.map(x => x.type.name).join(", ")
    const abilities = pokemon.abilities.map(x => x.ability.name).join(", ")
    await pool.query("INSERT INTO pokemon (id, name, img, types, abilities, user_id) VALUES (?, ?, ?, ?, ?, ?)", [id, pokemon.name, pokemon.img, types, abilities, req.user.id])
    const savedPokemon = {
        ...pokemon,
        id: Number(id),
        types,
        abilities,
        user_id: req.user.id,
        saved: true
    }
    res.json({ status: true, pokemon: savedPokemon });
});

 router.get("/views", isLoggedIn,  async (req, res) => {

     const views = await pool.query("SELECT * FROM pokemon WHERE user_id = ?", [req.user.id]);
     res.render('Pokemon/views' , {views});

 })

 router.get('/delete/:id',isLoggedIn, async(req, res) =>{

    const {id} = req.params;
    await pool.query('DELETE FROM pokemon WHERE ID = ?', [id]);
    req.flash('success', 'El pokemon se elimino correctamente');
    res.redirect('/Pokemon/views');

 })


module.exports = router;