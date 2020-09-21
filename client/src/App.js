import React, {useState, useEffect} from "react";


import "./App.scss";

import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat"

import CircularProgress from '@material-ui/core/CircularProgress';


export const UserContext = React.createContext();


function App() {
    const[isAuth, setIsAuth] = useState(undefined);
    const[dataUser, setDataUser] = useState({})

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/auth/checkAuth", {
            method : "GET",
            credentials : "include"
        }).then( response => {
            return response.json();
        }).then( data => {
            setIsAuth( () => data.success);
            setDataUser( () => data.user);
        })
    }, [])

    useEffect(()=> {
        const intervalChechUser = setInterval( () => {
            fetch("http://127.0.0.1:8000/auth/checkAuth", {
                method : "GET",
                credentials : "include"
            }).then( response => {
                return response.json();
            }).then( data => {
                setIsAuth( () => data.success);
                setDataUser( () => data.user);
            })
        }, 5000);
        return () => {
            clearInterval(intervalChechUser)
        }
    }, [isAuth])

    return (
        <div className="Chat-application">
            {
                (isAuth) ? 
                    <UserContext.Provider value={dataUser}>
                        <Chat />
                    </UserContext.Provider> :
                    (isAuth === undefined) ? <div className="wrapperCircular"> <CircularProgress /> </div> :
                    <Login />
            }
        </div>
    );
}

export default App;
