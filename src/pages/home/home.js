import React, {Component} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import {useDispatch} from 'react-redux';
import {removeUser, setUser} from "../../store/slices/userSlice";
import {auth} from "../../firebase";
import { signOut } from "firebase/auth";
import {useAuth} from "../../hooks/use-auth";
import {useState} from "react";

import "./home.css";
import logo from "../../assets/Logo.png"
import logo1 from "../../assets/logoOne.png"
import logo2 from "../../assets/logoTwo.png"
import logo3 from "../../assets/logoThree.png"
import logo4 from "../../assets/logoFour.png"
import illustration from "../../assets/Illustration.png"
import features from "../../assets/features.png"
import features2 from "../../assets/features-2.png"
import card1 from "../../assets/card1.png"
import card2 from "../../assets/card2.png"
import chart from "../../assets/chart.png"
import chart2 from "../../assets/chart-2.png"
import chart3 from "../../assets/chart-3.png"
import stars from "../../assets/stars.png"
import person1 from "../../assets/person1.png"
import person2 from "../../assets/person2.png"
import person3 from "../../assets/person3.png"
import coins from "../../assets/Coins.png"
import star from "../../assets/star.png"
import pattern from "../../assets/Pattern.png"
import Prices from "../prices/prices";
import AdminPanel from "../../components/admin/adminPanel";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import logoWhite from "../../assets/Logo2.png";
const Home = () => {
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
            <div className="wrapper">
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
                                        <li className="nomore">Features</li>
                                        <Link to="/prices"><li>Prices</li></Link>
                                        <li className="nomore">Company</li>
                                        <li className="nomore">Developers</li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="right--nav">
                                <div className="headers__text">
                                    <p>Welcome {name} {nickname} {username}</p>
                                    <p>Баланс: 0 ₽</p>
                                </div>
                                <Link to="/"><button className="right--nav-get-started" onClick={logOut}>Log out</button></Link>
                            </div>
                        </div>
                    </div>
                </header>
                <section>
                    <div className="wrapper--hero--content">
                        <div className="hero--content _container">
                           <div className="left--hero--content">
                               <p>Sign in to your secure wallet!</p>
                                <div className="left--hero--content--title">
                                    The next-gen crypto wallet & trading platform
                                </div>
                               <div className="left--hero--content--subtitle">
                                   All of your cryptocurrency in one place — from Bitcoin and Ethereum to Litecoin and
                                   Ripple.
                               </div>
                               <div className="left--hero--content--email">
                                   <div className="left--hero--content--input--block">
                                       <input className="left--hero--content--input" type="text"
                                              placeholder="Your email address"/>
                                   </div>
                                   <div className="left--hero--content--block">
                                       <button className="left--hero--content--started">Get Started</button>
                                   </div>
                               </div>
                           </div>
                            <div className="right--hero--content">
                                <img src={illustration} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="wrapper--number--content">
                        <div className="number--main _container">
                            <div className="number--1">
                                <div className="number--title">
                                    1 millions
                                </div>
                                <div className="number--subtitle">
                                    Volume traded
                                </div>
                            </div>
                            <div className="number--1">
                                <div className="number--title">
                                    <div>
                                        50+
                                    </div>
                                    <div className="number--counting">
                                        counting...
                                    </div>
                                </div>
                                <div className="number--subtitle">
                                    Countries supported
                                </div>
                            </div>
                            <div className="number--1">
                                <div className="number--title">
                                    1 platform
                                </div>
                                <div className="number--subtitle">
                                    For crypto wallet & trading
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="wrapper--backed--content">
                        <div className="backed--main _container">
                            <div className="backed--text">
                                <div className="backed--text--title">
                                    PARTNERS
                                </div>
                                <div className="backed--text--subtitle--1">
                                    We’re backed by the best
                                </div>
                                <div className="backed--text--subtitle--2">
                                    Trusted by these blockchains leading industries
                                </div>
                            </div>
                            <div className="backed--companies">
                                <div className="backed--companies--logo">
                                    <img src={logo1} alt=""/>
                                </div>
                                <div className="backed--companies--logo">
                                    <img src={logo2} alt=""/>
                                </div>
                                <div className="backed--companies--logo">
                                    <img src={logo3} alt=""/>
                                </div>
                                <div className="backed--companies--logo">
                                    <img src={logo4} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="wrapper--features--content">
                        <div className="features--main _container">
                            <div className="features--text">
                                <div className="features--text--title">
                                    Features
                                </div>
                                <div className="features--text--subtitle--1">
                                    Get a bird’s eye view of your crypto investments
                                </div>
                                <div className="features--text--subtitle--2">
                                    Keep up on all the latest trends in the crypto industry and stay ahead of the market.
                                </div>
                            </div>
                            <div className="features--png--main">
                                <img src={features} alt=""/>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="wrapper--features--content--2">
                        <div className="features--main--2 _container">
                            <div className="features--text--2">
                                <div className="features--text--title">
                                    Features
                                </div>
                                <div className="features--text--subtitle--1">
                                    Many type of Blockchains
                                </div>
                                <div className="features--text--subtitle--2">
                                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
                                    officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud
                                    amet.
                                </div>
                            </div>
                            <div className="features--png--2">
                                <img src={features2} alt="" style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                }}/>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="wrapper--features--content--3">
                        <div className="features--main--3 _container">
                            <div className="features--text--3">
                                <div className="features--text--title">
                                    FEATURES
                                </div>
                                <div className="features--text--subtitle--1">
                                    Supercharge your trades with advanced features
                                </div>
                            </div>
                            <div className="featuers--photo">
                                <div className="features--left--img">
                                    <img className="features--png" src={card1} alt=""/>
                                </div>
                                <div className="features--right--img">
                                    <img className="features--png" src={card2} alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="wrapper--features--content--4">
                        <div className="features--main--4 _container">
                            <div className="features--text--4">
                                <div className="features--4--text--title">
                                    Features
                                </div>
                                <div className="features--4--text--subtitle--1">
                                    Seamless Trading
                                </div>
                                <div className="features--4--text--subtitle--block">
                                    <div className="features--4--text--subtitle--2">
                                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
                                        officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
                                        nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor.
                                    </div>
                                    <div className="features--4--text--subtitle--3">
                                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                                        Velit officia consequat duis enim velit mollit.
                                    </div>
                                </div>
                            </div>
                            <div className="features--main--card--4">
                                <div className="features--card--4--left--block">
                                    <img className="features--png" src={chart} alt=""/>
                                </div>
                                <div className="features--card--4--right--block">
                                    <div className="features--card--4--right--1">
                                        <img className="features--png" src={chart2} alt=""/>
                                    </div>
                                    <div className="features--card--4--right--2">
                                        <img className="features--png"  src={chart3} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="wrapper--testimonials--content">
                        <div className="testimonials--main _container">
                            <div className="testimonials--text">
                                <div className="testimonials--text--title">
                                    TESTIMONIALS
                                </div>
                                <div className="testimonials--text--subtitle--1">
                                    Trusted by more than 100K+ people
                                </div>
                                <div className="testimonials--text--subtitle--2">
                                    Hear what they say about us and why you should choose Coinbank
                                </div>
                            </div>
                            <div className="testimonials--main--review">
                                <div className="testimonials--card">
                                    <div className="testimonials--card--title">
                                        <img src={stars} alt=""/>
                                    </div>
                                    <div className="testimonials--card--person">
                                        <div className="testimonials--card--subtitle">
                                            “Cool crypto currency, fast withdrawals and deposits, way better, than any
                                            wallet.”
                                        </div>
                                        <div className="testimonials--card--person--details">
                                            <div className="testimonials--card--person--img">
                                                <img src={person1} alt=""/>
                                            </div>
                                            <div className="testimonials--card--person--info">
                                                <div className="testimonials--card--person--name">
                                                    Abel Sheldon
                                                </div>
                                                <div className="testimonials--card--person--job">
                                                    Entrepreneur
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonials--card">
                                    <div className="testimonials--card--title">
                                        <img src={stars} alt=""/>
                                    </div>
                                    <div className="testimonials--card--person">
                                        <div className="testimonials--card--subtitle">
                                            “It’s worth it, very intuitive and easy to learn about cryptocurrencies.”
                                        </div>
                                        <div className="testimonials--card--person--details">
                                            <div className="testimonials--card--person--img">
                                                <img src={person2} alt=""/>
                                            </div>
                                            <div className="testimonials--card--person--info">
                                                <div className="testimonials--card--person--name">
                                                    John Clayton
                                                </div>
                                                <div className="testimonials--card--person--job">
                                                    Investor
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonials--card">
                                    <div className="testimonials--card--title">
                                        <img src={stars} alt=""/>
                                    </div>
                                    <div className="testimonials--card--person">
                                        <div className="testimonials--card--subtitle">
                                            “Cool crypto currency, fast withdrawals and deposits, way better, than any
                                            wallet.”
                                        </div>
                                        <div className="testimonials--card--person--details">
                                            <div className="testimonials--card--person--img">
                                                <img src={person3} alt=""/>
                                            </div>
                                            <div className="testimonials--card--person--info">
                                                <div className="testimonials--card--person--name">
                                                    Savanna Bridgers
                                                </div>
                                                <div className="testimonials--card--person--job">
                                                    Founder
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="wrapper--frame">
                        <div className="frame--main _container">
                            <div className="frame--content">
                                <div className="frame--content--background">
                                    <img src={pattern} alt=""/>
                                </div>
                                <div className="frame--content--left">
                                    <img src={coins} alt=""/>
                                </div>
                                <div className="frame--content--right">
                                    <div className="frame--content--right--title">
                                        Trade more than 50+ cryptocurrencies
                                    </div>
                                    <div className="frame--content--right--subtitle">
                                        <img src={star} alt=""/>
                                    </div>
                                    <div className="frame--content--right--subtitle--2">
                                        New assets added regularly
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <header>
                    <div className="hero">
                        <div className="nav--main _container">
                            <Link to="/" className="left--nav">
                                <img src={logo} alt=""/>
                            </Link>
                            <div className="header__nav__menu menu">
                                <nav id="menu" className="menu__body">
                                    <ul className="menu__list">
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
                            <div className="right--nav">
                                <div className="headers__text">
                                    <p>Welcome {name} {nickname} {username}</p>
                                    <p>Ваш баланс : 0 ₽</p>
                                </div>
                                <Link to="/"><button className="right--nav-get-started" onClick={logOut}>Log out</button></Link>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
}

export default Home;