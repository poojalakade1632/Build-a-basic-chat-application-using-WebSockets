const express = require('express');
const app=express()
const http = require('http').createServer(app)

const PORT =process.env.PORT || 3000

http.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)  //on this port server is runnning
})


//create route

app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html')
})

//socket

const io = require('socket.io')(http)  //socket created and using http it will know on which server work has to be done

io.on('connection', (socket) =>{
    console.log('Connected..')
    socket.on('message',(msg)=>{
       socket.broadcast.emit('message', msg)
    })
})

