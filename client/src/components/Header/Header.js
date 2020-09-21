import React, {useContext} from "react";
import {UserContext} from "../../App";

import "./Header.scss";

import Avatar from '@material-ui/core/Avatar';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';


function Header() {
    const User = useContext(UserContext);
    return (
        <div className="Header">
            <MenuOpenIcon />
            <div className="Header__user">
                <Avatar alt={User.name} src={User.photo} />
                <span className="Header__username">{User.name}</span>
            </div>
        </div>
    );
}

export default Header;