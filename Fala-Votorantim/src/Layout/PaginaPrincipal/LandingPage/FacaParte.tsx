import { NavLink } from "react-router-dom";

function FacaParte() {
    return (
        <section className="bg-white px-6 py-24">
            <div className="relative mx-auto max-w-10xl overflow-hidden rounded-4xl bg-[#1E2939] px-8 py-16 text-center md:px-16">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#1447E6]/40 blur-3xl" />
                <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#99A1AF]/30 blur-3xl" />

                <div className="relative flex flex-col items-center gap-5">
                    <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Faça parte da mudança</h2>
                    <p className="max-w-xl text-[#99A1AF]">
                        Não ignore os problemas da cidade. Denuncie, participe e ajude a construir uma Votorantim melhor para todos.
                    </p>
                    <NavLink
                        to="/Registro"
                        className="mt-3 rounded-lg bg-[#1447E6] px-8 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#155DFC]"
                    >
                        Começar agora
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

export default FacaParte;
