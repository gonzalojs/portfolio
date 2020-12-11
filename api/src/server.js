const http = require('http');
const app = require('./app')

const port = process.env.ENV || 3000

const server = http.createServer(app)
server.listen(port, () => console.log(`corriendo en el puerto ${port}`))