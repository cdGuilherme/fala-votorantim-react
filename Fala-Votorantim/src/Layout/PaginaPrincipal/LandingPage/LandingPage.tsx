import NavegacaoPublica from "../../NavegacaoPublica";
import Footer from "../../../Components/Footer/Footer";
import Hero from "./Hero";
import ComoFunciona from "./ComoFunciona";
import PequenasAcoes from "./PequenasAcoes";
import SobreNos from "./SobreNos";
import FacaParte from "./FacaParte";

export default function LandingPage() {
    return (
        <div>
            <NavegacaoPublica />
            <Hero />
            <ComoFunciona />
            <PequenasAcoes />
            <SobreNos />
            <FacaParte />
            <Footer />
        </div>
    );
}