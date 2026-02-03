import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

import despensaIcon from "../assets/Iconos/alimentos-saludables.png";
import comprasIcon from "../assets/Iconos/carrito-de-compras.png";
import perfilIcon from "../assets/Iconos/usuario.png";

function SliderBar() {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            const user = auth.currentUser;
            if (user) {
                const snap = await getDoc(doc(db, "users", user.uid));
                if (snap.exists() && snap.data().rol === 'admin') {
                    setIsAdmin(true);
                }
            }
        };
        checkAdmin();
    }, []);


    return (
        <nav className="h-full w-50 bg-white shadow-md border-r border-gray-200">
            <ul className="flex flex-col h-full">
                <li className="mb-1 px-2">
                    <Link to="/app" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#1FAF97]/10 hover:text-[#1FAF97] rounded-lg transition-colors">
                        <img src={despensaIcon} alt="Despensa" className="w-5 h-5 object-contain" />
                        <span className="font-medium">Despensa</span>
                    </Link>
                </li>
                <li className="mb-1 px-2">
                    <Link to="/app/compras" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#1FAF97]/10 hover:text-[#1FAF97] rounded-lg transition-colors">
                        <img src={comprasIcon} alt="Compras" className="w-5 h-5 object-contain" />
                        <span className="font-medium">Compras</span>
                    </Link>
                </li>
                <li className="mb-1 px-2">
                    <Link to="/app/perfil" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-[#1FAF97]/10 hover:text-[#1FAF97] rounded-lg transition-colors">
                        <img src={perfilIcon} alt="Perfil" className="w-5 h-5 object-contain" />
                        <span className="font-medium">Perfil</span>
                    </Link>
                </li>

                <div className="mt-auto p-2">
                    {isAdmin && (
                        <li className="mt-2">
                            <Link to="/app/admin" className="flex items-center gap-3 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                                <span className="font-bold">ADMIN</span>
                            </Link>
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    );
}
export default SliderBar;