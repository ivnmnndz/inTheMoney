import { db } from "./firebaseConfig";
import { query, where, collection, doc, getDoc, getDocs, addDoc, setDoc } from "firebase/firestore";

export const addUserDoc = async (documentId, data) => {
  try {
    const docRef = doc(db, "users", documentId);
    await setDoc(docRef, data);
    console.log("document written with id: ", documentId);
  } catch (error) {
    console.error("error", error);
  }
};

export const addTradeDoc = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "trades"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("error: ", error);
  }
};

export const getMyTrades = async (uid) => {
  try {
    const collectionRef = collection(db,"trades");
    const q = query(collectionRef, where("user_id", "==", uid));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
    //do what here?
    console.log(doc.id, " => ", doc.data());

    })
  } catch (error) {
    console.log(error)
  }
};

export const getUserDoc = async (documentId) => {
  const docRef = doc(db, "users", documentId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.exists() ? docSnap.data() : null;
  if (data === null || data === undefined) return null;
  return { documentId, ...data };
};
