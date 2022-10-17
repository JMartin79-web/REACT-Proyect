// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Obtén todos los documentos de una colección
import { getFirestore, collection, doc, getDocs, getDoc, query, where } from "firebase/firestore";
import {
    
  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrmCwqHLcJ0EDaBNxm1ZndWXdXu2Qwius",
  authDomain: "react-2f74d.firebaseapp.com",
  projectId: "react-2f74d",
  storageBucket: "react-2f74d.appspot.com",
  messagingSenderId: "952333209440",
  appId: "1:952333209440:web:1bd640c5b8f6d795b31805"
};

// Initialize Firebase y conectarse al firestore(base de datos)
const FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(FirebaseApp);


// MANDAR LOS DATOS

export async function getDatos(){
    const collectionRef = collection(db, "pokemons")
    let results = await getDocs(collectionRef)
    
    let datos = results.docs.map( (doc)=>{
       return ({ id: doc.id, ...doc.data()})
    })
    return datos
}
  
  
  // MANDAR DATOS FILTRADOS
  export async function getCategoryDatos(category){
    const collectionRef = collection(db, "pokemons");
    const queryCategory = query(
        collectionRef,where("type", "array-contains", category)
      );
    
      let results = await getDocs(queryCategory);
        console.log(results)
      let dataCategory = results.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(dataCategory)
      return dataCategory;    
  }
  
  
  // MANDAR UN SOLO DATO
  export async function getDato(id){
    const docRef = doc(db, "pokemons", id);
    const docResult = await getDoc(docRef);
    if (docResult.exists()) {
        return { id: docResult.id, ...docResult.data() };
    }
  }



  export default FirebaseApp
