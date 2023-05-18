const { createServer } = require('http');
const { Server } = require("socket.io");
// const { instrument } = require("@socket.io/admin-ui");

const app = require('express')();
const http = createServer(app);
const io = new Server(http, {
	cors: {
		origin: '*', // [
		// 	"https://admin.socket.io",
		// 	"http://localhost:5500",
		// ],
		// credentials: true,
	}
});

app.get('/', (_req, res) => res.sendFile(__dirname + '/chat.html'));

io.on("connection", (socket) => {
	socket.onAny((event, ...data) => {
		console.log(event, ...data);
		io.emit(event, ...data);
	});
});

// instrument(io, {
// 	auth: false, // {
// 	// 	type: 'basic',
// 	// 	username: 'admin',
// 	// 	password: process.env.PASSWORD,
// 	// },
// 	mode: 'development',
// });

http.listen(3000, () => console.log(
	`Starting On Port 3000, Please Host The 'index.html' File Separately But On This Machine!`
));
