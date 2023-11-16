import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useAuth} from "../../hooks/use-auth";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {removeUser} from "../../store/slices/userSlice";
import Header from "../../components/Header/header";
import people from "../../assets/people.png";
import  "./developers.css"
import crypto2 from "../../assets/Crypto2.png";
import CryptoPriceChart from "../../components/CryptoPriceChart/CryptoPriceChart";
import ChangePercentage from "../../components/ChangePercentage/ChangePercentage";
import styled from "styled-components";
import features2 from "../../assets/features-2.png";
import {Link} from "react-router-dom";

const Developers = () => {
    const dispatch = useDispatch();
    const {isAuth, token, photo, name, nickname, username, email} = useAuth();
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
    const [tickerData, setTickerData] = useState(null);
    const logOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser())
        }).catch((error) => {
            // An error happened.
        });
    }

    const fetchCryptoData = async () => {
        try {
            const response = await fetch('https://api.binance.com/api/v3/ticker/price');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTickerData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchCryptoData();

        const intervalId = setInterval(() => {
            fetchCryptoData();
        }, 30000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    function findPriceBySymbol(data, symbol) {
        if (data === null) {
            return 'Loading...';
        }
        const cryptoData = data.find(item => item.symbol === symbol);
        return cryptoData ? cryptoData.price : 'Loading...';
    }

    const updatedTickerData = tickerData ? tickerData.map(item => {
        const updatedPrice = parseFloat(item.price) * 0.9;
        return { ...item, price: updatedPrice.toFixed(2) };
    }) : [];

    return (
        <div className="wrapper">
            <Header/>
            <section>
                <div className="wrapper--forDevelopers--content">
                   <div className="forDevelopers--content--main _container3">
                       <div className="forDevelopers--content--main--info">
                           <div className="forDevelopers--content--main--info--title">
                               for developers
                           </div>
                           <div className="forDevelopers--content--main--info--subtitle">
                               Launch your own crypto wallet
                           </div>
                           <div className="forDevelopers--content--main--info--subtitle--2">
                               Create a seamless and secure multi-currency wallet that is compatible with all major cryptocurrencies.
                           </div>
                           <div className="forDevelopers--content--main--info--button">
                               <Link to="/prices"><button>Get Started</button></Link>
                               <Link to="/prices"><button>Read the docs</button></Link>
                           </div>
                       </div>
                   </div>
                </div>
            </section>
            <section>
                <div className="wrapper--devFeaturs--content">
                    <div className="devFeatures--content--main _container3">
                        <div className="devFeatures--content--left">
                            <div className="price--coin--content--card">
                                <div className="price--coin--crypto">
                                    <div className="price--coin--crypto--img">
                                        <img src={crypto2} alt=""/>
                                    </div>
                                    <div className="price--coin--crypto--info">
                                        <div className="price--coin--crypto--info--title">
                                            Bitcoin
                                        </div>
                                        <div className="price--coin--crypto--info--subtitle">
                                            BTC
                                        </div>
                                    </div>
                                </div>
                                <div className="price--coin--chart--dev">
                                    {['BTCUSDT'].map(symbol => (
                                        <CryptoPriceChart key={symbol} symbol={symbol}  />
                                    ))}
                                </div>
                                <div className="price--coin--change">
                                    <div className="price--coin--change--title">
                                        ${findPriceBySymbol(updatedTickerData, 'BTCUSDT')}
                                    </div>
                                    {['BTCUSDT'].map(symbol => (
                                        <ChangePercentage key={symbol} symbol={symbol} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="devFeatures--content--right">
                            <div className="devFeatures--content--right--title">
                                Features
                            </div>
                            <div className="devFeatures--content--right--subtitle">
                                Full of blockchain development services
                            </div>
                            <div className="devFeatures--content--right--subtitle--2">
                                Cloud provides APIs, services and infrastructure across a breadth of primitives
                            </div>
                            <div className="devFeatures--content--right--info">
                                <div className="devFeatures--content--right--info--listing">
                                    .
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="wrapper--forDevelopers--content">
                    <div className="forDevelopers--content--main _container3">
                        <div className="forDevelopers--content--main--info">
                            <div className="forDevelopers--content--main--info--title">
                                Features
                            </div>
                            <div className="forDevelopers--content--main--info--subtitle">
                                Secure staking across many networks
                            </div>
                            <div className="forDevelopers--content--main--info--subtitle--2">
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                            </div>
                            <div className="forDevelopers--content--main--info--button">
                                <Link to="/prices"><button>Learn more</button></Link>
                            </div>
                            <div className="features--png--2">
                                <img src={features2} alt="" style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Developers