// para cada item. Como tem tags (<section>, <div>...), é .tsx.


// Importa a lista "passos" do arquivo Passos.ts (na mesma pasta).
// "./" = mesma pasta deste arquivo.
// As  { } são obrigatórias porque lá usamos "export const passos".
import { passos } from "./Passos";

function ComoFunciona() {
    return (
        // px-[10vw] = margem lateral de 10% da largura da tela.
        // py-20 = espaço em cima e embaixo.
        // gap-12 = espaço entre o título e o grid de cards.
        <section className="bg-[#EFF6FF] px-[10vw] py-20 flex flex-col gap-12">

            <h2 className=
            "text-3xl font-bold text-center text-[#1E2939]">
                Como funciona?
            </h2>

            {/* GRID dos cards:
                grid-cols-1    -> no celular: 1 card por linha
                md:grid-cols-3 -> de tela média para cima: 3 cards por linha
                              (com 6 passos ficam 2 linhas de 3, certinho)
                gap-6          -> espaço entre os cards */}
            <div className=
            "grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* .map() percorre a lista "passos" e devolve UM card para cada item.
                    "passo" = o item atual ({ icone, titulo, texto })
                    "index" = a posição dele na lista (0, 1, 2, ...) */}
                {passos.map((passo, index) => {

                    // O React só desenha como componente se o nome começar com
                    // letra MAIÚSCULA. Por isso copiamos passo.icone para "Icone".
                    const Icone = passo.icone;

                    return (
                        // "key" é obrigatória em listas: o React usa para saber
                        // qual card é qual. O título é único
                        <div
                            key={passo.titulo}
                            className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3"
                        >
                            {/* referese o ícone. size = tamanho em pixels. */}
                            <Icone className="text-blue-600" size={32} />

                            <h3 className="text-lg font-bold text-[#1E2939]">
                                {/* index começa em 0, então somamos 1

                                    para o primeiro card ser "1." */}
                                {index + 1}. {passo.titulo}
                            </h3>



                            <p className="text-[#4A5565]">{passo.texto}</p> </div>
                    );
                })}
            </div>
        </section>
    );
}


export default ComoFunciona;
