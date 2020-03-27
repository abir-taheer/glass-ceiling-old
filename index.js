const fs = require("fs");
const dotenv = require('dotenv');
const db = require("./database");
const opengraph = require("./opengraph");
const app_port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");
const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const ioListeners = require("./ioListeners");
const shared_session = require("express-socket.io-session");
const morgan = require("morgan");
const expressSession = require("express-session");
const SequelizeConnectSession = require('connect-session-sequelize')(expressSession.Store);
const sequelizeStore = new SequelizeConnectSession({db: db.sequelize});
const session = expressSession({
	secret: process.env.SESSION_SECRET || "some_semi_permanent_secret",
	name: "session",
	resave: true,
	saveUninitialized: false,
	store: sequelizeStore,
	cookie: {
		path: '/',
		httpOnly: true,
		secure: false,
		maxAge: Number(process.env.SESSION_MAX_AGE) || (15 * 86400 * 1000)
	},
	rolling: true
});

io.set('transports', ['websocket']);
io.use(shared_session(session, undefined, {autoSave: true}));
ioListeners(io);


dotenv.config();

sequelizeStore.sync();

app.use(session);

app.use(cookieParser(process.env.SESSION_SECRET || "some_semi_permanent_secret"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	morgan(
		process.env.MORGAN_FORMAT || "dev",
		{skip: (req, res) =>  res.statusCode < 400}
	)
);

app.use(opengraph);

const index_file = fs.readFileSync("./client/build/index.html").toString();

const handleDefaultNavigation = (req, res) => {
	// Cache requests for 5 days
	// cache_age represents the number of seconds to cache the page
	let cache_age = 60 * 60 * 24 * 5;
	res.set('Cache-Control', `public, max-age=${cache_age}`); // 5 days
	res.send(index_file.replace("<og-data />", req.buildOG()));
};

// Catch the index page before it is handled statically
// Otherwise server side rendering doesn't happen
app.route("/").get(handleDefaultNavigation);

app.use(express.static(path.join(__dirname, 'client/build')));

// OTHER ROUTES
app.use("/", require("./routes"));

// Fallback to react for non-static files
app.route("*").get(handleDefaultNavigation);

server.listen(app_port, () => {
	console.log('listening on *:' + app_port);
});
