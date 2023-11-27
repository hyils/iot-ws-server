const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Broadcast to all clients except the sender
function broadcast(sender, message) {
    wss.clients.forEach(function each(client) {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

wss.on('connection', function connection(ws) {
    console.log('A new client connected!');

    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
        // Broadcast the message to all clients except the sender
        broadcast(ws, message);
    });

    ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server started on port 8080');
