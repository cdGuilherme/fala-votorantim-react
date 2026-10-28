const cards = [
    {
        titulo: "Plataforma simples e intuitiva",
        texto: "Registre problemas urbanos de maneira prática, com uma interface fácil de entender e acessível para qualquer pessoa.",
        fundoIcone: "#EFF6FF",
        corIcone: "#1447E6",
        icone: <path d="M20 6 9 17l-5-5" />,
    },
    {
        titulo: "Denúncias seguras e anônimas",
        texto: "Envie denúncias com mais privacidade e segurança, ajudando a cidade sem precisar expor suas informações pessoais.",
        fundoIcone: "#F0FDF4",
        corIcone: "#00A63E",
        icone: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    },
    {
        titulo: "Acesse de qualquer dispositivo",
        texto: "Faça denúncias em poucos passos, sem burocracia, por uma aplicação web acessível de onde estiver.",
        fundoIcone: "#FFEDD4",
        corIcone: "#FF6900",
        icone: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
    },
    {
        titulo: "Ajude a melhorar sua cidade",
        texto: "Cada denúncia contribui para identificar problemas mais rapidamente e ajudar na melhoria de Votorantim para todos.",
        fundoIcone: "#FAF5FF",
        corIcone: "#9810FA",
        icone: <path d="M3 9.5 12 3l9 6.5V21h-6v-7H9v7H3V9.5Z" />,
    },
]

export default function Beneficios() {
    return (
        <section className="bg-white px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="text-sm font-semibold uppercase tracking-widest text-[#1447E6]">Por que usar</span>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#1E2939] md:text-4xl">
                        Denuncie de forma rápida, segura e anônima.
                    </h2>
                    <p className="mt-4 text-[#4A5565]">
                        O Fala Votorantim é uma plataforma criada para aproximar a população da prefeitura,
                        facilitando o envio de denúncias urbanas e ajudando a melhorar a cidade para todos.
                        Quanto mais pessoas participam, mais rápido os problemas podem ser identificados e resolvidos.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <div
                            key={card.titulo}
                            className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-7 transition hover:-translate-y-1 hover:border-[#BEDBFF] hover:shadow-lg hover:shadow-[#1447E6]/5"
                        >
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-xl"
                                style={{ backgroundColor: card.fundoIcone }}
                            >
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke={card.corIcone} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {card.icone}
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-[#1E2939]">{card.titulo}</h3>
                            <p className="text-sm leading-relaxed text-[#4A5565]">{card.texto}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
