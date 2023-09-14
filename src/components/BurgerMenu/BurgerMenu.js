import React, { useState , useEffect} from 'react';
import './BurgerMenu.css';
import { motion, useAnimation } from 'framer-motion';
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/use-auth";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {removeUser} from "../../store/slices/userSlice";
import {useDispatch} from "react-redux";
import logoWhite from "../../assets/Logo2.png"
import logo2 from "../../assets/Logo.png";
const BurgerMenu = () => {
    const dispatch = useDispatch();
    const {isAuth, token, photo, name, nickname, username, email} = useAuth();
    const [isActive, setIsActive] = useState(false);
    const controls = useAnimation();
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

    useEffect(() => {
        if (isActive) {
            document.body.classList.add('active4');
        } else {
            document.body.classList.remove('active4');
        }
    }, [isActive]);

    const logOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser())
        }).catch((error) => {
            // An error happened.
        });
    }
    const handleClick = () => {
        setIsActive(!isActive);
        setIsBurgerMenuOpen(!isBurgerMenuOpen);

        // Управление анимацией при клике
        if (isActive) {
            setIsBurgerMenuOpen(false);
            controls.start({
                rotate: 0,
                transition: { duration: 0.8, ease: [0.58, 0.19, 0.39, 0.77] },
            });
        } else {
            setIsBurgerMenuOpen(true);
            controls.start({
                rotate: -135,
                transition: { duration: 0.8, ease: [0.58, 0.19, 0.39, 0.77] },
            });
        }
    };

    return (
        <div className={`wrapper--mainBurger--block ${isBurgerMenuOpen ? "active3" : ""}`}>
            <div className={`mainBurgerblock `}>
                <header className={`mainBurger ${isBurgerMenuOpen ? "active2" : ""}`}>
                    <div className="burgerNav">
                        <Link to="/">
                            {!isBurgerMenuOpen ? null :(
                                <div className="left--nav--white">
                                    <img src={logoWhite} alt=""/>
                                </div>)
                            }
                            <div className="left--nav">
                                <img src={logo2} alt=""/>
                            </div>
                        </Link>
                    </div>
                    <motion.div
                        className={`McButton ${isActive ? "active" : ""}`}
                        onClick={handleClick}
                        data-hamburger-menu
                        animate={controls}
                    >
                        <motion.div className={`McBar McBar1 ${isActive ? "active" : ""}`} initial={{ top: 0 }}
                                    animate={{ top: isActive ? "50%" : 0 }} transition={{ duration: 0.2 }}></motion.div>
                        <motion.div className={`McBar McBar2 ${isActive ? "active" : ""}`} initial={{ opacity: 1 }}
                                    animate={{ opacity: isActive ? 0 : 1 }} transition={{ duration: 0.2 }}></motion.div>
                        <motion.div className={`McBar McBar3 ${isActive ? "active" : ""}`} initial={{ top: "100%" }}
                                    animate={{ top: isActive ? "50%" : "100%" }} transition={{ duration: 0.2 }}></motion.div>

                    </motion.div>
                </header>
                <section>
                    {!isBurgerMenuOpen ? null : (
                        <header>
                            <div className="heroBurger">
                                <div className="nav--main--Burger _container">
                                    <div className="center--nav--Burger">
                                        <nav>
                                            <ul>
                                                {email === "admin@gmail.com" && (
                                                    <Link to="/admin"><li>Admin Panel</li></Link>
                                                )}
                                                <li className="nomore">Features</li>
                                                <Link to="/prices"><li>Prices</li></Link>
                                                <li className="nomore">Company</li>
                                                <li className="nomore">Developers</li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="right--nav--Burger">
                                        <div className="headers__text--Burger">
                                            <p> {name} {nickname} {username}</p>
                                        </div>
                                        <Link className="Link--right--nav-get-started" to="/">
                                            <button className="right--nav-get-started" onClick={logOut}>Log out</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </header>
                    )}
                </section>
            </div>
        </div>

    );
};

export default BurgerMenu;
