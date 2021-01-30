const express = require('express')
const dotenv = require('dotenv')
const multer  = require("multer")
const WebSocket = require('ws')
const cors = require('cors')
const bodyParser = require('body-parser')
const createRoutes = require('./src/router')
const multerConfig = require('./src/core/multer')
const corsOptions = require('./src/core/cors')

dotenv.config()

const PORT = process.env.PORT
const WS_PORT = process.env.WS_PORT

const app = express()
app.use(express.static(__dirname))
app.use(cors(corsOptions))
app.use(multer({storage:multerConfig}).single("filedata"))
app.use(bodyParser.urlencoded({ extended: false })) // for multipart-form data

const wss = new WebSocket.Server({ port: WS_PORT },()=>{
    console.log('WS server started')
})

wss.on('connection', function connection(ws) {
    ws.on('message', (data) => {
       console.log('data received \n',data)
       ws.send(data)
    })
 })

wss.on('listening',() => {
   console.log(`WS server listening on ${WS_PORT}`)
})

createRoutes(app, wss)

app.listen(PORT, () => {
    console.log(`Web server listening at ${PORT}`)
})