import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch('blogs', id);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setBody(blog.body);
        }
    }, [blog]);

    // delete blog/doc
    const handleDelete = () => {
        // init services
        const db = getFirestore();

        // document ref
        const docRef = doc(db, 'blogs', id);

        deleteDoc(docRef)
            .then(() => {
                console.log("Blog deleted.");
                navigate('/home');
            });
    }

    // update blog/doc
    const handleUpdate = (e) => {
        e.preventDefault();
        
        // init services
        const db = getFirestore();

        // document ref
        const docRef = doc(db, 'blogs', id);

        updateDoc(docRef, { title, body })
            .then(() => {
                console.log("Blog updated!");
                closeModal();
            });
    }

    // open and close modal
    const openModal = () => {
        if (blog) {
            setTitle(blog.title);
            setBody(blog.body);
        }
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '40%',
            left: '50%',
            right: '100%',
            bottom: '10%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return ( 
        <div className="blog-details">
            {error && <div>{error}</div>}
            {isPending && <div>Data is loading...</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by <b>{blog.author}</b></p>
                    <div>{blog.body}</div>
                    <button onClick={() => handleDelete()}>Delete</button>
                    <button onClick={() => openModal()}>Update</button>
                </article>
            )}
            <Modal appElement={document.getElementById('root')}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Update Blog Form">
                <button
                    onClick={closeModal}
                    style={{ float: "right", background: "none", color: "#f1356d", border: 0, cursor: "pointer"}}
                >
                    ✕
                </button>
                <div className="update-details">
                    <h2>Update Blog</h2>
                    {blog && (<form onSubmit={handleUpdate}>
                        <label>Blog title:</label>
                        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label>Blog body:</label>
                        <textarea required value={body} onChange={(e) => setBody(e.target.value)} />
                        <button>Update Blog</button>
                    </form>)}
                </div>
            </Modal>
        </div>
     );
}
 
export default BlogDetails;