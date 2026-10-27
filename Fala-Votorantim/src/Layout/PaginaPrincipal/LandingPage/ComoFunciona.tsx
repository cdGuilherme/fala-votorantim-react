const categorias = [
    { titulo: "Infraestrutura urbana", itens: ["Buracos", "Calçadas danificadas", "Sinalização quebrada"] },
    { titulo: "Iluminação pública", itens: ["Postes apagados", "Falta de iluminação", "Problemas elétricos urbanos"] },
    { titulo: "Limpeza urbana", itens: ["Lixo acumulado", "Entulho irregular", "Terrenos abandonados"] },
    { titulo: "Vazamentos e saneamento", itens: ["Vazamentos de água", "Esgoto", "Problemas em vias públicas"] },
]

const passos = [
    {
        titulo: "Crie sua conta",
        texto: "Faça seu cadastro de forma rápida e segura. Com uma conta você pode registrar denúncias, acompanhar solicitações, visualizar atualizações e participar ativamente da melhoria da cidade.",
    },
    {
        titulo: "Registre sua denúncia",
        texto: "Encontrou um problema na cidade? Descreva a situação, informe o local e envie fotos para ajudar na identificação do problema.",
    },
    {
        titulo: "As informações são organizadas",
        texto: "A denúncia é registrada e organizada para facilitar a análise: tipo de problema, localização, prioridade e quantidade de denúncias semelhantes.",
    },
    {
        titulo: "Acompanhe o andamento",
        texto: "Veja o status da sua denúncia diretamente pela plataforma, com mais transparência sobre os problemas reportados na cidade.",
        status: ["Pendente", "Em andamento", "Resolvido"],
    },
    {
        titulo: "Ajude a melhorar Votorantim",
        texto: "Cada denúncia contribui para uma cidade mais organizada, segura e eficiente. Com o Fala Votorantim, sua voz ajuda a transformar a cidade.",
    },
]

const coresStatus = ["bg-[#FEFCE8] text-[#A65F00]", "bg-[#EFF6FF] text-[#1C398E]", "bg-[#F0FDF4] text-[#0D542B]"]

function ComoFunciona() {
    return (
        <section className="bg-[#F5F8FF] px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-widest text-[#1447E6]">Passo a passo</span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E2939] md:text-4xl">Como funciona?</h2>
                    <p className="mt-4 text-[#4A5565]">Nosso sistema foi pensado para ser simples e acessível para qualquer pessoa.</p>
                </div>

                <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {passos.map((passo, index) => (
                        <li key={passo.titulo} className="relative flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E5E7EB]">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1447E6] font-bold text-white">
                                {index + 1}
                            </span>
                            <h3 className="font-semibold text-[#1E2939]">{passo.titulo}</h3>
                            <p className="text-sm leading-relaxed text-[#4A5565]">{passo.texto}</p>
                            {passo.status && (
                                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                                    {passo.status.map((s, i) => (
                                        <span key={s} className={`rounded-full px-2.5 py-1 text-xs font-medium ${coresStatus[i]}`}>{s}</span>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ol>

                <div className="mt-16 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#E5E7EB] md:p-10">
                    <h3 className="text-xl font-bold text-[#1E2939]">O que você pode denunciar</h3>
                    <p className="mt-1 text-sm text-[#4A5565]">Quanto mais detalhada for a denúncia, mais eficiente pode ser o encaminhamento da situação.</p>

                    <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {categorias.map((categoria) => (
                            <div key={categoria.titulo}>
                                <h4 className="mb-3 border-l-4 border-[#1447E6] pl-3 font-semibold text-[#1E2939]">{categoria.titulo}</h4>
                                <ul className="flex flex-col gap-1.5 pl-4 text-sm text-[#4A5565]">
                                    {categoria.itens.map((item) => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <p className="mt-8 text-sm text-[#4A5565]">Entre outros problemas não mencionados também.</p>
                </div>
            </div>
        </section>
    )
}

export default ComoFunciona;
