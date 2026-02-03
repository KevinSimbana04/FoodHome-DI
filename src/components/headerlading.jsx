import { Link } from "react-router-dom";

function HeaderLanding() {
    return (
        <header className="bg-white shadow-xl relative z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#1FAF97]">FoodHome</span>
                </div>
                {/*<nav className="flex items-center gap-4">
                    <Link to="/" className="text-gray-600 hover:text-[#1FAF97] font-medium">Inicio</Link>
                    <Link to="/login" className="text-gray-600 hover:text-[#1FAF97] font-medium">Iniciar Sesión</Link>
                    <Link to="/register" className="text-gray-600 hover:text-[#1FAF97] font-medium">Registrarse</Link>
                </nav>
                */}

            </div>
        </header>
    );
}
export default HeaderLanding;