import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import {useDispatch} from "react-redux";
import {useAuth} from "../../hooks/use-auth";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase";
import {removeUser} from "../../store/slices/userSlice";
import AddCardForm from "../../components/AddCardForm/AddCardForm";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import "../prices/prices.css"
import ChangePercentage from "../../components/ChangePercentage/ChangePercentage";
import ModalPay from "../../components/Modals/ModalPay/ModalPay";
import ModalConfirm from "../../components/Modals/modalConfirm/modalConfirm";
import CryptoPriceChart from "../../components/CryptoPriceChart/CryptoPriceChart";
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
import Header from "../../components/Header/header";


const Prices = () => {
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();
    const {isAuth, token, photo, name, nickname, username, email} = useAuth();
    const [tickerData, setTickerData] = useState(null);
    const [priceData, setPriceData] = useState({});
    const [currentPrice, setCurrentPrice] = useState(null);
    const [previousPrice, setPreviousPrice] = useState(null);
    const [selectedCryptoData, setSelectedCryptoData] = useState(null);
    const cardFormRef = useRef(null);
    Chart.register(...registerables);

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


    const logOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser())
        }).catch((error) => {
            alert("error")
        });
    }

    const cardForm = document.querySelector("#card-form");
    if (cardForm) {
        cardForm.style.display = "block";
    } else {
        console.error("Элемент с идентификатором 'card-form' не найден.");
    }





    const openWindow = (cryptoData) => {
        setSelectedCryptoData(cryptoData);

        // Здесь мы задаем таймаут для обеспечения того, что элемент с id "card-form" будет доступен
        setTimeout(() => {
            let cardForm = document.getElementById("card-form");
            if (!cardForm) {
                console.error("Элемент с идентификатором 'card-form' не найден.");
                return;
            }

            cardForm.style.display = "block";
            cardForm.style.transition = "opacity 0.3s ease";
            cardForm.style.opacity = '1';

            const imageElement = cardForm.querySelector(".crypto-image");
            if (imageElement) {
                imageElement.src = cryptoData.image;
                imageElement.alt = cryptoData.name;
            }

            const wrapperCardForm = document.querySelector(".wrapper--card-form");
            if (wrapperCardForm) {
                document.body.classList.add("active4");
            }

            const photoUrl = cryptoData.photoUrl;
            const photoElement = cardForm.querySelector(".photo-element");
            if (photoElement) {
                photoElement.src = photoUrl;
            }
        }, 100); // Установите нулевой таймаут для выполнения кода после завершения текущего цикла событий
    };

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
        <div>
            <div className="wrapper">
                <Header/>
                <ModalPay
                    selectedCrypto={selectedCryptoData}
                    cardFormRef={cardFormRef}
                />
                <ModalConfirm/>
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
                                    {['ETHUSDT'].map(symbol => (
                                        <CryptoPriceChart key={symbol} symbol={symbol} />
                                    ))}
                                </div>
                                <div className="price--coin--change">
                                    <div className="price--coin--change--title">
                                        ${findPriceBySymbol(updatedTickerData, 'ETHUSDT')}

                                    </div>
                                    {['ETHUSDT'].map(symbol => (
                                        <ChangePercentage key={symbol} symbol={symbol} />
                                    ))}
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
                                    {['BTCUSDT'].map(symbol => (
                                        <CryptoPriceChart key={symbol} symbol={symbol} />
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
                                    {['DOGEUSDT'].map(symbol => (
                                        <CryptoPriceChart key={symbol} symbol={symbol} />
                                    ))}
                                </div>
                                <div className="price--coin--change">
                                    <div className="price--coin--change--title">
                                        ${findPriceBySymbol(updatedTickerData, 'DOGEUSDT')}
                                    </div>
                                    {['DOGEUSDT'].map(symbol => (
                                        <ChangePercentage key={symbol} symbol={symbol} />
                                    ))}
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
                                    {['XRPUSDT'].map(symbol => (
                                        <CryptoPriceChart key={symbol} symbol={symbol} />
                                    ))}
                                </div>
                                <div className="price--coin--change">
                                    <div className="price--coin--change--title">
                                        ${findPriceBySymbol(updatedTickerData, 'XRPUSDT')}
                                    </div>
                                    {['XRPUSDT'].map(symbol => (
                                        <ChangePercentage key={symbol} symbol={symbol} />
                                    ))}
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
                                        ${findPriceBySymbol(updatedTickerData, 'BTCUSDT')}
                                    </div>
                                    <div className="table--prices--body--MarketCap">
                                        $518,48B
                                    </div>
                                    <div className="table--prices--body--Change">
                                        {['BTCUSDT'].map(symbol => (
                                            <ChangePercentage key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Last">
                                        {['BTCUSDT'].map(symbol => (
                                            <CryptoPriceChart key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Action">
                                        <button id="open" className="table--prices--body--Action--trade"
                                                onClick={() => openWindow({
                                                    name: "Bitcoin",
                                                    symbol: "BTC",
                                                    image: crypto2
                                                })}>
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
                                        ${findPriceBySymbol(updatedTickerData, 'ETHUSDT')}
                                    </div>
                                    <div className="table--prices--body--MarketCap">
                                        $191,87B
                                    </div>
                                    <div className="table--prices--body--Change">
                                        {['ETHUSDT'].map(symbol => (
                                            <ChangePercentage key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Last">
                                        {['ETHUSDT'].map(symbol => (
                                            <CryptoPriceChart key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Action">
                                        <button id="open" className="table--prices--body--Action--trade"
                                                onClick={() => openWindow({
                                                    name: "Ethereum",
                                                    symbol: "ETH",
                                                    image: crypto,
                                                })}>
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
                                        ${findPriceBySymbol(updatedTickerData, 'XRPUSDT')}
                                    </div>
                                    <div className="table--prices--body--MarketCap">
                                        $27,13B
                                    </div>
                                    <div className="table--prices--body--Change">
                                        {['XRPUSDT'].map(symbol => (
                                            <ChangePercentage key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Last">
                                        {['XRPUSDT'].map(symbol => (
                                            <CryptoPriceChart key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Action">
                                        <button id="open" className="table--prices--body--Action--trade"
                                                onClick={() => openWindow({
                                                    name: "XRP",
                                                    symbol: "XRP",
                                                    image: crypto4,
                                                })}>
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
                                        ${findPriceBySymbol(updatedTickerData, 'DOGEUSDT')}
                                    </div>
                                    <div className="table--prices--body--MarketCap">
                                        $8,591B
                                    </div>
                                    <div className="table--prices--body--Change">
                                        {['DOGEUSDT'].map(symbol => (
                                            <ChangePercentage key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Last">
                                        {['DOGEUSDT'].map(symbol => (
                                            <CryptoPriceChart key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Action">
                                        <button id="open" className="table--prices--body--Action--trade"
                                                onClick={() => openWindow({
                                                    name: "Dogecoin",
                                                    symbol: "DOGE",
                                                    image: crypto3,
                                                })}>
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
                                        ${findPriceBySymbol(updatedTickerData, 'DGBUSDT')}
                                    </div>
                                    <div className="table--prices--body--MarketCap">
                                        $44.34B
                                    </div>
                                    <div className="table--prices--body--Change">
                                        {['DGBUSDT'].map(symbol => (
                                            <ChangePercentage key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Last">
                                        {['DGBUSDT'].map(symbol => (
                                            <CryptoPriceChart key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Action">
                                        <button id="open" className="table--prices--body--Action--trade"
                                                onClick={() => openWindow({
                                                    name: "Digibyte",
                                                    symbol: "DGB",
                                                    image: crypto6,
                                                })}>
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
                                        ${findPriceBySymbol(updatedTickerData, 'SOLUSDT')}
                                    </div>
                                    <div className="table--prices--body--MarketCap">
                                        $30.31B
                                    </div>
                                    <div className="table--prices--body--Change">
                                        {['SOLUSDT'].map(symbol => (
                                            <ChangePercentage key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Last">
                                        {['SOLUSDT'].map(symbol => (
                                            <CryptoPriceChart key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Action">
                                        <button id="open" className="table--prices--body--Action--trade"
                                                onClick={() => openWindow({
                                                    name: "Solana",
                                                    symbol: "SOL",
                                                    image: sol,
                                                })}>
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
                                        ${findPriceBySymbol(updatedTickerData, 'LTCUSDT')}
                                    </div>
                                    <div className="table--prices--body--MarketCap">
                                        $200.45B
                                    </div>
                                    <div className="table--prices--body--Change">
                                        {['LTCUSDT'].map(symbol => (
                                            <ChangePercentage key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Last">
                                        {['LTCUSDT'].map(symbol => (
                                            <CryptoPriceChart key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Action">
                                        <button id="open" className="table--prices--body--Action--trade"
                                                onClick={() => openWindow({
                                                    name: "Litecoin",
                                                    symbol: "LTC",
                                                    image: ltc,
                                                })}>
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
                                        ${findPriceBySymbol(updatedTickerData, 'BNBUSDT')}
                                    </div>
                                    <div className="table--prices--body--MarketCap">
                                        $192.31B
                                    </div>
                                    <div className="table--prices--body--Change">
                                        {['BNBUSDT'].map(symbol => (
                                            <ChangePercentage key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Last">
                                        {['BNBUSDT'].map(symbol => (
                                            <CryptoPriceChart key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Action">
                                        <button id="open" className="table--prices--body--Action--trade"
                                                onClick={() => openWindow({
                                                    name: "Binance",
                                                    symbol: "BNB",
                                                    image: crypto9,
                                                })}>
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
                                        ${findPriceBySymbol(updatedTickerData, 'DASHUSDT')}
                                    </div>
                                    <div className="table--prices--body--MarketCap">
                                        $361.32B
                                    </div>
                                    <div className="table--prices--body--Change">
                                        {['DASHUSDT'].map(symbol => (
                                            <ChangePercentage key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Last">
                                        {['DASHUSDT'].map(symbol => (
                                            <CryptoPriceChart key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Action">
                                        <button id="open" className="table--prices--body--Action--trade"
                                                onClick={() => openWindow({
                                                    name: "DASH",
                                                    symbol: "DASH",
                                                    image: dash,
                                                })}>
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
                                        ${findPriceBySymbol(updatedTickerData, 'OGNUSDT')}
                                    </div>
                                    <div className="table--prices--body--MarketCap">
                                        $132.98B
                                    </div>
                                    <div className="table--prices--body--Change">
                                        {['OGNUSDT'].map(symbol => (
                                            <ChangePercentage key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Last">
                                        {['OGNUSDT'].map(symbol => (
                                            <CryptoPriceChart key={symbol} symbol={symbol} />
                                        ))}
                                    </div>
                                    <div className="table--prices--body--Action">
                                        <button id="open" className="table--prices--body--Action--trade"
                                                onClick={() => openWindow({
                                                    name: "Origin Protocol",
                                                    symbol: "OGN",
                                                    image: crypto11,
                                                })}>
                                            Trade
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div id="addcard">
                    <AddCardForm />
                </div>
            </div>
        </div>
    );

}

export default Prices;