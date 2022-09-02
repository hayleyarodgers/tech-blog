/* JS DIRECTORY
    1. =SESSIONS-AND-AUTHENTICATION
    2. =TEMPLATE-ENGINE
    3. =MIDDLEWARE
    4. =ROUTING
    5. =CONNECTION-TO-DATABASE
*/

// Import and use Express.js module for working with Node
const express = require('express');
const app = express();

/* ===SESSIONS-AND-AUTHENTICATION=== */

// Import the database connection object
const sequelize = require('./config/connection');

// Import the session package for storing client's data in a cookie
const session = require('express-session');

// Import the connect-session-sequelize package for storing sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up session
const sess = {
	secret: 'Super secret secret',
	cookie: {
		// 10 minute session before user prompted to log in agani
		maxAge: 600000,
		httpOnly: true,
		secure: false,
		sameSite: 'strict',
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

/* ===TEMPLATE-ENGINE=== */

// Import the Handlebars.js package for dynamically creating HTML
const exphbs = require('express-handlebars');

// Import the helper functions
const { ifEquals } = require('./utils/ifEquals');
const { format_date } = require('./utils/formatDate');

// Pass helper functions into Handlebars.js and inform Express.js which template engine to use
app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main',
		helpers: { ifEquals: ifEquals, format_date: format_date },
	})
);

app.set('view engine', 'handlebars');

/* ===MIDDLEWARE=== */

// Middleware for converting a application/json data into a javascript object
app.use(express.json());

// Middleware for parsing a URL encoded data into a javascript object
app.use(express.urlencoded({ extended: true }));

// Import path module for working with directories
const path = require('path');

// Middleware for automatically serving static assets when root URL is accessed
app.use(express.static(path.join(__dirname, 'public')));

/* ===ROUTING=== */

// Import and use modular routers
const routes = require('./controllers');
app.use(routes);

/* ===CONNECTION-TO-DATABASE=== */

// Create port
const PORT = process.env.PORT || 3001;

// Connect to the database and then start the Express.js server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log('Now listening'));
});
