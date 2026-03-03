import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    }

    return ( 
        <div className="error-page">
            <h1>Oops!</h1>
            <h2>404 - PAGE NOT FOUND</h2>
            <p>The page you are looking for does not exist or has been removed.</p>
            <button onClick={handleClick}>GO BACK</button>
        </div>
     );
}
 
export default ErrorPage;