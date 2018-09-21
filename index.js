var url = require('url');
var fs = require('fs');
var http = require('http'),
    httpProxy = require('http-proxy');


httpProxy.createServer({
  ssl: {
    key: fs.readFileSync('mykey.key.pem', 'utf8'),
    cert: fs.readFileSync('mykey.crt.pem', 'utf8')
  },
  target: 'http://localhost:8080',
  secure: true // Depends on your needs, could be false.
}).listen(443);

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  res.writeHead(302, { 'Location': 'https://upyourgame.com'+pathname });
  res.end();
}).listen(80);
