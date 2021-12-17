const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const cards = require('./src/cards.json')
const correctHints = require('./src/correct_hint.json')
const games = require('./src/games.json')
const players = require('./src/players.json')
const bodyParser = require('body-parser');
const cors = require('cors')

// Set default middlewares (logger, static, cors and no-cache)
server.use(bodyParser.json());
server.use(cors());

// Add custom routes before JSON Server router
server.get('/cards/:gameId', (req, res) => {
  res.jsonp(cards)
})

// Add custom routes before JSON Server router
server.post('/cards', (req, res) => {
  res.jsonp(correctHints)
})

// Available games
server.get('/games', (req, res) => {
  res.jsonp(games)
})

// Players
server.get('/rooms', (req, res) => {
  res.jsonp(players)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})