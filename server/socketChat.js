const RoomModel = require("./model/Room");
const MessagesModel = require("./model/Messages");

const socketChat = (server) => {
    const io = require("socket.io")(server);

    const joinRoom = async (socket, roomId, name, photo) => {
        const room = roomId.split("-");

        const findRoom_1 = await RoomModel.find({name : `${room[0]}-${room[1]}`}).exec();
        const findRoom_2 = await RoomModel.find({name : `${room[1]}-${room[0]}`}).exec();

        if(findRoom_1.length === 0 && findRoom_2.length === 0) {
            await new RoomModel({
                name : roomId
            }).save();

            socket.join(roomId);

            io.in(roomId).emit("whoJoined", {
                name : name,
                photo : photo
            })


            const messages = await MessagesModel.find( { room : roomId}).exec();
            io.in(roomId).emit("messagesOnCurrentRoom", messages)
        } else if (findRoom_1.length > 0) {
            socket.join(findRoom_1[0].name);

            io.in(findRoom_1[0].name).emit("whoJoined", {
                name : name,
                photo : photo
            })

            const messages = await MessagesModel.find( { room : findRoom_1[0].name}).exec();
            io.in(findRoom_1[0].name).emit("messagesOnCurrentRoom", messages)
        } else if (findRoom_2.length > 0) {
            socket.join(findRoom_2[0].name);

            io.in(findRoom_2[0].name).emit("whoJoined", {
                name : name,
                photo : photo
            })

            const messages = await MessagesModel.find( { room : findRoom_2[0].name}).exec();
            io.in(findRoom_2[0].name).emit("messagesOnCurrentRoom", messages)
        } else {
            io.emit("error", {message : "Can't create and join room"})
        }
    }

    const sendMessage = async (socket, roomId, message, photo) => {
        const room = roomId.split("-");

        const findRoom_1 = await RoomModel.find({name : `${room[0]}-${room[1]}`}).exec();
        const findRoom_2 = await RoomModel.find({name : `${room[1]}-${room[0]}`}).exec();

        if(findRoom_1.length > 0) {
            socket.join(findRoom_1[0].name);

            await new MessagesModel({
                room : findRoom_1[0].name,
                currentUser : room[1],
                text : message,
                photo : photo
            }).save();   
            
            io.in(findRoom_1[0].name).emit("messageToClient", {id : room[1], msg : message, photo : photo});
        } else if(findRoom_2.length > 0) {
            socket.join(findRoom_2[0].name);

            await new MessagesModel({
                room : findRoom_2[0].name,
                currentUser : room[1],
                text : message,
                photo : photo
            }).save();

            io.in(findRoom_2[0].name).emit("messageToClient", {id : room[1], msg : message, photo : photo});
        } else {
            io.emit("error", {message : "Can't send message"})
        }
    }

    const leaveRoom = async (socket, roomId) => {
        const room = roomId.split("-");

        const findRoom_1 = await RoomModel.find({name : `${room[0]}-${room[1]}`}).exec();
        const findRoom_2 = await RoomModel.find({name : `${room[1]}-${room[0]}`}).exec();

        if(findRoom_1.length > 0) {
            socket.leave(findRoom_1[0].name);
        } else if(findRoom_2.length > 0) {
            socket.leave(findRoom_2[0].name);
        }
    }




    io.on("connection", (socket) => {

        // if room is exist join to room else create room and join
        socket.on("joinRoom", ({roomId, name, photo}) => {
            joinRoom(socket, roomId, name, photo)
        });
    
        // create new message 
        socket.on("sendMessage", ({roomId, message, photo}) => {
            sendMessage(socket, roomId, message, photo)
        })
    
        socket.on("leaveRoom", ({roomId})=> {
            leaveRoom(socket, roomId)
        })
    
        socket.on('disconnect', () => {
            socket.off("joinRoom", joinRoom);
            socket.off("sendMessage", sendMessage);
            socket.off("leaveRoom", leaveRoom);
        })
    });
}

module.exports = socketChat;