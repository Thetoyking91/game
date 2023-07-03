const http = require('http')
const path = require('path')
const fs = require('fs')

function handleRequest(req, res) {
    // What did we request?
    let pathname = req.url;
    
    // If blank let's ask for index.html
    if (pathname == '/') {
      pathname = '/index.html';
    }
    
    // Ok what's our file extension
    let ext = path.extname(pathname);
  
    // Map extension to file type
    const typeExt = {
      '.html': 'text/html',
      '.js':   'text/javascript',
      '.css':  'text/css',
      '.ico': 'image/x-icon'
    };
  
    // What is it?  Default to plain text
    let contentType = typeExt[ext] || 'text/plain';
  
    // Now read and write back the file with the appropriate content type
    fs.readFile(__dirname + pathname,
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading ' + pathname);
        }
        // Dynamically setting content type
        res.writeHead(200,{ 'Content-Type': contentType });
        res.end(data);
      }
    );
  }

  
let server = http.createServer(handleRequest)
server.listen(8080)
const { Server } = require('socket.io');

let io = new Server(server)

io.on('connection', (socket) => {
    console.log("Connection: " + socket.id)

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected')
        socket.broadcast.emit('die', socket.id)
    })

    socket.on('multiplayerPos', (data) => {
      console.log(data, socket.id)
      socket.broadcast.emit('multiplayerPos', data)
    })
})