import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {

    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                setEmail('');
                setPassword('');
                setError(null);
                setIsPending(false);
                navigate('/home');
            })
            .catch((err) => {
                setIsPending(false);
                setError(err.message);
            })
    }

    return ( 
        <div className="signup">
            <h2>CREATE YOUR ACCOUNT</h2>
            <form onSubmit={handleSignUp}>
                <label>E-Mail</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                {!isPending && <button>Sign Up</button>}
                {isPending && <button disabled>Signing Up...</button>}
            </form>
            <p>
                Have an account? <Link to="/">Login</Link>
            </p>
            <h3>{error && <div>{error}</div>}</h3>
        </div>
     );
}
 
export default Signup;