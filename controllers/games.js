
const express = require('express');
const router = express.Router();
const Game = require('../models/games.js');



router.get('/', (req, res) => {
	Game.find({}, (err, foundGames) => {
		res.render('./Games/index.ejs', {
			games: foundGames
		});
	});
});

router.get('/new', (req, res) => {
	res.render('games/new.ejs');
});


router.delete('/:id', (req, res) => {
	Game.findByIdAndRemove(req.params.id, () => {
		res.redirect('./games');
	});
});
router.get('/:id/edit', (req, res) => {
	Game.findById(req.params.id, (err, foundGame) => {
		res.render('./games/edit.ejs', {
			game: foundGame
		});
	});
});
router.put('/:id', (req, res) => {
	Game.findByIdAndUpdate(req.params.id, req.body, () => {
		res.redirect('./games');
	});
});
// avoid this handling /new by placing it towards the bottom of the file
router.get('/:id', (req, res) => {
	Game.findById(req.params.id, (err, foundGame) => {
		res.render('./games/show.ejs', {
			game: foundGame
		});
	});
});

//...
//...farther down the page
router.post('/', (req, res) => {
	Game.create(req.body, (err, createdGame) => {
		res.redirect('./Games');
	});
});
module.exports = router;