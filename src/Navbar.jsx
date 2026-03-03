import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out.");
                navigate('/');
            })
            .catch((err) => {
                console.log(err.message);
            })
    }
    
    return ( 
        <nav className="navbar">
            <h1>Kitsune Blog</h1>
            <div className="links">
                <Link to="/home">Home</Link>
                <Link to="/create">New Blog</Link>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </nav>
     );
}
 
export default Navbar;