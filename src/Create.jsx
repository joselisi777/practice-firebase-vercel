import { useState } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import app from "./config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    // add new blog/doc
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);

        const user = auth.currentUser;

        if (!user) {
            console.log("User not logged in");
            setIsPending(false); // important
            return;
        }

        const blog = { title, body, author: user.email, createdAt: serverTimestamp() };

        // init services    
        const db = getFirestore();
        // collection ref
        const colRef = collection(db, 'blogs');

        addDoc(colRef, blog)
        .then(() => {
            console.log("New blog added!");

            setTitle('');
            setBody('');
            setIsPending(false);
            navigate('/home');
        });
    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Blog body:</label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)} />
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;