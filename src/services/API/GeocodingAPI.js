// import React, { useState, useEffect } from 'react';
// import { addDoc, collection } from 'firebase/firestore';
// import { db } from '../../firebase';
//
// const App = () => {
//     const [location, setLocation] = useState({});
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Используйте fetch для запроса к API
//                 const response = await fetch('https://ipapi.co/json/');
//                 const data = await response.json();
//                 setLocation(data);
//                 console.log(data)
//                 const ipCollection = collection(db, 'ipAddresses');
//                 await addDoc(ipCollection, { ipAddress: data });
//             } catch (error) {
//                 console.error('Error fetching location:', error);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     return (
//         <div>
//
//         </div>
//     );
// };
//
// export default App;
