import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {

    const dispatch = useDispatch();
    const { isAuth, email } = useAuth();

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
            // Unsubscribe from the auth state change listener when the component unmounts
            unsubscribe();
        };
    }, [dispatch]);

    return (
        <div className="App">
            <Routes>
                {isAuth ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/prices" element={<Prices />} />
                        {email === "admin@gmail.com" && (
                            <Route path="/admin" element={<AdminPanel />} />
                        )}

                    </>
                ) : (
                    <>
                        <Route path="/signIn" element={<SignIn />} />
                        <Route path="/" element={<SignUp />} />
                    </>
                )}
            </Routes>
        </div>
    );

    // const addToOrder = (item) => {
    //     this.setState({orders: [...this.state.orders, item]});
    // };

}

export default App;
