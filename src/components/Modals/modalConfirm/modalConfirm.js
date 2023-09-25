import React, {Component} from 'react';
import InputMask from "react-input-mask";
import "./modalConfirm.css"
import confirm from "../../../assets/confirm.png"

const ModalConfirm = () => {

    const closeWindowConfirm = () => {
        document.getElementById("confirm").style.display = "none";
    }

    return (
        <div id="confirm" className="confirm--main">
            <div className="ModalConfirm--main">
                <div className="ModalConfirm--second--block">
                    <div>
                        <img src={confirm} alt=""/>
                    </div>
                    <div>
                        <p>Ожидайте подтверждение в банке ближайшие <br/>30 минут !</p>
                    </div>
                    <div className="input-sub">
                        <button id="buttonSub" onClick={closeWindowConfirm} type="submit">Продолжить</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ModalConfirm;