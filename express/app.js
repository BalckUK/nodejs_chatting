const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);

const socketIO = require('socket.io');
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'src')));

const PORT = process.env.PORT || 5000;

//리스닝 포트 콘솔입력
server.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
})

//소켓연결시 콘솔입력
io.on('connection', (socket) => {
    console.log('연결됨')
})

//클라이언트로부터 받은 값 콘솔 출력
io.on('connection', (socket) => {
    socket.on('chatting', (data) => {
        console.log(data);
    }); //채팅아이디, 실행할 함수
});

//클라이언트에게 내용보내기
io.on('connection', (socket) => {
    socket.on('chatting', (data) => {
       // io.emit('chatting', `안녕! ${data}`); 
       io.emit('chatting',data)
    });
});

