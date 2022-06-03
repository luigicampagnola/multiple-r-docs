const http = require("https");

const app = require("./app");

const PORT = 4000;

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
