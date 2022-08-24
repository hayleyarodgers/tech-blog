// Import and use Express.js module for working with Node
const express = require('express');
const app = express();

/* ----- */

// Import the database connection object
const sequelize = require('./config/connection');

// Import the session package for storing client's data in a cookie
const session = require('express-session');

// Import the connect-session-sequelize package for storing sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up session
const sess = {
	secret: 'Super secret secret',
	cookie: {},
	resave: false,
	saveUninitialized: true,
	// Sets up session store
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

/* ----- */

// Import the Handlebars.js package for dynamically creating HTML
const exphbs = require('express-handlebars');
const hbs = exphbs.create();

// Inform Express.js which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/* ----- */

// Middleware for converting a application/json data into a javascript object
app.use(express.json());

// Middleware for parsing a URL encoded data into a javascript object
app.use(express.urlencoded({ extended: true }));

// Import path module for working with directories
const path = require('path');

// Middleware for automatically serving static assets when root URL is accessed
app.use(express.static(path.join(__dirname, 'public')));

/* ----- */

// Import and use modular routers
const routes = require('./controllers');
app.use(routes);

// Create port
const PORT = process.env.PORT || 3001;

// Connect to the database and then start the Express.js server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});
