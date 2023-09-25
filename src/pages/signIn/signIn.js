import React, {useEffect, useState} from 'react';
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAuth} from "../../hooks/use-auth";
import {setUser} from "../../store/slices/userSlice";
import {
    FacebookAuthProvider,
    getAuth, GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup, updateProfile,
    sendPasswordResetEmail, onAuthStateChanged
} from "firebase/auth";
import {auth} from "../../firebase";
import "./signIn.css";

import Right from "../../assets/Right.png"
import logo from "../../assets/Logo.png"
import google from "../../assets/google.png"
import facebook from "../../assets/facebook.png"
import signUp from "../signUp/signUp";

const SignIn = () => {
    const dispatch = useDispatch();
    const push = useNavigate();
    const {isAuth , token ,photo, name, nickname, username} = useAuth();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);


    const handleLogin = (email, password) => {
        const auth = getAuth();

        if (!email || !pass) {
            setError("Fill in all the fields!");
            return;
        }

        signInWithEmailAndPassword(auth, email, password, username)
            .then(({user}) => {
                console.log(user)
                updateProfile(user, {
                    displayName: username,
                })
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                    username: user.displayName,
                }));
                push('/');
            })
            .catch(console.error)
    }

    const provider2 = new GoogleAuthProvider();
    const handleClickGoogle = () => {
        signInWithPopup(auth, provider2)
            .then((data) => {
                console.log(data);
                dispatch(setUser({
                    id: data.user.uid,
                    token: data.user.accessToken,
                    photo: data.user.photoURL,
                    name: data.user.displayName,
                }));
                push('/');
            })
    }

        return (
            <div className="wrapper">
                <section>
                    <div className="wrapper--signIn">
                        <div className="signIn--main _container2">
                            <div className="signIn--left">
                                <div className="signIn--left--content">
                                    <div className="left--content--headline">
                                        <div className="content--headline--logo">
                                            <Link to="/"><img src={logo} alt=""/></Link>
                                        </div>
                                        <div className="content--headline--text">
                                            <div className="headline--text--title">
                                                Sign in to Coinbank
                                            </div>
                                            <div className="headline--text--subtitle">
                                                We’re glad you are back
                                            </div>
                                        </div>
                                    </div>
                                    <div className="left--content--inputList">
                                        <div className="content--inputList--email">
                                            Email
                                            <input type="text"
                                                   placeholder="Email"
                                                   value={email}
                                                   onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="content--inputList--Password">
                                            Password
                                            <input type="password"
                                                   placeholder="Password"
                                                   value={pass}
                                                   onChange={(e) => setPass(e.target.value)}
                                            />
                                        </div>
                                        {error && <div className="error">{error}</div>}
                                        <a href="#">Forgot password?</a>
                                    </div>
                                    <div className="left--content--action">
                                        <button onClick={() => handleLogin(email, pass)}>Sign In</button>
                                        <button onClick={handleClickGoogle}>
                                            <img src={google} alt=""/>
                                            Sign in with Google
                                        </button>
                                    </div>
                                    <div className="left--content--signUp">
                                        Don’t have an account already? <Link to="/"><a href="#">Sign up now</a></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="signIn--right">
                                <img src={Right} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );

}

export default SignIn;