const WebSocket = require('ws')

const createRoutes = (app, wss) => {
    app.post("/upload" , async function (req, res, next) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send('new_file')
            }
        })
        res.send("Файл загружен")
    })

    app.get('/download', function (req, res, ) {
        var filePath = __dirname + "/uploads/example.mp4" // Or format the path using the `id` rest param
        var fileName = "example.mp4" // The default name the browser will use
        res.download(filePath, fileName)    
    })
}

module.exports = createRoutes