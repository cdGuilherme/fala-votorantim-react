import Header from '../../../Components/Header/Header';
import Footer from "../../../Components/Footer/Footer";
import Hero from "./../../../Layout/PaginaPrincipal/LandingPage/Hero";
import Beneficios from "../../../Layout/PaginaPrincipal/LandingPage/Beneficios"; 
import ComoFunciona from "../../../Layout/PaginaPrincipal/LandingPage/ComoFunciona";
import PequenasAcoes from "../../../Layout/PaginaPrincipal/LandingPage/PequenasAcoes";
import SobreNos from "../../../Layout/PaginaPrincipal/LandingPage/SobreNos";
import FacaParte from "../../../Layout/PaginaPrincipal/LandingPage/FacaParte";


function LandingPage() {
    return(
        <div>
            <Header/>
            <Hero/>
            <Beneficios/>
            <ComoFunciona/>
            <PequenasAcoes/>
            <SobreNos/>
            <FacaParte/>
            <Footer/>
        </div>
    )
}

export default LandingPage;