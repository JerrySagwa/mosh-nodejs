const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello Client ~')
    res.end();
  }
});

server.on('connection', () => {
  console.log('New Connection ...');
});

server.listen(3000, () => {
  console.log('server listening on port 3000 ...');
})