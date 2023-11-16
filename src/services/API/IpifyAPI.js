// import React, { useEffect, useState } from 'react';
// import { auth, db } from "../../firebase";
// import { collection, addDoc } from 'firebase/firestore';
// import axios from 'axios';
//
// const IpifyAPI = () => {
//     const [ipAddress, setIpAddress] = useState('');
//
//     useEffect(() => {
//         const fetchIpAddress = async () => {
//             try {
//                 const response = await axios.get('https://api.ipify.org?format=json');
//                 const ipAddress = response.data.ip;
//                 setIpAddress(ipAddress);
//
//                 const ipCollection = collection(db, 'ipAddresses');
//                 await addDoc(ipCollection, { ipAddress });
//             } catch (error) {
//                 console.error('Error fetching IP address:', error);
//             }
//         };
//
//         fetchIpAddress();
//     }, []);
//
//     return (
//         <div>
//
//         </div>
//     );
// };
//
// export default IpifyAPI;
