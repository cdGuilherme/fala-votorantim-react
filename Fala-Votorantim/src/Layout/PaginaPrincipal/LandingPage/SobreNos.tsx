import { NavLink } from "react-router-dom";

function SobreNos() {
    return (
        <section className="bg-white px-[10vw] pt-16 flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold text-[#1E2939] text-center">Sobre nós</h2>

            <div className="flex flex-col gap-2 w-full max-w-[60vw]">
                <p className="text-[#4A5565]">O Fala Votorantim é um projeto desenvolvido por estudantes da Fatec de Votorantim com o objetivo de modernizar a comunicação entre cidadãos e prefeitura.</p>
                <p className="text-[#4A5565]">Nossa missão é utilizar tecnologia para incentivar a participação da população e facilitar a resolução de problemas urbanos de maneira rápida, acessível e eficiente.</p>
                <p className="text-[#4A5565]">Acreditamos que cidades melhores são construídas quando a população participa ativamente.</p>
            </div>

            <NavLink
                to="/Sobre"
                className="bg-[#1447E6] text-white rounded-md h-12 w-full max-w-[60vw] mt-2 flex justify-center items-center"
            >
                Saiba mais
            </NavLink>
        </section>
    )
}

export default SobreNos;
