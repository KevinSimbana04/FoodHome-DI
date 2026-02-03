import facebook from "../assets/iconos/facebook(1).png";
import instagram from "../assets/iconos/instagram.png";
import x from "../assets/iconos/medios-de-comunicacion-social.png";


function Footer() {
    return (
        <footer className="bg-white shadow-md border-t-2 border-[#1FAF97] mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <h1 className="font-bold text-gray-700 text-lg">Redes Sociales</h1>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/" className="inline-block group transition-transform hover:-translate-y-1">
                                <img src={facebook} alt="Facebook"
                                    className="w-[35px] drop-shadow-sm" />
                            </a>
                            <a href="https://www.facebook.com/" className="inline-block group transition-transform hover:-translate-y-1">
                                <img src={instagram} alt="Instagram"
                                    className="w-[35px] drop-shadow-sm" />
                            </a>
                            <a href="https://www.facebook.com/" className="inline-block group transition-transform hover:-translate-y-1">
                                <img src={x} alt="X"
                                    className="w-[35px] drop-shadow-sm" />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
                        <h1 className="font-bold text-gray-700 text-lg">Contacto</h1>
                        <ul className="text-gray-600 text-sm space-y-1">
                            <li>FoodHome@gmail.com</li>
                            <li>+593 987654321</li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-start gap-2">
                        <h1 className="font-bold text-gray-700 text-lg">Información</h1>
                        <p className="text-gray-500 text-sm">Tu asistente de cocina inteligente.</p>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-8 pt-4 text-center">
                    <p className="text-gray-500 text-sm">
                        Copyright (© 2026 FoodHome). Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
export default Footer;