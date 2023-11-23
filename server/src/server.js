const http = require("http");

const app = require('./app')
//Check if there is a port specified in the environmet. If not 8000
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
