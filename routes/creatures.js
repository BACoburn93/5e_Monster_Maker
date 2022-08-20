const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, isAuthor } = require('../middleware');

const ExpressError = require('../utilities/ExpressError');
const Creature = require('../models/creature');
const User = require('../models/user');
const user = User.findById();



router.get('/', catchAsync(async (req, res) => {
    const creatures = await Creature.find({})
    res.render('creatures/index', { creatures })
    console.log(req.user.id)
}));

router.get('/user/:id', isLoggedIn, catchAsync(async (req, res) => {
    const creatures = await Creature.find({});
    res.render('creatures/userIndex', { creatures })
}));

router.get('/new', isLoggedIn, catchAsync(async (req, res) => {
    res.render('creatures/new')
}));

router.post('/', isLoggedIn, catchAsync(async (req, res, next) => {
    const creature = new Creature(req.body.creature);
    creature.author = req.user._id;
    await creature.save();
    req.flash('success', 'Successfully made a new creature!');
    res.redirect(`/creatures/${creature._id}`)
}));

router.get('/:id', async (req, res) => {
    const creature = await Creature.findById(req.params.id).populate('author');
    if (!creature) {
        req.flash('error', 'Cannot find that creature :(');
        return res.redirect('/creatures');
    }
    console.log(creature.sharable);
    res.render('creatures/show', { creature })
});

router.get('/:id/edit', isLoggedIn, isAuthor, async (req, res) => {
    const creature = await Creature.findById(req.params.id)
    if (!creature) {
        req.flash('error', 'Cannot find that creature :(');
        return res.redirect('/creatures');
    }
    console.log(creature.sharable)
    res.render('creatures/edit', { creature });
});

router.put('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const creature = await Creature.findByIdAndUpdate(id, { ...req.body.creature });
    req.flash('success', 'Successfully updated creature');
    res.redirect(`/creatures/${creature._id}`)
}));

router.delete('/:id', isLoggedIn, isAuthor, async (req, res) => {
    const { id } = req.params;
    await Creature.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted creature')
    res.redirect('/creatures');
});

router.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

router.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'There seems to be an Error..'
    res.status(statusCode).render('error', { err })
});

module.exports = router;