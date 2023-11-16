import React, { useState, useEffect } from "react";
import "./vipPanel.css";
import Pagination2 from "../Pagination/Pagination2";
import { auth, db } from "../../firebase";
import { collection, addDoc, deleteDoc, query, onSnapshot, doc, getDocs } from 'firebase/firestore';
import Header from "../Header/header";

const VipPanel = () => {
    const itemsCollection = collection(db, "items");
    const infoUserCollection = collection(db, "infoUsers");
    const [items, setItems] = useState([]);
    const [items2, setItems2] = useState([]);
    const [infoUsers, setInfoUsers] = useState([]);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [infoPerPage, setInfoPerPage] = useState(9);
    let unsubscribe;

    const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const querySnapshot = await getDocs(itemsCollection);
                const itemsData = [];
                querySnapshot.forEach((doc) => {
                    itemsData.push({ id: doc.id, ...doc.data() });
                });
                setItems(itemsData);
            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        };
        loadItems();

        return () => unsubscribe();
    }, [itemsCollection]);


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
    }, [infoUserCollection]);

    const handleRemove2 = async (id) => {
        try {
            await deleteDoc(doc(infoUserCollection, id));
            setItems2((prevItems) => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const lastInfoIndex = currentPage2 * infoPerPage;
    const firstInfoIndex = lastInfoIndex - infoPerPage;
    const currentInfo = infoUsers.slice(firstInfoIndex, lastInfoIndex);

    return (
        <div className="wrapper--3 _container">
            <Header/>
            <div className="main _container">
                <div className="Table--block--2">
                    <div className="mainTable--2">
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
};

export default VipPanel;
