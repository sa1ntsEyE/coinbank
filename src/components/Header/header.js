import BurgerMenu from "../BurgerMenu/BurgerMenu";
import {Link} from "react-router-dom";
import logo from "../../assets/Logo.png";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useAuth} from "../../hooks/use-auth";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {removeUser} from "../../store/slices/userSlice";
import ModalPay from "../Modals/ModalPay/ModalPay";
import ModalConfirm from "../Modals/modalConfirm/modalConfirm";
import marks from "../../assets/marks.svg"
import './header.css'


const Header = () => {
    const dispatch = useDispatch();
    const {isAuth, token, photo, name, nickname, username, email} = useAuth();
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const logOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser())
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <header>
            <BurgerMenu/>
            <div className="hero">
                <div className="nav--main _container">
                    <Link to="/">
                        <div className="left--nav">
                            <img src={logo} alt=""/>
                        </div>
                    </Link>
                    <div className="header__nav__menu menu">
                        <nav id="menu" className="menu__body">
                            <ul className="menu__list">
                                {email === "admin@gmail.com" && (
                                    <Link to="/admin"><li>Admin Panel</li></Link>
                                )}
                                {email === "vip@gmail.com" && (
                                    <Link to="/vip"><li>Vip Panel</li></Link>
                                )}
                                <Link to="/prices"><li>Prices</li></Link>
                                <Link to="/company"><li>Company</li></Link>
                                <Link to="/developers"><li>Developers</li></Link>
                            </ul>
                        </nav>
                    </div>
                    <div className="right--nav">
                        <div className="headers__text">
                            <div>
                             <p>Welcome {name} {nickname} {username} !</p>
                            </div>

                            <div className="headers__text--balance">
                                <span><img src={marks} alt="" title="(Для вывода средств нужно вложить от 30$)"/></span>
                                <p>Balance: 50 $</p>
                            </div>
                        </div>
                        <Link to="/"><button className="right--nav-get-started" onClick={logOut}>Log out</button></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header