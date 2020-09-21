import React, {useContext, useState} from "react";
import { v4 as uuidv4 } from 'uuid';

import Avatar from '@material-ui/core/Avatar';
import "./ChatBody.scss";
import SendIcon from '@material-ui/icons/Send';

import {BodyContext} from "../Body/Body";

function ChatBody({sendMsg}) {
    const body = useContext(BodyContext);

    const[input, setInput] = useState("");

    const handleSendMessage = () => {
        sendMsg(input);
        setInput("")
    }

    return (
        <>
            {
                (body.status) ? 
                    <div className="ChatBody">
                        <div className="ChatBody__title">
                            {body.name}
                        </div>
                        <div className="ChatBody__messages">
                            {
                                body.listMessages.map( message => {
                                    if(+message.id === body.currentUserId) {
                                        return (
                                            <div className="right" key={uuidv4()}>
                                                <Avatar alt={message.msg} src={message.photo} />
                                                <h5>{message.msg}</h5>
                                            </div>
                                        )
                                      
                                    }
                                    return (
                                        <div className="left" key={uuidv4()}>
                                            <Avatar alt={message.msg} src={message.photo} />
                                            <h5>{message.msg}</h5>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="ChatBody__sender">
                            <input onChange={e => setInput(e.target.value)} value={input} className="ChatBody__sender-input" placeholder="Type your message"/>
                            <div className="ChatBody__sender-wrapper-icon">
                                <SendIcon onClick={handleSendMessage}/>
                            </div>
                        </div>
                    </div>
                : null
            }
        </>
       
    );
}

export default ChatBody;