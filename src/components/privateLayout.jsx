import { Link, Outlet } from "react-router-dom";

//Importacion de componentes
import HeaderApp from "./headerapp";
import SliderBar from "./sliderbar";

function PrivateLayout() {
    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            {/* Cabecera */}
            <HeaderApp />

            {/* Contenedor Inferior */}
            <div className="flex flex-1 overflow-hidden">
                {/* Navegacion Izquierda */}
                <aside className="h-full">
                    <SliderBar />
                </aside>

                {/* Contenido*/}
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
export default PrivateLayout;