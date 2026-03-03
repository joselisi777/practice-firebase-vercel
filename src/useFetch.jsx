import { useState, useEffect } from "react";
import {
    getFirestore, collection,
    onSnapshot, doc,
    query, orderBy, where
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const useFetch = (collectionName, id) => {
    // init services
    const db = getFirestore();

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        let unsubscribe;

        if (id) {
            // document ref
            const docRef = doc(db, collectionName, id);

            // real time document get
            unsubscribe = onSnapshot(docRef, (snapshot) => {
                setData(snapshot.data());
                setIsPending(false);
                setError(null);
            }, (error) => {
                setIsPending(false);
                setError(error.message);
            })
        }
        else {
            // collection ref
            const colRef = collection(db, collectionName);

            // get logged in user
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                setIsPending(false);
                setError("User is not logged in!");
                return;
            }

            // query
            const q = query(colRef, where("author", "==", user.email), orderBy('createdAt'))

            // real time document get
            unsubscribe = onSnapshot(q, (snapshot) => {
                let blogs = [];
                snapshot.docs.forEach((doc) => {
                    blogs.push({ ...doc.data(), id: doc.id });
                })
                setData(blogs);
                setIsPending(false);
                setError(null);
            }, (error) => {
                setIsPending(false);
                setError(error.message);
            })
        }

        return () => {
            if (unsubscribe) unsubscribe();
        }
        
    }, [db, collectionName, id]);

    return { data, isPending, error }
}

export default useFetch;
