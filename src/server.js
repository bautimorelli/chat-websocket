const express = require("express")
const {Server} = require("socket.io")
const app = express()

const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))
const server = app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

const io = new Server(server)

const messages = []

io.on("connection", (socket)=>{
    //enviamos los mensajes al cliente
    socket.emit("messagesChat", messages)

    //recibimos el mensaje
    socket.on("newMsg", (data)=>{
        messages.push(data)
        //enviamos los mensajes a todos los sockets conectados
        io.sockets.emit("messagesChat", messages)
    })
})