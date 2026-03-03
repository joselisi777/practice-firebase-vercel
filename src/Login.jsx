import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {

    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
        setIsPending(true);
        setError(null);

        signInWithEmailAndPassword(auth, email, password)
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
        <div className="login">
            <h2>LOGIN</h2>
            <form onSubmit={handleLogin}>
                <label>E-Mail</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                {!isPending && <button>Login</button>}
                {isPending && <button disabled>Logging in...</button>}
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <h3>{error && <div>{error}</div>}</h3>
        </div>
     );
}
 
export default Login;