import Header from '../../../Components/Header/Header';
import Footer from "../../../Components/Footer/Footer";
import Hero from "./../../../Layout/PaginaPrincipal/LandingPage/Hero";
import Beneficios from "../../../Layout/PaginaPrincipal/LandingPage/Beneficios"; 


function LandingPage() {
    return(
        <div>
            <Header/>
            <Hero/>
            <Beneficios/>
            <Footer/>
        </div>
    )
}

export default LandingPage;