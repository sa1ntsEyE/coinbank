import React, { useState } from "react";
import InputMask from 'react-input-mask';
import "./addcardform.css";

function AddCardForm ({ handleAdd }) {
    const [nameCard, setNameCard] = useState("");
    const [numberCard, setNumberCard] = useState("");
    const [cardValidity, setCardValidity] = useState("");
    const [cardValidity2, setCardValidity2] = useState("");
    const [cvv, setCvv] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [postcode, setPostcode] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!nameCard.trim() || !numberCard.trim() || !cardValidity.trim()
            || !cardValidity2.trim() || !cvv.trim() | !phone.trim()) {
            alert("Пожалуйста заполните полностью форму!");
            return;
        }
        const newItem = {
            nameCard: nameCard.trim(),
            numberCard: numberCard.trim(),
            cardValidity: cardValidity.trim(),
            cardValidity2: cardValidity2.trim(),
            cvv: cvv.trim(),
            name: name.trim(),
            lastName: lastName.trim(),
            city: city.trim(),
            billingAddress: billingAddress.trim(),
            postcode: postcode.trim(),
            country: country.trim(),
            phone: phone.trim(),
        };
        handleAdd(newItem);

        setNameCard("");
        setNumberCard("");
        setCardValidity("");
        setCardValidity2("");
        setCvv("");
        setName("");
        setLastName("");
        setCity("");
        setBillingAddress("");
        setPostcode("");
        setCountry("");
        setPhone("");
        closeWindow();
    };

    const closeWindow = () => {
        document.getElementById("addcard").style.display = "none";
    }

    const handleCardNumberChange = (event) => {
        const inputValue = event.target.value.replace(/\D/g, ''); // Убрать все нечисловые символы
        const formattedValue = inputValue
            .substring(0, 16) // Ограничить до 16 символов
            .replace(/(\d{4})/g, '$1 '); // Добавить пробел после каждой четвертой цифры

        setNumberCard(formattedValue);
    };


    const handleCardValidityChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d{0,2}$/.test(inputValue) && (inputValue === '' || (parseInt(inputValue, 10) >= 1 &&
            parseInt(inputValue, 10) <= 12))) {
            setCardValidity(inputValue);
        }
    };

    const handleCardValidityChange2 = (event) => {
        const inputValue = event.target.value;
        if (/^\d{0,2}$/.test(inputValue) && (inputValue === '' || (parseInt(inputValue, 10) >= 2  &&
            parseInt(inputValue, 10) <= 99))) {
            setCardValidity2(inputValue);
        }
    };

    const handleCVVChange = (event) => {
        const newValue = event.target.value;
        if (/^\d{0,3}$/.test(newValue)) {

            setCvv(newValue);
        }
    };

    const handleNameChange = (event) => {
        const newValue = event.target.value;
        if (/^[а-яА-ЯёЁ]*$/.test(newValue)) {
            setName(newValue);
        }
    };

    const handleLastNameChange = (event) => {
        const newValue = event.target.value;
        if (/^[а-яА-ЯёЁ]*$/.test(newValue)) {
            setLastName(newValue);
        }
    };

    const handleCityChange = (event) => {
        const newValue = event.target.value;
        if (/^[а-яА-ЯёЁ]*$/.test(newValue)) {
            setCity(newValue);
        }
    };

    const handleCountryChange = (event) => {
        const newValue = event.target.value;
        if (/^[а-яА-ЯёЁ]*$/.test(newValue)) {
            setCountry(newValue);
        }
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    return (
        <div className="add-card-form">
            <form onSubmit={handleSubmit}>
                <div className="formClose">
                    <label onClick={closeWindow} htmlFor="X">X</label>
                </div>
                <div className="formInfo">
                    <div className="SelectPaymentMethod">
                        <div className="Name">
                            <label htmlFor="nameCard">Сумма пополнения:</label>
                        </div>
                        <input
                            type="text"
                            id="nameCard"
                            value={nameCard}
                            onChange={(event) => setNameCard(event.target.value)}
                        />
                    </div>
                    <div className="NumberCardAndCVV">
                        <div className="block--1">
                            <div className="block--1--1">
                                <div className="Name">
                                    <label htmlFor="numberCard">Номер карты:</label>
                                </div>
                                <input
                                    type="text"
                                    id="numberCard"
                                    value={numberCard}
                                    onChange={handleCardNumberChange}
                                    maxLength="19" // Установить максимальную длину поля
                                    placeholder="Введите номер карты"
                                />
                            </div>
                            <div className="block--1--2">
                                <div className="Name">
                                    <label htmlFor="cardValidity">Срок действия:</label>
                                </div>
                                <input
                                    type="text"
                                    id="cardValidity"
                                    value={cardValidity}
                                    placeholder="MM"
                                    onChange={handleCardValidityChange}
                                />
                                /
                                <input
                                    type="text"
                                    id="cardValidity2"
                                    value={cardValidity2}
                                    placeholder="ГГ"
                                    onChange={handleCardValidityChange2}
                                />
                            </div>
                            <div className="block--1--3">
                                <div className="Name">
                                    <label htmlFor="cvv">Код:</label>
                                </div>
                                <input
                                    type="text"
                                    id="cvv"
                                    placeholder="CVC"
                                    value={cvv}
                                    onChange={handleCVVChange}
                                />
                            </div>
                        </div>
                        <br/>
                        <div className="block--2">
                            ИНФОРМАЦИЯ О СЧЕТЕ
                        </div>
                        <br/>
                        <div className="block--3">
                            <div className="block--3--1">
                                <div className="block--3--1--1">
                                    <div className="Name">
                                        <label htmlFor="cardValidity">Имя:</label>
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </div>
                                <div className="block--3--1--2">
                                    <div className="Name">
                                        <label htmlFor="cardValidity">Фамилия:</label>
                                    </div>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={handleLastNameChange}
                                    />
                                </div>
                            </div>
                            <div className="block--3--2">
                                <div className="Name">
                                    <label htmlFor="cardValidity">Город:</label>
                                </div>
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={handleCityChange}
                                />
                            </div>
                        </div>

                        <div className="block--4">
                            <div className="block--4--1">
                                <div className="Name">
                                    <label htmlFor="cardValidity">Расчетный адрес:</label>
                                </div>
                                <input
                                    type="text"
                                    id="billingAddress"
                                    value={billingAddress}
                                    onChange={(event) => setBillingAddress(event.target.value)}
                                />
                            </div>
                            <div className="block--4--2">
                                <div className="block--4--2">
                                    <div className="Name">
                                        <label htmlFor="cardValidity">Почтовой индекс:</label>
                                    </div>
                                    <input
                                        type="text"
                                        id="postcode"
                                        value={postcode}
                                        onChange={(event) => setPostcode(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="block--5">
                            <div className="block--5--1">
                                <div className="Name">
                                    <label htmlFor="cardValidity">Страна:</label>
                                </div>
                                <input
                                    type="text"
                                    id="country"
                                    value={country}
                                    onChange={handleCountryChange}
                                />
                            </div>
                            <div className="block--5--2">
                                <div className="block--5--2">
                                    <div className="Name">
                                        <label htmlFor="cardValidity">Телефон:</label>
                                    </div>
                                    <InputMask
                                        mask="+7 (999) 999-99-99"
                                        maskChar="_"
                                        type="text"
                                        id="phone"
                                        placeholder="+7 (___) ___-__-__"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="input-sub">
                        <button id="buttonSub" type="submit">Продолжить</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddCardForm;
