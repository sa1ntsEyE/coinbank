import React, {Component, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {useDispatch} from "react-redux";
import {useAuth} from "../../hooks/use-auth";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {removeUser} from "../../store/slices/userSlice";
import AddCardForm from "../../components/AddCardForm/AddCardForm";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import "../prices/prices.css"

import logo from "../../assets/Logo2.png";
import logo2 from "../../assets/Logo.png";
import crypto from "../../assets/Crypto.png"
import crypto2 from "../../assets/Crypto2.png"
import crypto3 from "../../assets/Crypto3.png"
import crypto4 from "../../assets/Crypto4.png"
import crypto5 from "../../assets/Crypto5.png"
import crypto6 from "../../assets/Crypto6.png"
import crypto7 from "../../assets/Crypto7.png"
import crypto8 from "../../assets/Crypto8.png"
import crypto9 from "../../assets/Crypto9.png"
import crypto10 from "../../assets/Crypto10.png"
import crypto11 from "../../assets/Crypto11.png"
import chartCoin from "../../assets/chartcoin.png"
import arrow from "../../assets/arrow.png"
import arrow2 from "../../assets/arrow2.png"
import stat from "../../assets/Stat.png"
import stat2 from "../../assets/Stat2.png"
import sol from "../../assets/SOL.svg"
import ltc from "../../assets/LTC.svg"
import dash from "../../assets/DASH.svg"


const Prices = () => {
    const url = "http://localhost:3001/message";
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const {isAuth, token, photo, name, nickname, username, email} = useAuth();
    const [tickerData, setTickerData] = useState(null);

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

// Запускаем fetchCryptoData сразу при монтировании компонента
    useEffect(() => {
        fetchCryptoData();

        // Устанавливаем интервал для обновления данных каждые 30 секунд
        const intervalId = setInterval(() => {
            fetchCryptoData();
        }, 30000);

        // Очищаем интервал при размонтировании компонента
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const logOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser())
        }).catch((error) => {
            alert("error")
        });
    }

    const openWindow = () => {
        document.getElementById("addcard").style.display = "block";
    }

    const handleAdd = async (newItem) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });
            const createdItem = await response.json();
            setItems((prevItems) => [...prevItems, createdItem]);
        } catch (error) {
            console.error(error);
        }
    };

    function findPriceBySymbol(data, symbol) {
        if (data === null) {
            return 'N/A'; // Возвращаем 'N/A', если data равно null
        }
        const cryptoData = data.find(item => item.symbol === symbol);
        return cryptoData ? cryptoData.price : 'N/A';
    }


    return (
            <div>
                <div className="wrapper">
                    <header>
                        <BurgerMenu/>
                        <div className="hero">
                            <div className="nav--main _container">
                                <Link to="/">
                                    <div className="left--nav">
                                        <img src={logo2} alt=""/>
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
                        <div className="wrapper--prices--content">
                            <div className="prices--content--main _container">
                                <div className="prices--content--headline">
                                    <div className="content--headline--title">
                                        Prices
                                    </div>
                                    <div className="content--headline--subtitle">
                                        The global cryptocurrency market cap today is $971 Billion, a -0.81% change in the last 24 hours.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="wrapper--card--content">
                            <div className="card--content--main _container">
                                <div className="price--coin--content--card">
                                    <div className="price--coin--crypto">
                                        <div className="price--coin--crypto--img">
                                            <img src={crypto} alt=""/>
                                        </div>
                                        <div className="price--coin--crypto--info">
                                            <div className="price--coin--crypto--info--title">
                                                Ethereum
                                            </div>
                                            <div className="price--coin--crypto--info--subtitle">
                                                ETH
                                            </div>
                                        </div>
                                    </div>
                                    <div className="price--coin--chart">
                                        <img src={chartCoin} alt=""/>
                                    </div>
                                    <div className="price--coin--change">
                                        <div className="price--coin--change--title">
                                            ${findPriceBySymbol(tickerData, 'ETHUSDT')}
                                        </div>
                                        <div className="price--coin--change--subtitle">
                                            <img src={arrow} alt=""/>
                                            1.37%
                                        </div>
                                    </div>
                                </div>
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
                                    <div className="price--coin--chart">
                                        <img src={chartCoin} alt=""/>
                                    </div>
                                    <div className="price--coin--change">
                                        <div className="price--coin--change--title">
                                            ${findPriceBySymbol(tickerData, 'BTCUSDT')}
                                        </div>
                                        <div className="price--coin--change--subtitle">
                                            <img src={arrow} alt=""/>
                                            1.37%
                                        </div>
                                    </div>
                                </div>
                                <div className="price--coin--content--card">
                                    <div className="price--coin--crypto">
                                        <div className="price--coin--crypto--img">
                                            <img src={crypto3} alt=""/>
                                        </div>
                                        <div className="price--coin--crypto--info">
                                            <div className="price--coin--crypto--info--title">
                                                Dogecoin
                                            </div>
                                            <div className="price--coin--crypto--info--subtitle">
                                                DOGE
                                            </div>
                                        </div>
                                    </div>
                                    <div className="price--coin--chart">
                                        <img src={chartCoin} alt=""/>
                                    </div>
                                    <div className="price--coin--change">
                                        <div className="price--coin--change--title">
                                            ${findPriceBySymbol(tickerData, 'DOGEUSDT')}
                                        </div>
                                        <div className="price--coin--change--subtitle">
                                            <img src={arrow} alt=""/>
                                            1.37%
                                        </div>
                                    </div>
                                </div>
                                <div className="price--coin--content--card">
                                    <div className="price--coin--crypto">
                                        <div className="price--coin--crypto--img">
                                            <img src={crypto4} alt=""/>
                                        </div>
                                        <div className="price--coin--crypto--info">
                                            <div className="price--coin--crypto--info--title">
                                                XRP
                                            </div>
                                            <div className="price--coin--crypto--info--subtitle">
                                                XRP
                                            </div>
                                        </div>
                                    </div>
                                    <div className="price--coin--chart">
                                        <img src={chartCoin} alt=""/>
                                    </div>
                                    <div className="price--coin--change">
                                        <div className="price--coin--change--title">
                                            ${findPriceBySymbol(tickerData, 'XRPUSDT')}
                                        </div>
                                        <div className="price--coin--change--subtitle">
                                            <img src={arrow} alt=""/>
                                            1.37%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="wrapper--table--prices">
                            <div className="table--prices--main _container">
                                <div className="table--prices--head">
                                    <div className="table--prices--Name">
                                        Name
                                    </div>
                                    <div className="table--prices--Price">
                                        Price
                                    </div>
                                    <div className="table--prices--MarketCap">
                                        Market Cap
                                    </div>
                                    <div className="table--prices--Change">
                                        Change %
                                    </div>
                                    <div className="table--prices--Last">
                                        Last (24H)
                                    </div>
                                    <div className="table--prices--Action">
                                        Action
                                    </div>
                                </div>
                                <div className="table--prices--body">
                                    <div className="table--prices--card">
                                        <div className="table--prices--body--name">
                                            <div className="table--prices--body--name--img">
                                                <img src={crypto2} alt=""/>
                                            </div>
                                            <div className="table--prices--body--name--info">
                                                <div className="table--prices--body--name--info--title">
                                                    Bitcoin
                                                </div>
                                                <div className="table--prices--body--name--info--subtitle">
                                                    BTC
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Price">
                                            ${findPriceBySymbol(tickerData, 'BTCUSDT')}
                                        </div>
                                        <div className="table--prices--body--MarketCap">
                                            $361.32B
                                        </div>
                                        <div className="table--prices--body--Change">
                                           <div className="table--prices--body--change--percent">
                                               <img src={arrow} alt=""/>
                                               1.37%
                                           </div>
                                        </div>
                                        <div className="table--prices--body--Last">
                                            <img src={stat} alt=""/>
                                        </div>
                                        <div className="table--prices--body--Action">
                                            <button id="open" className="table--prices--body--Action--trade"
                                                    onClick={openWindow}>
                                                Trade
                                            </button>
                                        </div>
                                    </div>
                                    <div className="table--prices--card">
                                        <div className="table--prices--body--name">
                                            <div className="table--prices--body--name--img">
                                                <img src={crypto} alt=""/>
                                            </div>
                                            <div className="table--prices--body--name--info">
                                                <div className="table--prices--body--name--info--title">
                                                    Ethereum
                                                </div>
                                                <div className="table--prices--body--name--info--subtitle">
                                                    ETH
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Price">
                                            ${findPriceBySymbol(tickerData, 'ETHUSDT')}
                                        </div>
                                        <div className="table--prices--body--MarketCap">
                                            $158.77B
                                        </div>
                                        <div className="table--prices--body--Change">
                                            <div className="table--prices--body--change--percent-2">
                                                <img src={arrow2} alt=""/>
                                                1.37%
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Last">
                                            <img src={stat2} alt=""/>
                                        </div>
                                        <div className="table--prices--body--Action">
                                            <button id="open" className="table--prices--body--Action--trade"
                                                    onClick={openWindow}>
                                                Trade
                                            </button>
                                        </div>
                                    </div>
                                    <div className="table--prices--card">
                                        <div className="table--prices--body--name">
                                            <div className="table--prices--body--name--img">
                                                <img src={crypto4} alt=""/>
                                            </div>
                                            <div className="table--prices--body--name--info">
                                                <div className="table--prices--body--name--info--title">
                                                    XRP
                                                </div>
                                                <div className="table--prices--body--name--info--subtitle">
                                                    XRP
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Price">
                                            ${findPriceBySymbol(tickerData, 'XRPUSDT')}
                                        </div>
                                        <div className="table--prices--body--MarketCap">
                                            $67.94B
                                        </div>
                                        <div className="table--prices--body--Change">
                                            <div className="table--prices--body--change--percent">
                                                <img src={arrow} alt=""/>
                                                1.37%
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Last">
                                            <img src={stat} alt=""/>
                                        </div>
                                        <div className="table--prices--body--Action">
                                            <button id="open" className="table--prices--body--Action--trade"
                                                    onClick={openWindow}>
                                                Trade
                                            </button>
                                        </div>
                                    </div>

                                    <div className="table--prices--card">
                                        <div className="table--prices--body--name">
                                            <div className="table--prices--body--name--img">
                                                <img src={crypto3} alt=""/>
                                            </div>
                                            <div className="table--prices--body--name--info">
                                                <div className="table--prices--body--name--info--title">
                                                    Dogecoin
                                                </div>
                                                <div className="table--prices--body--name--info--subtitle">
                                                    DOGE
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Price">
                                            ${findPriceBySymbol(tickerData, 'DOGEUSDT')}
                                        </div>
                                        <div className="table--prices--body--MarketCap">
                                            $49.91B
                                        </div>
                                        <div className="table--prices--body--Change">
                                            <div className="table--prices--body--change--percent-2">
                                                <img src={arrow2} alt=""/>
                                                1.37%
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Last">
                                            <img src={stat2} alt=""/>
                                        </div>
                                        <div className="table--prices--body--Action">
                                            <button id="open" className="table--prices--body--Action--trade"
                                                    onClick={openWindow}>
                                                Trade
                                            </button>
                                        </div>
                                    </div>

                                    <div className="table--prices--card">
                                        <div className="table--prices--body--name">
                                            <div className="table--prices--body--name--img">
                                                <img src={crypto6} alt=""/>
                                            </div>
                                            <div className="table--prices--body--name--info">
                                                <div className="table--prices--body--name--info--title">
                                                    Digibyte
                                                </div>
                                                <div className="table--prices--body--name--info--subtitle">
                                                    DGB
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Price">
                                            ${findPriceBySymbol(tickerData, 'DGBUSDT')}
                                        </div>
                                        <div className="table--prices--body--MarketCap">
                                            $44.34B
                                        </div>
                                        <div className="table--prices--body--Change">
                                            <div className="table--prices--body--change--percent">
                                                <img src={arrow} alt=""/>
                                                1.37%
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Last">
                                            <img src={stat} alt=""/>
                                        </div>
                                        <div className="table--prices--body--Action">
                                            <button id="open" className="table--prices--body--Action--trade"
                                                    onClick={openWindow}>
                                                Trade
                                            </button>
                                        </div>
                                    </div>

                                    <div className="table--prices--card">
                                        <div className="table--prices--body--name">
                                            <div className="table--prices--body--name--img">
                                                <img src={sol} alt=""/>
                                            </div>
                                            <div className="table--prices--body--name--info">
                                                <div className="table--prices--body--name--info--title">
                                                    Solana
                                                </div>
                                                <div className="table--prices--body--name--info--subtitle">
                                                    SOL
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Price">
                                            ${findPriceBySymbol(tickerData, 'SOLUSDT')}
                                        </div>
                                        <div className="table--prices--body--MarketCap">
                                            $30.31B
                                        </div>
                                        <div className="table--prices--body--Change">
                                            <div className="table--prices--body--change--percent">
                                                <img src={arrow} alt=""/>
                                                1.37%
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Last">
                                            <img src={stat} alt=""/>
                                        </div>
                                        <div className="table--prices--body--Action">
                                            <button id="open" className="table--prices--body--Action--trade"
                                                    onClick={openWindow}>
                                                Trade
                                            </button>
                                        </div>
                                    </div>

                                    <div className="table--prices--card">
                                        <div className="table--prices--body--name">
                                            <div className="table--prices--body--name--img">
                                                <img src={ltc} alt=""/>
                                            </div>
                                            <div className="table--prices--body--name--info">
                                                <div className="table--prices--body--name--info--title">
                                                    Litecoin
                                                </div>
                                                <div className="table--prices--body--name--info--subtitle">
                                                    LTC
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Price">
                                            ${findPriceBySymbol(tickerData, 'LTCUSDT')}
                                        </div>
                                        <div className="table--prices--body--MarketCap">
                                            $200.45B
                                        </div>
                                        <div className="table--prices--body--Change">
                                            <div className="table--prices--body--change--percent">
                                                <img src={arrow} alt=""/>
                                                1.37%
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Last">
                                            <img src={stat} alt=""/>
                                        </div>
                                        <div className="table--prices--body--Action">
                                            <button id="open" className="table--prices--body--Action--trade"
                                                    onClick={openWindow}>
                                                Trade
                                            </button>
                                        </div>
                                    </div>
                                    <div className="table--prices--card">
                                        <div className="table--prices--body--name">
                                            <div className="table--prices--body--name--img">
                                                <img src={crypto9} alt=""/>
                                            </div>
                                            <div className="table--prices--body--name--info">
                                                <div className="table--prices--body--name--info--title">
                                                    Binance
                                                </div>
                                                <div className="table--prices--body--name--info--subtitle">
                                                    BNB
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Price">
                                            ${findPriceBySymbol(tickerData, 'BNBUSDT')}
                                        </div>
                                        <div className="table--prices--body--MarketCap">
                                            $192.31B
                                        </div>
                                        <div className="table--prices--body--Change">
                                            <div className="table--prices--body--change--percent-2">
                                                <img src={arrow2} alt=""/>
                                                1.37%
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Last">
                                            <img src={stat2} alt=""/>
                                        </div>
                                        <div className="table--prices--body--Action">
                                            <button id="open" className="table--prices--body--Action--trade"
                                                    onClick={openWindow}>
                                                Trade
                                            </button>
                                        </div>
                                    </div>

                                    <div className="table--prices--card">
                                        <div className="table--prices--body--name">
                                            <div className="table--prices--body--name--img">
                                                <img src={dash} alt=""/>
                                            </div>
                                            <div className="table--prices--body--name--info">
                                                <div className="table--prices--body--name--info--title">
                                                    DASH
                                                </div>
                                                <div className="table--prices--body--name--info--subtitle">
                                                    DASH
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Price">
                                            ${findPriceBySymbol(tickerData, 'DASHUSDT')}
                                        </div>
                                        <div className="table--prices--body--MarketCap">
                                            $361.32B
                                        </div>
                                        <div className="table--prices--body--Change">
                                            <div className="table--prices--body--change--percent">
                                                <img src={arrow} alt=""/>
                                                1.37%
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Last">
                                            <img src={stat} alt=""/>
                                        </div>
                                        <div className="table--prices--body--Action">
                                            <button id="open" className="table--prices--body--Action--trade"
                                                    onClick={openWindow}>
                                                Trade
                                            </button>
                                        </div>
                                    </div>

                                    <div className="table--prices--card">
                                        <div className="table--prices--body--name">
                                            <div className="table--prices--body--name--img">
                                                <img src={crypto11} alt=""/>
                                            </div>
                                            <div className="table--prices--body--name--info">
                                                <div className="table--prices--body--name--info--title">
                                                    Origin Protocol
                                                </div>
                                                <div className="table--prices--body--name--info--subtitle">
                                                    OGN
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Price">
                                            ${findPriceBySymbol(tickerData, 'OGNUSDT')}
                                        </div>
                                        <div className="table--prices--body--MarketCap">
                                            $132.98B
                                        </div>
                                        <div className="table--prices--body--Change">
                                            <div className="table--prices--body--change--percent">
                                                <img src={arrow} alt=""/>
                                                1.37%
                                            </div>
                                        </div>
                                        <div className="table--prices--body--Last">
                                            <img src={stat} alt=""/>
                                        </div>
                                        <div className="table--prices--body--Action">
                                            <button id="open" className="table--prices--body--Action--trade"
                                                    onClick={openWindow}>
                                                Trade
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div id="addcard">
                        <AddCardForm handleAdd={handleAdd}/>
                    </div>
                </div>
            </div>
        );

}

export default Prices;