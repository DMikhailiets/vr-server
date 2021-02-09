const WebSocket = require('ws')
const getFiles = require('./utils/files')

const createRoutes = (app, wss) => {
    app.post("/upload" , async function (req, res, next) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send('new_file')
            }
        })
        res.send("Файл загружен")
    })

    app.get('/download/:id', function (req, res, ) {
        let fileName = req.params.id // The default name the browser will use
        let filePath = __dirname + '/../uploads/' + fileName
        console.log('fileName: ', fileName)
        console.log('filePath: ', filePath)
        res.download(filePath, fileName)    
    })
    app.get('/download', function (req, res, ) {
        res.send(getFiles())
    })
}

module.exports = createRoutes