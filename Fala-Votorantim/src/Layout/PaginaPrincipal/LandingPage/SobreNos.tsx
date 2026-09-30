
// Antes: 3 parágrafos soltos + botão de largura total.
// Agora: os 3 parágrafos viraram 3 cards com ícone e título,
// e o botão ficou menor, com uma setinha que se mexe no hover.


import { NavLink } from "react-router-dom";

// Ícones do lucide-react 
// GraduationCap = estudantes, Target = missão, Users = população.
// ArrowRight = setinha do botão.
import { GraduationCap, Target, Users, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Formato de cada card. Mesmo esquema do Passos.ts:
// o TypeScript avisa se você esquecer algum campo.
type Card = {
    icone: LucideIcon;
    titulo: string;
    texto: string;
};

// Os textos são os MESMOS de antes, só foram separados em 3 cards.
// Deixei a lista aqui dentro porque só este componente usa.
// Se quiser, dá para mover para outro arquivo como fizemos com Passos.ts.
const cards: Card[] = [
    {
        icone: GraduationCap,
        titulo: "Quem somos",
        texto:
            "O Fala Votorantim é um projeto desenvolvido por estudantes da Fatec de Votorantim com o objetivo de modernizar a comunicação entre cidadãos e prefeitura.",
    },
    {
        icone: Target,
        titulo: "Nossa missão",
        texto:
            "Utilizar tecnologia para incentivar a participação da população e facilitar a resolução de problemas urbanos de maneira rápida, acessível e eficiente.",
    },
    {
        icone: Users,
        titulo: "No que acreditamos",
        texto:
            "Cidades melhores são construídas quando a população participa ativamente.",
    },
];

function SobreNos() {
    return (
        // Fundo branco (alterna com o azul claro do ComoFunciona).
        // py-16 = espaço em cima e embaixo. Antes só tinha em cima (pt-16);
        // se a seção de baixo já tiver espaço próprio, troque para pt-16.
        <section className="bg-white px-[10vw] py-16 flex flex-col items-center gap-10">

            {/* Cabeçalho: título + uma linha azul curta embaixo.
                A linha é só uma div de 64px de largura (w-16) e 4px de altura (h-1). */}
            <div className="flex flex-col items-center gap-3">
                <h2 className="text-3xl font-bold text-[#1E2939] text-center">
                    Sobre nós
                </h2>
                <div className="w-16 h-1 rounded-full bg-[#1447E6]" />
            </div>

            {/* GRID dos cards:
                1 coluna no celular, 3 colunas de tela média para cima.
                w-full max-w-5xl = ocupa a largura toda, mas para em 64rem
                (assim o texto não fica esticado demais em telas grandes). */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {cards.map((card) => {
                    // Letra maiúscula para o React tratar como componente.
                    const Icone = card.icone;

                    return (
                        <div
                            key={card.titulo}
                            // bg-[#EFF6FF]     = mesmo azul claro do resto do site
                            // rounded-2xl      = cantos bem arredondados
                            // border           = borda fina para dar contorno
                            // hover:-translate-y-1 = sobe 4px ao passar o mouse
                            // hover:shadow-md  = aparece uma sombra no hover
                            // transition       = anima a mudança em vez de pular
                            className="bg-[#EFF6FF] border border-blue-100 rounded-2xl p-6 flex flex-col gap-4 transition hover:-translate-y-1 hover:shadow-md"
                        >
                            {/* Quadradinho branco atrás do ícone (w-12 h-12 = 48px).
                                flex + items-center + justify-center = ícone no meio. */}
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                <Icone className="text-[#1447E6]" size={24} />
                            </div>

                            <h3 className="text-lg font-bold text-[#1E2939]">
                                {card.titulo}
                            </h3>

                            {/* leading-relaxed = mais espaço entre as linhas, lê melhor */}
                            <p className="text-[#4A5565] leading-relaxed">
                                {card.texto}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* BOTÃO:
                Antes ocupava 60vw inteiro. Agora tem só o tamanho do conteúdo
                (px-8 = espaço nas laterais), o que fica mais elegante.
                "group" permite que a setinha reaja quando o mouse passa no botão todo. */}
            <NavLink
                to="/Sobre"
                className="group bg-[#1447E6] text-white font-medium rounded-lg h-12 px-8 flex items-center gap-2 transition hover:bg-[#1239C4]"
            >
                Saiba mais

                {/* group-hover:translate-x-1 = a setinha anda 4px para a direita
                    quando o mouse está sobre o botão (por causa do "group" acima). */}
                <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                />
            </NavLink>
        </section>
    );
}

export default SobreNos;
