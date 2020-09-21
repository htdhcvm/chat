import React, {useState, useEffect} from "react";

import "./ListUsers.scss";
import User from "../User/User";
import Devider from "../Devider/Devider";



function ListUsers() {
    const [users, setUsers] = useState([]);

    const getAllNotCurrent = () => {
        fetch("http://127.0.0.1:8000/user/getAllNotCurrent",{
            method : "POST",
            credentials : "include"
        }).then(response => response.json())
        .then( data => {
            setUsers(data);
        })
    }
    
    useEffect( () => {
        getAllNotCurrent();
    }, []);


    useEffect( () => {
        const intervalUser = setInterval(() => {
            getAllNotCurrent();
        }, 4000);

        return () => clearInterval(intervalUser)
    }, [users]);


    const handleLogout = () => {
        window.open("http://127.0.0.1:8000/auth/logout", "_self");
    }

    return (
        <div className="ListUsers">
            <div className="ListUsers-title">
                Chat
            </div>
            <Devider />
            <div className="List">
                {
                    users.map( user => (
                        <div key={`${user._id}1`}> 
                            <User name={user.name} photo={user.photo} active={user.active} id={user._id} key={user._id} />
                            <Devider />
                        </div>
                    ))
                }
            </div>
            <div className="footer">
                <span onClick={handleLogout} className="logout">Logout</span>
            </div>
        </div>
    );
}

export default ListUsers;