import { Outlet, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const ProtectedRoutes = () => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    if (loading) {
        return <div>Loading...</div>;  // prevent redirect while checking
    }
    
    return ( user ? <Outlet /> : <Navigate to="/" /> );
}
 
export default ProtectedRoutes;