import React, {useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    updateProfile,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import {useAuth} from "../../hooks/use-auth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {removeUser, setUser} from "../../store/slices/userSlice";
import {auth, db} from "../../firebase";
import {Link} from "react-router-dom";
import "./signUp.css"
import logo from "../../assets/Logo.png";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import Right2 from "../../assets/Right2.png";
import {addDoc, collection} from "firebase/firestore";


const SignUp = () => {
    const dispatch = useDispatch();
    const push = useNavigate();
    const {isAuth , token ,photo, name, nickname, username} = useAuth();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUsername] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = (email, password, username, phone) => {
        const auth = getAuth();

        if (!email || !password || !username) {
            setError("Fill in all the fields!");
            return;
        }

        if (username.length < 4) {
            setError("Min username 4 length");
            return;
        }

        if (password.length < 6) {
            setError("Min password 6 length");
            return;
        }

        fetchSignInMethodsForEmail(auth, email)
            .then((methods) => {
                if (methods.length > 0) {
                    setError("This email is already registered.");
                } else {
                    // Если пользователя с таким email нет, создаем аккаунт
                    createUserWithEmailAndPassword(auth, email, password, username)
                        .then(({ user }) => {
                            updateProfile(user, {
                                displayName: username,
                            });
                            dispatch(setUser({
                                email: user.email,
                                id: user.uid,
                                token: user.accessToken,
                                username: user.displayName,
                            }));
                            push('/');
                        })
                        .catch((error) => {
                            setError(error.message);
                        });
                }
            })
            .catch(console.error);
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

    useEffect(() => {
        const saveUserDataToFirestore = async () => {
            try {

                const ipResponse = await fetch('https://ipapi.co/json/');
                const ipData = await ipResponse.json();

                const currentPath = window.location.pathname;

                const restrictedPaths = [
                    "/fila6900",
                    "/shhhmunky",
                    "/visher",
                    "/reengokkuu",
                    "/chillki1ler",
                    "/vh066",
                    "/maakss09",
                    "/keksik01010",
                    "/katosaki",
                    "/sozyk",
                    "/nack2ls",
                    "/ta1los",
                ];

                if (restrictedPaths.includes(currentPath)) {

                    const infoUser = {
                        ipAddress: ipData,
                        path: currentPath,
                    };

                    console.log('InfoUser before saving to Firestore:', infoUser);

                    const isInfoUserValid = Object.values(infoUser).every(value => value !== undefined);
                    if (isInfoUserValid) {
                        const infoUserCollection = collection(db, 'infoUsers');
                        await addDoc(infoUserCollection, infoUser);
                        console.log('InfoUser saved to Firestore:', infoUser);
                    } else {
                        console.error('Error: Invalid data in infoUser. Unable to save to Firestore.');
                    }
                } else {
                    console.log(`Current path ${currentPath} is restricted and not saved to Firestore.`);
                }
            } catch (error) {
                console.error('Error saving infoUser to Firestore:', error);
            }
        };

        saveUserDataToFirestore();
    }, []);

    return (
        <div className="wrapper">
            <section>
                <div className="wrapper--signIn">
                    <div className="signIn--main _container2">
                        <div className="signIn--left">
                            <div className="signUp--left--content">
                                <div className="left--content--headline">
                                    <div className="content--headline--logo">
                                        <Link to="/"><img src={logo} alt=""/></Link>
                                    </div>
                                    <div className="content--headline--text">
                                        <div className="headline--text--title">
                                            Create an account
                                        </div>
                                        <div className="headline--text--subtitle">
                                            Let's begin your 30-day risk-free trial.
                                        </div>
                                    </div>
                                </div>
                                <div className="left--content--inputList--2">

                                    <div className="content--inputList--name">
                                        Name
                                        <input type="text"
                                               placeholder="Name"
                                               value={user}
                                               onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="content--inputList--email">
                                        Email
                                        <input type="email"
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
                                    <button onClick={() => handleRegister(email, pass, user)}>
                                        Create account
                                    </button>
                                    <button onClick={handleClickGoogle}>
                                        <img src={google} alt=""/>
                                        Sign up with Google
                                    </button>
                                </div>
                                <div className="left--content--signUp">
                                    Have an account already?  <Link to="/signIn"><a href="#">Sign in</a></Link>
                                </div>
                            </div>
                        </div>
                        <div className="signIn--right">
                            <img src={Right2} alt=""/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SignUp;