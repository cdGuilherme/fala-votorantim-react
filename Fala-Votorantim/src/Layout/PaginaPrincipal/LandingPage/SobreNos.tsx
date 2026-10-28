import { NavLink } from "react-router-dom";
import bandeira from "../../../assets/Bandeira de votorantim.png";
function SobreNos() {
    return (
        <section className="bg-[#F5F8FF] px-6 py-24">
            <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
                <div>
                    <span className="text-sm font-semibold uppercase tracking-widest text-[#1447E6]">Sobre nós</span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E2939] md:text-4xl">
                        Tecnologia a serviço da cidade
                    </h2>
                    <div className="mt-6 flex flex-col gap-4 text-[#4A5565]">
                        <p>O Fala Votorantim é um projeto desenvolvido por estudantes da Fatec de Votorantim com o objetivo de modernizar a comunicação entre cidadãos e prefeitura.</p>
                        <p>Nossa missão é utilizar tecnologia para incentivar a participação da população e facilitar a resolução de problemas urbanos de maneira rápida, acessível e eficiente.</p>
                    </div>
                    <NavLink
                        to="/Sobre"
                        className="mt-8 inline-flex items-center gap-2 font-semibold text-[#1447E6] transition hover:gap-3"
                    >
                        Saiba mais <span aria-hidden>→</span>
                    </NavLink>
                </div>

           
             <div className="rounded-2xl bg-linear-to-br from-[#] to-[#] p-10 text-white shadow-xl shadow-[#]/20">
  <img
    src={bandeira}
    alt="Bandeira Votorantim"
    className="mx-auto h-auto w-full max-w-sm rounded-xl object-cover"
  />
</div>
            </div>
        </section>
    )
}

export default SobreNos;
