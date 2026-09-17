import { NavLink } from "react-router-dom";

function FacaParte() {
    return (
        <section className="bg-white px-[10vw] py-16 flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold text-[#1E2939] text-center">Faça parte da mudança</h2>

            <div className="flex flex-col gap-2 w-full max-w-[60vw]">
                <p className="text-[#4A5565]">Não ignore os problemas da cidade.</p>
                <p className="text-[#4A5565]">Denuncie, participe e ajude a construir uma Votorantim melhor para todos.</p>
            </div>

            <NavLink
                to="/Registro"
                className="bg-[#1447E6] text-white rounded-md h-12 w-full max-w-[60vw] mt-2 flex justify-center items-center"
            >
                Começar agora
            </NavLink>
        </section>
    )
}

export default FacaParte;
