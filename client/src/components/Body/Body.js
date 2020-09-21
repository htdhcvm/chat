import React, {useEffect, useState, useContext} from "react";

import "./Body.scss";

import {UserContext} from "../../App";

import ListUsers from "../ListUsers/ListUsers";
import ChatBody from "../ChatBody/ChatBody";
import io from "socket.io-client";

export const BodyContext = React.createContext();

function Body() {
    const CurrentUser = useContext(UserContext);

    const[displayStatus, setDisplayStatus] = useState(false);
    const[changeIdUser, setChangeIdUser] = useState(undefined);
    const[name, setName] = useState("");
    const[listMessages, setListMessages] = useState([]);
    const[currnetRoom, setCurrentRoom] = useState("");


    const socket = io("http://127.0.0.1:8000");

    useEffect( () => {
        
        if(currnetRoom.trim().length !== 0) {
            socket.emit("joinRoom", {
                roomId : currnetRoom,
                name : CurrentUser.name,
                photo : CurrentUser.photo
            });
            

            socket.on("whoJoined", ({name, photo}) => {
                console.log(name);
            });


            socket.on("messageToClient", ({id, msg, photo}) => {
                setListMessages( state => {
                    state.push({
                        id : id,
                        msg : msg,
                        photo : photo
                    });
                    return [
                        ...state
                    ]
                })
            })

            socket.on("messagesOnCurrentRoom", (messages) => {
                setListMessages( () => {
                    let tmp = [];
                    messages.forEach( message => {
                        tmp.push({
                            id : message.currentUser,
                            msg : message.text,
                            photo : message.photo
                        })
                    })


                    return tmp;
                })
            })

            socket.on("error", ({message}) => {
                console.log(message);
            })

        }

        return () => {
            socket.emit("leaveRoom", {roomId : currnetRoom});

            socket.off("whoJoined");

            socket.off("messageToClient");

            socket.off("messagesOnCurrentRoom");

            socket.off("error");

            
            setListMessages( () => {
                return [];
            });
        }
    }, [changeIdUser]);

    useEffect( () => console.log("render"))


    const sendMsg = (value) => {
        socket.emit("sendMessage", { 
            roomId : currnetRoom,
            message : value,
            photo : CurrentUser.photo
        })
    }

    return (
        <div className="Body">
            <BodyContext.Provider value={
                {
                    setChangeIdUser : setChangeIdUser,
                    setNameUserChat : setName,
                    setStatus : setDisplayStatus,
                    setCurrentRoom : setCurrentRoom,
                    name : name,
                    listMessages : listMessages,
                    status : displayStatus,
                    currentUserId : CurrentUser.id
                }
            }>
                <ListUsers/>
                <ChatBody sendMsg={sendMsg}/>
            </BodyContext.Provider>
            
        </div>
    );
}

export default Body;