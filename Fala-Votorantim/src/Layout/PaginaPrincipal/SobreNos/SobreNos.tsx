import { NavLink } from "react-router-dom";
import NavegacaoPublica from "../../NavegacaoPublica";
import Footer from "../../../Components/Footer/Footer";

// Conteúdo baseado no documento do Projeto Interdisciplinar (2º semestre, 2026).

const disciplinas = [
    "Engenharia de Software II",
    "Desenvolvimento Web II",
    "Banco de Dados Relacional",
];

const equipe = [
    "César Henrique dos Santos",
    "Daniel de Freitas Esteves da Costa",
    "Davi Dias Campos",
    "Guilherme Antonio Rodrigues da Costa",
    "Marcos Vinicius Nunes Ferreira",
];

const orientadores = [
    "Profa. Cristiane Palomar Mercado",
    "Prof. Tiago Vanderlei de Arruda",
    "Prof. Jones Artur Gonçalves",
];

const ods = [
    {
        numero: "11",
        titulo: "Cidades e Comunidades Sustentáveis",
        texto: "Contribui para a melhoria da infraestrutura urbana e da qualidade de vida da população.",
        cor: "#FD9D24",
    },
    {
        numero: "16",
        titulo: "Paz, Justiça e Instituições Eficazes",
        texto: "Promove transparência, participação cidadã e eficiência na gestão pública.",
        cor: "#00689D",
    },
    {
        numero: "9",
        titulo: "Indústria, Inovação e Infraestrutura",
        texto: "Aplica tecnologia para modernizar os serviços públicos municipais.",
        cor: "#FD6925",
    },
];

function Etiqueta({ children }: { children: string }) {
    return (
        <span className="text-sm font-semibold uppercase tracking-widest text-[#1447E6]">
            {children}
        </span>
    );
}

