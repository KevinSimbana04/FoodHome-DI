import { Link } from "react-router-dom";


function SliderBar() {
    return (
        <nav className="w-full">
            <ul className="flex justify-around items-center p-2">
                <li className="flex-1">
                    <Link to="/app" className="flex flex-col items-center py-2 text-gray-600 hover:text-green-600 text-xs">
                        <span className="font-bold">Dashboard</span>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link to="/app/despensa" className="flex flex-col items-center py-2 text-gray-600 hover:text-green-600 text-xs">
                        <span className="font-bold">Despensa</span>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link to="/app/compras" className="flex flex-col items-center py-2 text-gray-600 hover:text-green-600 text-xs">
                        <span className="font-bold">Compras</span>
                    </Link>
                </li>
                <li className="flex-1">
                    <Link to="/app/perfil" className="flex flex-col items-center py-2 text-gray-600 hover:text-green-600 text-xs">
                        <span className="font-bold">Perfil</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
export default SliderBar;