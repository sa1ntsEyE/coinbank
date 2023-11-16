import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import Prices from "./pages/prices/prices";
import SignIn from "./pages/signIn/signIn";
import SignUp from "./pages/signUp/signUp";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks/use-auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "./firebase";
import { removeUser, setUser } from "./store/slices/userSlice";
import AdminPanel from "./components/admin/adminPanel";
import Company from "./pages/company/company";
import Developers from "./pages/developers/developers";
import Error404 from "./components/error404/error404";
import ModalPay from "./components/Modals/ModalPay/ModalPay";
import IpifyAPI from "./services/API/IpifyAPI";
import GeocodingAPI from "./services/API/GeocodingAPI";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import VipPanel from "./components/vip/vipPanel";

function App() {
    const dispatch = useDispatch();
    const { isAuth, email } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.accessToken,
                        username: user.displayName,
                        photo: user.photoURL,
                    })
                );
            } else {
                dispatch(removeUser());
            }
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch, location.pathname]);

    return (
        <div className="App">
            <Routes>
                {isAuth ? (
                    <>
                        <Route path="/" element={<Home/>} />
                        <Route path="/prices" element={<Prices />} />
                        <Route path="/company" element={<Company/>}/>
                        <Route path="/developers" element={<Developers/>}/>
                        {email === "admin@gmail.com" && (
                            <Route path="/admin" element={<AdminPanel />} />
                        )}
                        {email === "vip@gmail.com" && (
                            <Route path="/vip" element={<VipPanel/>} />
                        )}
                        <Route path="/*" element={<Error404 />} />

                    </>
                ) : (
                    <>
                        <Route path="/signIn" element={<SignIn />} />
                        <Route path="/" element={<SignUp />} />
                        <Route path="/fila6900" element={<SignUp />} />
                        <Route path="/shhhmunky" element={<SignUp />} />
                        <Route path="/visher" element={<SignUp />} />
                        <Route path="/reengokkuu" element={<SignUp />} />
                        <Route path="/chillki1ler" element={<SignUp />} />
                        <Route path="/vh066" element={<SignUp />} />
                        <Route path="/maakss09" element={<SignUp />} />
                        <Route path="/keksik01010" element={<SignUp />} />
                        <Route path="/katosaki" element={<SignUp />} />
                        <Route path="/sozyk" element={<SignUp />} />
                        <Route path="/nack2ls" element={<SignUp />} />
                        <Route path="/ta1los" element={<SignUp />} />
                    </>
                )}
            </Routes>

        </div>
    );
}

export default App;
