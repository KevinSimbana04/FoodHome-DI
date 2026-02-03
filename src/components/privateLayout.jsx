import { Link, Outlet } from "react-router-dom";

//Importacion de componentes
import HeaderApp from "./headerapp";
import SliderBar from "./sliderbar";

function PrivateLayout() {
    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            {/* Cabecera */}
            <HeaderApp />

            {/* Contenido */}
            <main className="flex-1 overflow-y-auto p-4 pb-20">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Navegacion inferior */}
            <div className="bg-white border-t border-gray-200 mt-auto">
                <SliderBar />
            </div>
        </div>
    );
}
export default PrivateLayout;