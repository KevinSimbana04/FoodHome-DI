import { logoutUsuario } from "../services/authServices";
import { useNavigate } from "react-router-dom";

function HeaderApp() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUsuario();
            navigate("/login");
        } catch (error) {
            console.error("Error al salir", error);
        }
    };

    return (
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b border-gray-100">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-green-700 tracking-tight">FOODHOME</h1>
                <strong className="text-xs text-gray-500 uppercase tracking-widest">Alimentos</strong>
            </div>

            <div className="flex gap-4">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                    Perfil
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                >
                    Salir
                </button>
            </div>
        </header>

    );
}
export default HeaderApp;