const http = require('http');
const { PORT } = require('./config');
const { express_app } = require('./express_setup');


const server = http.createServer(express_app)
server.listen(PORT, '0.0.0.0', () => {
  console.log(`run in ${express_app.get('env')} mode on port ${PORT}`)
})

