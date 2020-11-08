const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3010;
//const hbs = exphbs.create({});

// Sets Handlebars as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const sess = {
  secret: 'secret',
  cookie: {
    maxAge: 30000   // 1/2 minute of maxAge 
  },
  resave: false,
  saveUninitialized: false,
  rolling: true,     //key in true for inactivity and reset the maxAge when the server find a request in the time less than maxAge however the session is closed
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Welcome to Blogger Funny Now listening'));
});