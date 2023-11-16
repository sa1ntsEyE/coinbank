import React, {Component, useState} from 'react';
import {useDispatch} from "react-redux";
import {useAuth} from "../../hooks/use-auth";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {removeUser} from "../../store/slices/userSlice";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import {Link} from "react-router-dom";
import logo from "../../assets/Logo.png";
import people from "../../assets/people.png"
import person2 from "../../assets/person2.png"
import drochevo from "../../assets/drochevo.png"
import drochevo2 from "../../assets/drochevo2.png"
import dude from "../../assets/dude.png"
import dude2 from "../../assets/dude2.png"
import dude3 from "../../assets/dude3.png"
import "./company.css";
import logo1 from "../../assets/logoOne.png";
import logo2 from "../../assets/logoTwo.png";
import logo3 from "../../assets/logoThree.png";
import logo4 from "../../assets/logoFour.png";
import Header from "../../components/Header/header";
const Company = () => {
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
            <Header/>
            <section>
                <div className="wrapper--about--content">
                    <div className="about--content _container3">
                        <div className="about--content--text">
                            <div className="about--content--text--title">
                                ABOUT
                            </div>
                            <div className="about--content--text--subtitle">
                                Building cryptocurrency platform for everyone
                            </div>
                        </div>
                        <div className="about--content--people--img">
                            <img src={people} alt=""/>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="wrapper--ourmission--content">
                    <div className="mission--content _container3">
                        <div className="mission--left--content">
                            <div className="mission--left--content--title">
                                Our Mission
                            </div>
                            <div className="mission--left--content--subtitle">
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor.
                            </div>
                            <div className="mission--left--content--link">
                                Learn more
                            </div>
                        </div>
                        <div className="mission--right--content">
                            <div className="mission--right--content--info">
                                <div className="mission--right--content--info--title">
                                    1 millions
                                </div>
                                <div className="mission--right--content--info--subtitle">
                                    Average daily volume
                                </div>
                            </div>
                            <div className="mission--right--content--info">
                                <div className="mission--right--content--info--title">
                                    300k+
                                </div>
                                <div className="mission--right--content--info--subtitle">
                                    Transactions per seconds
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="wrapper--testmonial--content">
                    <div className="testmonial--main--block _container3">
                        <div className="testmonial--main--block--quotes">
                            “
                        </div>
                        <div className="testmonial--main--block--title">
                            Its low fees, high rates for staking, and futures markets are all a draw.
                        </div>
                        <div className="testmonial--main--block--subtitle">
                            <div className="testmonial--subtitle--img--block">
                                <img src={person2} alt="#"/>
                            </div>
                            <div className="testmonial--subtitle--info">
                                <div className="testmonial--subtitle--info--name">
                                    John Clayton
                                </div>
                                <div className="testmonial--subtitle--info--job">
                                    Investor
                                </div>
                            </div>

                        </div>
                        <div className="testmonial--main--block--quotes">
                            ”
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="wrapper--galleryPhotos--content">
                    <div className="galleryPhotos--main--block _container3">
                        <div className="galleryPhotos--main--img">
                            <img src={drochevo} alt=""/>
                        </div>
                        <div className="galleryPhotos--main--img">
                            <img src={drochevo2} alt=""/>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="wrapper--section--content">
                    <div className="section--content--main _container3">
                        <div className="section--content--main--title">
                            The power to chart your own financial course
                        </div>
                        <div className="section--content--main--subtitle">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor.
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="wrapper--boardPeople--content">
                    <div className="boardPeople--content--main _container3">
                        <div className="boardPeople--content--title">
                            Our Founders
                        </div>
                        <div className="boardPeople--content--info--main">
                            <div className="boardPeople--content--info">
                                <div className="boardPeople--content--info--img">
                                    <img src={dude} alt=""/>
                                </div>
                                <div className="boardPeople--content--info--title">
                                    Ozan Kabak
                                </div>
                                <div className="boardPeople--content--info--subtitle">
                                    Founder & CEO, Coinbank
                                </div>
                            </div>
                            <div className="boardPeople--content--info">
                                <div className="boardPeople--content--info--img">
                                    <img src={dude2} alt=""/>
                                </div>
                                <div className="boardPeople--content--info--title">
                                    Ali Petra
                                </div>
                                <div className="boardPeople--content--info--subtitle">
                                    Founder & CEO, Coinbank
                                </div>
                            </div>
                            <div className="boardPeople--content--info">
                                <div className="boardPeople--content--info--img">
                                    <img src={dude3} alt=""/>
                                </div>
                                <div className="boardPeople--content--info--title">
                                    Marcella Melano
                                </div>
                                <div className="boardPeople--content--info--subtitle">
                                    Founder & CEO, Coinbank
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="wrapper--backed--content">
                    <div className="backed--main _container3">
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
        </div>
    )
}

export default Company;