export default function Sobre() {
    return (
        <div className="flex min-h-screen flex-col">
            <NavegacaoPublica />

            <main className="flex-1 bg-white">
                {/* Abertura */}
                <section className="bg-linear-to-br from-[#1447E6] to-[#193CB8] px-6 py-20 text-white md:py-28">
                    <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
                        <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium">
                            Projeto Interdisciplinar · Fatec Votorantim
                        </span>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                            Sobre o Fala Votorantim
                        </h1>
                        <p className="max-w-2xl text-lg text-white/85">
                            Uma plataforma para aproximar os cidadãos da Prefeitura de Votorantim,
                            permitindo registrar e acompanhar denúncias de problemas urbanos de forma
                            simples, transparente e acessível.
                        </p>
                    </div>
                </section>

                {/* Aviso acadêmico */}
                <section className="px-6">
                    <div className="mx-auto -mt-10 flex max-w-5xl flex-col gap-4 rounded-2xl border border-[#BEDBFF] bg-white p-6 shadow-xl shadow-[#1447E6]/10 md:flex-row md:items-center md:gap-6 md:p-8">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#1447E6]">
                            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                                <path d="M6 12v5c3 2 9 2 12 0v-5" />
                            </svg>
                        </div>
                        <p className="text-[#364153]">
                            O Fala Votorantim é um <strong className="text-[#1E2939]">trabalho acadêmico</strong>,
                            desenvolvido como <strong className="text-[#1E2939]">Projeto Interdisciplinar (PI)</strong> do
                            curso superior de <strong className="text-[#1E2939]">Desenvolvimento de Software Multiplataforma</strong> da{" "}
                            <strong className="text-[#1E2939]">Fatec Votorantim</strong>. Trata-se de um protótipo funcional
                            e não é um canal oficial da Prefeitura de Votorantim.
                        </p>
                    </div>
                </section>

                {/* O projeto */}
                <section className="px-6 py-20">
                    <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
                        <div>
                            <Etiqueta>O projeto</Etiqueta>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E2939]">
                                Por que criamos o Fala Votorantim
                            </h2>
                        </div>
                        <div className="flex flex-col gap-4 leading-relaxed text-[#4A5565]">
                            <p>
                                Hoje, o registro de problemas urbanos depende principalmente de ligações telefônicas,
                                tem pouca divulgação e não oferece uma forma de acompanhar as solicitações. Isso
                                dificulta a participação da população e reduz a transparência do atendimento.
                            </p>
                            <p>
                                Com o Fala Votorantim, o munícipe registra buracos, iluminação defeituosa, descarte
                                irregular de lixo, terrenos abandonados e outras ocorrências, enviando descrição,
                                endereço e fotos do local. A denúncia é encaminhada ao setor responsável e o cidadão
                                acompanha o andamento até a resolução.
                            </p>
                            <p>
                                Do outro lado, os servidores da prefeitura usam um painel administrativo para
                                analisar as demandas e atualizar o status de cada solicitação.
                            </p>
                            <p>
                                Para entender as necessidades reais, a equipe se reuniu com o secretário do Meio
                                Ambiente da Prefeitura de Votorantim e levantou como funciona hoje o processo interno
                                de denúncias.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ODS */}
                <section className="bg-[#F5F8FF] px-6 py-20">
                    <div className="mx-auto max-w-5xl">
                        <div className="mx-auto mb-12 max-w-2xl text-center">
                            <Etiqueta>Impacto</Etiqueta>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E2939]">
                                Alinhado aos Objetivos de Desenvolvimento Sustentável da ONU
                            </h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {ods.map((item) => (
                                <div key={item.numero} className="flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-6">
                                    <span
                                        className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                                        style={{ backgroundColor: item.cor }}
                                    >
                                        {item.numero}
                                    </span>
                                    <h3 className="font-semibold text-[#1E2939]">ODS {item.numero} – {item.titulo}</h3>
                                    <p className="text-sm leading-relaxed text-[#4A5565]">{item.texto}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ficha acadêmica */}
                <section className="px-6 py-20">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-12 max-w-2xl">
                            <Etiqueta>Ficha do projeto</Etiqueta>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E2939]">
                                Quem faz o Fala Votorantim
                            </h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-2xl border border-[#E5E7EB] p-6">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">Instituição</h3>
                                <p className="mt-2 font-semibold text-[#1E2939]">Fatec Votorantim</p>
                                <p className="mt-1 text-sm text-[#4A5565]">Curso Superior de Tecnologia em Desenvolvimento de Software Multiplataforma</p>
                                <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">Disciplinas integradas</h3>
                                <ul className="mt-2 flex flex-col gap-1 text-sm text-[#4A5565]">
                                    {disciplinas.map((d) => <li key={d}>{d}</li>)}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-[#E5E7EB] p-6">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">Equipe</h3>
                                <ul className="mt-3 flex flex-col gap-3">
                                    {equipe.map((nome) => (
                                        <li key={nome} className="flex items-center gap-3 text-sm text-[#1E2939]">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-xs font-bold text-[#1447E6]">
                                                {nome.split(" ").map((p) => p[0]).filter((_, i, a) => i === 0 || i === a.length - 1).join("")}
                                            </span>
                                            {nome}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-[#E5E7EB] p-6">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">Orientação</h3>
                                <ul className="mt-2 flex flex-col gap-1 text-sm text-[#1E2939]">
                                    {orientadores.map((o) => <li key={o}>{o}</li>)}
                                </ul>
                                <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">Tecnologias</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {["React", "TypeScript", "Tailwind CSS"].map((t) => (
                                        <span key={t} className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-medium text-[#364153]">{t}</span>
                                    ))}
                                </div>
                                <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">Período</h3>
                                <p className="mt-2 text-sm text-[#1E2939]">2º semestre · 2026</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Chamada */}
                <section className="px-6 pb-20">
                    <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 rounded-3xl bg-[#1E2939] px-8 py-14 text-center">
                        <h2 className="text-2xl font-bold text-white md:text-3xl">Conheça a plataforma</h2>
                        <p className="max-w-xl text-[#99A1AF]">
                            Veja as denúncias registradas ou crie sua conta para participar.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <NavLink to="/Feed" className="rounded-lg bg-[#1447E6] px-6 py-3 font-semibold text-white transition hover:bg-[#155DFC]">
                                Ver denúncias
                            </NavLink>
                            <NavLink to="/Registro" className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                                Criar conta
                            </NavLink>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
