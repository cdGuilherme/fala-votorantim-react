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
        "Prof. Adriano Perreira Silva",
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
                            <span className="rpx-4 py-1.5 text-sm font-medium backdrop-blur">
                                Projeto Interdisciplinar · Fatec Votorantim
                            </span>
                            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                                Sobre o Fala Votorantim
                            </h1>
                            <p className="max-w-2xl text-lg text-white/85">
                                 O Fala Votorantim é umtrabalho acadêmico,
                                desenvolvido comoProjeto Interdisciplinar (PI) do
                                curso superior deDesenvolvimento de Software Multiplataforma da
                               Fatec Votorantim. Trata-se de um protótipo funcional
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

   {/* Ficha do projeto */}
<section className="px-6 py-16">
    <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-[#1E2939]">
            Quem faz o Fala Votorantim
        </h2>

        <div className="rounded-2xl border border-[#E5E7EB] text-center">
            {/* Instituição */}
            <div className="px-6 py-8">
                <h3 className="text-sm font-semibold text-[#1447E6]">Instituição</h3>
                <p className="mt-2 text-xl font-bold text-[#1E2939]">Fatec Votorantim</p>
                <p className="mx-auto mt-1 max-w-xl text-[#4A5565]">
                    Curso Superior de Tecnologia em Desenvolvimento de Software Multiplataforma
                </p>
            </div>

            {/* Disciplinas, equipe e orientação */}
            <div className="grid border-t border-[#E5E7EB] md:grid-cols-3 md:divide-x md:divide-[#E5E7EB]">
                <div className="px-6 py-8">
                    <h3 className="text-sm font-semibold text-[#1447E6]">Disciplinas integradas</h3>
                    <ul className="mt-3 flex flex-col gap-1.5 text-[#1E2939]">
                        {disciplinas.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                </div>

                <div className="border-t border-[#E5E7EB] px-6 py-8 md:border-t-0">
                    <h3 className="text-sm font-semibold text-[#1447E6]">Equipe</h3>
                    <ul className="mt-3 flex flex-col gap-1.5 text-[#1E2939]">
                        {equipe.map((nome) => <li key={nome}>{nome}</li>)}
                    </ul>
                </div>

                <div className="border-t border-[#E5E7EB] px-6 py-8 md:border-t-0">
                    <h3 className="text-sm font-semibold text-[#1447E6]">Orientação</h3>
                    <ul className="mt-3 flex flex-col gap-1.5 text-[#1E2939]">
                        {orientadores.map((o) => <li key={o}>{o}</li>)}
                    </ul>
                </div>
            </div>

            {/* Tecnologias e período */}
            <div className="flex flex-col justify-center gap-6 border-t border-[#E5E7EB] px-6 py-6 sm:flex-row sm:gap-16">
                
                <div>
                    <h3 className="text-sm font-semibold text-[#1447E6]">Período</h3>
                    <p className="mt-1 text-[#1E2939]">2º semestre de 2026</p>
                </div>
            </div>
        </div>
    </div>
</section>

                </main>

                <Footer />
            </div>
        );
    }
