import { NavLink } from "react-router-dom";

const destaques = ["Seguro e anônimo", "Sem burocracia", "De qualquer dispositivo"]

export default function Hero() {
    return(
        <section className="relative overflow-hidden bg-linear-to-br from-[#1447E6] to-[#193CB8] text-white">
            {/* grade sutil de fundo */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                }}
            />

            <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-28 text-center md:py-36">
                <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
                    Canal de participação cidadã de Votorantim
                </span>

                <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                    Ajude a melhorar <span className="text-[#BEDBFF]">Votorantim</span>
                </h1>

                <p className="max-w-2xl text-lg text-white/85 md:text-xl">
                    Encontrou algum problema na cidade? Denuncie buracos, iluminação quebrada, lixo acumulado e outros problemas urbanos de forma rápida, segura e anônima.
                </p>

                <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
                    <NavLink
                        to="/Registro"
                        className="rounded-lg bg-white px-8 py-3.5 font-semibold text-[#1447E6] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                        Fazer denúncia
                    </NavLink>
                    <NavLink
                        to="/Feed"
                        className="rounded-lg border border-white/40 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
                    >
                        Ver denúncias
                    </NavLink>
                </div>

                <ul className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/80">
                    {destaques.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                            <svg className="h-4 w-4 text-[#B9F8CF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
