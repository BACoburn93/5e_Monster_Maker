const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Creature = require('./models/creature');
const User = require('./models/user');

const userRoutes = require('./routes/users');
const creatureRoutes = require('./routes/creatures');

mongoose.connect('mongodb://localhost:27017/5eCreatures', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const app = express();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session.returnTo)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/creatures', creatureRoutes);


//Creature Routes

app.get('/', async (req, res) => {
    res.render('home')
    req.flash('success', 'Successfully entered the homepage')
})

// app.get('/creatures', catchAsync(async (req, res) => {
//     const creatures = await Creature.find({});
//     res.render('creatures/index', { creatures })
// }))

// app.get('/creatures/new', catchAsync(async (req, res) => {
//     res.render('creatures/new')
// }))

// app.post('/creatures', catchAsync(async (req, res, next) => {
//     const creature = new Creature(req.body.creature);
//     console.log(creature);
//     await creature.save();
//     res.redirect(`/creatures/${creature._id}`)
// }))

// app.get('/creatures/:id', async (req, res) => {
//     const creature = await Creature.findById(req.params.id)
//     res.render('creatures/show', { creature })
//     console.log(creature)
// })

// app.get('/creatures/:id/edit', async (req, res) => {
//     const creature = await Creature.findById(req.params.id)
//     res.render('creatures/edit', { creature });
// })

// app.put('/creatures/:id', catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const creature = await Creature.findByIdAndUpdate(id, { ...req.body.creature });
//     res.redirect(`/creatures/${creature._id}`)
// }))

// app.delete('/creatures/:id', async (req, res) => {
//     const { id } = req.params;
//     await Creature.findByIdAndDelete(id);
//     res.redirect('/creatures');
// })

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'There seems to be an Error..'
    res.status(statusCode).render('error', { err })
});

//App.listen
app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000");
})
