import React from "react";


// import TwitterIcon from '@material-ui/icons/Twitter';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import GitHubIcon from '@material-ui/icons/GitHub';



import "./Login.scss";


function App() {

    const handleAuthGoogle = () => {
        window.open("http://127.0.0.1:8000/auth/google", "_self");
    }

    const handleAuthGitHub = () => {
        window.open("http://127.0.0.1:8000/auth/github", "_self");
    }

    return (
        <div className="Login">
            <h1 className="title">Enter the chat</h1>
            {/* <TwitterIcon className="Login__bird" /> */}
            <div className="Login__wrapper__sign-in">
                <button className="Login__wrapper__sign-in__btn" onClick={handleAuthGoogle}><GTranslateIcon/>Sign in with google</button>
                <button className="Login__wrapper__sign-in__btn" onClick={handleAuthGitHub}><GitHubIcon/>Sign in with github</button>
            </div>
        </div>
    );
}

export default App;
