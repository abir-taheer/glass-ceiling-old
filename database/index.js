const Database = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

let sequelize_options = {
	host: (process.env.SEQUELIZE_HOST || "localhost"),
	dialect: (process.env.SEQUELIZE_DIALECT || "sqlite"),
	pool: {
		max: (Number(process.env.SEQUELIZE_CONN_LIMIT) || 5),
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	define: {
		charset: 'utf8',
		collate: 'utf8_general_ci'
	},
	native: true,
	ssl: true,
	logging: (process.env.SEQUELIZE_LOGGING === "true" ? console.log : false)
};

if(process.env.SEQUELIZE_PORT)
	sequelize_options.port = Number(process.env.SEQUELIZE_PORT);

if(! process.env.SEQUELIZE_DIALECT || process.env.SEQUELIZE_DIALECT === "sqlite")
	sequelize_options.storage = process.env.SEQUELIZE_STORAGE || "./app.db";

if(process.env.SEQUELIZE_SSL === "false"){
	sequelize_options.ssl = false;
	sequelize_options.native = false;
}

const sequelize = new Database(
	(process.env.SEQUELIZE_DB || "database"),
	(process.env.SEQUELIZE_USER || "user"),
	(process.env.SEQUELIZE_PASS || "password"),
	sequelize_options
);

const Cards = require("./schemas/cards")(sequelize, Database);
const PlayerCards = require("./schemas/playerCards")(sequelize, Database);
const Games = require("./schemas/games")(sequelize, Database);
const Users = require("./schemas/users")(sequelize, Database);
const CardPacks = require("./schemas/cardPacks")(sequelize, Database);
const CardsInPack = require("./schemas/cardsInPack")(sequelize, Database);
const GameCardPacks = require("./schemas/gameCardPacks")(sequelize, Database);
const GameJoinCodes = require("./schemas/gameJoinCodes")(sequelize, Database);
const GamePlayers = require("./schemas/gamePlayers")(sequelize, Database);
const GameSettings = require("./schemas/gameSettings")(sequelize, Database);
const GameTurns = require("./schemas/gameTurns")(sequelize, Database);
const PlayedCards = require("./schemas/playedCards")(sequelize, Database);
const TurnWinners = require("./schemas/turnWinners")(sequelize, Database);

GamePlayers.hasMany(PlayerCards, {foreignKey: "playerId"});
PlayerCards.belongsTo(GamePlayers, {foreignKey: "playerId"});

CardPacks.belongsTo(Users, {foreignKey: "creator"});

Games.hasMany(PlayerCards);
PlayerCards.belongsTo(Games, {foreignKey: "gameId"});
PlayerCards.belongsTo(Cards, {foreignKey: "cardId"});

CardsInPack.belongsTo(Cards, {foreignKey: "cardId"});
CardsInPack.belongsTo(CardPacks, {foreignKey: "cardPackId"});

GameCardPacks.belongsTo(CardPacks, {foreignKey: "cardPackId"});
GameCardPacks.belongsTo(Games, {foreignKey: "gameId"});

GameJoinCodes.belongsTo(Games, {foreignKey: "gameId"});
GamePlayers.belongsTo(Games, {foreignKey: "gameId"});
GamePlayers.belongsTo(Users, {foreignKey: "userId"});

GameSettings.belongsTo(Games, {foreignKey: "gameId"});
Games.hasOne(GameSettings);

GameTurns.belongsTo(Games, {foreignKey: "gameId"});
GameTurns.belongsTo(GamePlayers, {foreignKey: "decidingPlayer"});
GameTurns.belongsTo(Cards, {foreignKey: "blackCard"});

GameTurns.hasMany(PlayedCards, {foreignKey: "turnId"});
PlayedCards.belongsTo(GameTurns, {foreignKey: "turnId"});
PlayedCards.belongsTo(GamePlayers, {foreignKey: "playerId"});
PlayedCards.belongsTo(Cards, {foreignKey: "cardId"});

TurnWinners.belongsTo(GameTurns, {foreignKey: "turnId"});
TurnWinners.belongsTo(GamePlayers, {foreignKey: "playerId"});

sequelize.sync(
	// {force: true}
	);

module.exports = {
	sequelize,
	Cards,
	CardPacks,
	CardsInPack,
	Users
};
