const cards = [
    {
        titulo: "Plataforma simples e intuitiva",
        texto: "Registre problemas urbanos de maneira prática, com uma interface fácil de entender e acessível para qualquer pessoa.",
        fundo: "#EFF6FF",
        borda: "#BEDBFF",
        cor: "#1447E6",
        fundoIcone: "#BEDBFF",
        corIcone: "#1447E6",
        icone: <path d="M20 6 9 17l-5-5" />,
    },
    {
        titulo: "Denúncias seguras e anônimas",
        texto: "Envie denúncias com mais privacidade e segurança, ajudando a cidade sem precisar expor suas informações pessoais.",
        fundo: "#F0FDF4",
        borda: "#B9F8CF",
        cor: "#0D542B",
        fundoIcone: "#B9F8CF",
        corIcone: "#00A63E",
        icone: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    },
    {
        titulo: "Acesse de qualquer dispositivo",
        texto: "Faça denúncias em poucos passos, sem burocracia, por uma aplicação web acessível de onde estiver.",
        fundo: "#FFEDD4",
        borda: "#FF6900",
        cor: "#A65F00",
        fundoIcone: "#FF6900",
        corIcone: "#FFFFFF",
        icone: <path d="M3 9.5 12 3l9 6.5V21h-6v-7H9v7H3V9.5Z" />,
    },
    {
        titulo: "Ajude a melhorar sua cidade",
        texto: "Cada denúncia contribui para identificar problemas mais rapidamente e ajudar na melhoria de Votorantim para todos.",
        fundo: "#FAF5FF",
        borda: "#9810FA",
        cor: "#1E2939",
        fundoIcone: "#9810FA",
        corIcone: "#FFFFFF",
        icone: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    },
]

export default function Beneficios() {
    return (
        <section className="bg-white px-[10vw] py-20 flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-[#1E2939] text-center">
                Denuncie de forma rápida, segura e anônima.
            </h2>

            <p className="text-[#4A5565] text-center max-w-[60vw]">
                O Fala Votorantim é uma plataforma criada para aproximar a população da prefeitura,
                facilitando o envio de denúncias urbanas e ajudando a melhorar a cidade para todos.
            </p>

            <p className="text-[#4A5565] text-center max-w-[60vw]">
                Quanto mais pessoas participam, mais rápido os problemas podem ser identificados e resolvidos.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8 w-full max-w-[70vw]">
                {cards.map((card) => {
                    return (
                        <div
                            key={card.titulo}
                            className="flex flex-col items-center text-center gap-4 rounded-xl border p-8"
                            style={{ backgroundColor: card.fundo, borderColor: card.borda }}
                        >
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: card.fundoIcone }}
                            >
                                <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke={card.corIcone}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {card.icone}
                                </svg>
                            </div>

                            <h3 className="font-bold" style={{ color: card.cor }}>
                                {card.titulo}
                            </h3>

                            <p className="text-sm" style={{ color: card.cor }}>
                                {card.texto}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
