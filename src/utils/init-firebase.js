import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore,enableIndexedDbPersistence  } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8HsohttI2Zg5Ye6S_RRA3jjISP8zptw4",
    authDomain: "healthcare-64ce6.firebaseapp.com",
    databaseURL: "https://healthcare-64ce6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "healthcare-64ce6",
    storageBucket: "healthcare-64ce6.appspot.com",
    messagingSenderId: "299301594384",
    appId: "1:299301594384:web:2ac9b17b6cf72b69f9f195",
    measurementId: "G-NF0CQ5QF8N"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
 //enableIndexedDbPersistence();
 async function offlineDb() {
     await enableIndexedDbPersistence(db).then(() => {
         console.log('Im now offline capable');
     }).catch(err => {
         console.log('Please Check i cant go offline', err);
     });

 }
 offlineDb().then(r => {

 })
export const auth = getAuth(app);
