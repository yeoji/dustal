import SocketIO from "socket.io";

export default function(app) {
    const io = new SocketIO(app);

    io.on('connection', function (socket) {
        console.log('user connected');
    });
}