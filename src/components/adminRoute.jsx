import { Navigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function AdminRoute({ children }) {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkRole = async () => {
            const user = auth.currentUser;
            if (user) {
                // Consultamos el rol en la base de datos
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setRole(docSnap.data().rol);
                }
            }
            setLoading(false);
        };
        checkRole();
    }, []);

    if (loading) return <div className="p-10 text-center">Verificando permisos...</div>;

    // Si no es admin, lo mandamos al inicio
    if (role !== 'admin') {
        return <Navigate to="/app" replace />;
    }

    // Si es admin, le dejamos pasar
    return children;
}

export default AdminRoute;