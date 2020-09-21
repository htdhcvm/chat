import React, {useContext} from "react";

import {BodyContext} from "../Body/Body";

import "./User.scss";

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

function User({name, photo, active, id}) {
    const body = useContext(BodyContext);

    const handlerCreateDialog = () => {
        body.setCurrentRoom(`${id}-${body.currentUserId}`);
        body.setChangeIdUser(id);
        body.setNameUserChat(name);
        body.setStatus(true);
        // todo
    }

    return (
        <div onClick={handlerCreateDialog} className="User">
            <Avatar alt={name} src={photo} />
            <div className="User__text">
                <h4 className="User__name">{name}</h4>
                <span className="User__message">Lorem ipsum dolor</span>
            </div>
            {
                (active=== true) ? <Badge color="secondary" variant="dot" /> : <Badge className="grey" color="secondary" variant="dot" />
            }
        </div>
    );
}

export default User;