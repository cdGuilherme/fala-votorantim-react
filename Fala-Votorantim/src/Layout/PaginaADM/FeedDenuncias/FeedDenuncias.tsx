import { useCallback, useState } from "react";
import NavegacaoADM from "../NavegacaoADM";
import ResumoDenuncias from "../../../Layout/FeedDenuncias/ResumoDenuncias";
import FiltrosDenuncias from "../../../Layout/FeedDenuncias/FiltrosDenuncias";
import ListaDenuncias from "../../../Layout/FeedDenuncias/ListaDenuncias";
import DetalheDenuncia from "../../../Layout/FeedDenuncias/DetalheDenuncia";
import useFeedDenuncias from "../../../hooks/Denuncias/useFeedDenuncias";
import useSessao from "../../../hooks/useSessao";
import { contasAdministrativasDemonstracao } from "../../../LoginADM/contasDemonstracao";

const secretarias = contasAdministrativasDemonstracao.map((conta) => conta.secretaria);

export default function FeedDenuncias() {
    const {
        denuncias,
        filtradas,
        mensagemErro,
        busca,
        setBusca,
        mostrarFiltros,
        setMostrarFiltros,
        categoriasSelecionadas,
        alternarCategoria,
        statusSelecionados,
        alternarStatus,
        dataInicial,
        setDataInicial,
        dataFinal,
        setDataFinal,
        ordemData,
        setOrdemData,
        limparFiltros,
        alterarStatus,
        responderDenuncia,
        encaminharDenuncia,
        historicoDe,
    } = useFeedDenuncias();
    const { sessao } = useSessao();
    const responsavel = sessao?.secretaria ?? "Prefeitura";

    // Guarda só o id para o painel sempre mostrar o status mais recente.
    const [idAberta, setIdAberta] = useState<string | null>(null);
    const denunciaAberta = denuncias.find((d) => d.id === idAberta);
    const fecharDetalhe = useCallback(() => setIdAberta(null), []);

    return (
        <div className="flex min-h-screen bg-[#F5F8FF]">
            <NavegacaoADM />

            <main className="min-w-0 flex-1 px-4 pb-10 pt-20 sm:px-6 lg:ml-64 lg:px-10 lg:pt-8">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                    <header className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-[#1E2939] sm:text-3xl">
                            Feed de Denúncias
                        </h1>

                        <p className="text-sm text-[#155DFC] sm:text-base">
                            Gerenciar
                        </p>
                    </header>

                    <ResumoDenuncias denuncias={denuncias} />

                    {mensagemErro && (
                        <p role="status" className="rounded-xl border border-[#FDE68A] bg-[#FEFCE8] p-3 text-sm text-[#A65F00]">
                            {mensagemErro}
                        </p>
                    )}

                    <FiltrosDenuncias
                        busca={busca}
                        onBuscaChange={setBusca}
                        mostrarFiltros={mostrarFiltros}
                        onToggleFiltros={() => setMostrarFiltros((atual) => !atual)}
                        categoriasSelecionadas={categoriasSelecionadas}
                        onAlternarCategoria={alternarCategoria}
                        statusSelecionados={statusSelecionados}
                        onAlternarStatus={alternarStatus}
                        onLimparFiltros={limparFiltros}
                        dataInicial={dataInicial}
                        onDataInicialChange={setDataInicial}
                        dataFinal={dataFinal}
                        onDataFinalChange={setDataFinal}
                        ordemData={ordemData}
                        onOrdemDataChange={setOrdemData}
                    />

                    <ListaDenuncias
                        denuncias={filtradas}
                        quantidadeInicial={6}
                        onAbrir={(denuncia) => setIdAberta(denuncia.id)}
                    />
                </div>
            </main>

            {denunciaAberta && (
                <DetalheDenuncia
                    key={denunciaAberta.id}
                    denuncia={denunciaAberta}
                    historico={historicoDe(denunciaAberta.id)}
                    onFechar={fecharDetalhe}
                    gestao={{
                        secretarias,
                        onAlterarStatus: (id, status) => alterarStatus(id, status, responsavel),
                        onResponder: (id, texto) => responderDenuncia(id, texto, responsavel),
                        onEncaminhar: (id, nome) => encaminharDenuncia(id, nome, responsavel),
                    }}
                />
            )}
        </div>
    );
}
