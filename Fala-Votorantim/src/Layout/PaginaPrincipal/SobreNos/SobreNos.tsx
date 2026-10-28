import NavegacaoPublica from "../../NavegacaoPublica";
import Footer from "../../../Components/Footer/Footer";

export default function Sobre() {
    return (
        <div className="flex min-h-screen flex-col">
            <NavegacaoPublica />
            <main className="flex-1 bg-slate-50" />
            <Footer />
        </div>
    );
}