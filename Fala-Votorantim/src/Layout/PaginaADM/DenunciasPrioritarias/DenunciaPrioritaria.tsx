
import { useMemo, useState } from "react";

import MenuLateralADM from "../../../Components/Cards/menuLateral/MenuLateralADM";

import { denunciasIniciais } from "../../../Layout/FeedDenuncias/dadosDenuncias";

import type {
    Denuncia,
    Status,
} from "../../../Layout/FeedDenuncias/types";

type DenunciaPrioritaria = Denuncia & {
    prioritaria?: boolean;
    prioridade?: string | boolean;
    periculosidade?: string | boolean;
    nivelPericulosidade?: string;
};

function verificarPrioridade(denuncia: DenunciaPrioritaria): boolean {
    const prioridade = String(denuncia.prioridade ?? "").toLowerCase().trim();
    const periculosidade = String(
        denuncia.periculosidade ?? ""
    ).toLowerCase().trim();
    const nivel = String(
        denuncia.nivelPericulosidade ?? ""
    ).toLowerCase().trim();

    const valoresPrioritarios = [
        "alta",
        "alto",
        "urgente",
        "critica",
        "crítica",
        "prioritaria",
        "prioritária",
        "muito alta",
    ];

    return (
        denuncia.prioritaria === true ||
        denuncia.prioridade === true ||
        denuncia.periculosidade === true ||
        valoresPrioritarios.includes(prioridade) ||
        valoresPrioritarios.includes(periculosidade) ||
        valoresPrioritarios.includes(nivel)
    );
}

function converterData(data: string): number {
    const [dataParte, horaParte = "00:00"] = data.split(", ");
    const [dia, mes, ano] = dataParte.split("/").map(Number);
    const [hora, minuto] = horaParte.split(":").map(Number);

    const timestamp = new Date(
        ano,
        mes - 1,
        dia,
        hora,
        minuto
    ).getTime();

    return Number.isNaN(timestamp) ? 0 : timestamp;
}

export default function DenunciasPrioritarias() {
    const denuncias = denunciasIniciais as DenunciaPrioritaria[];

    const [busca, setBusca] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [statusSelecionado, setStatusSelecionado] = useState("");
    const [ordemData, setOrdemData] = useState<"recentes" | "antigas">(
        "recentes"
    );

    const prioritarias = useMemo(() => {
        return denuncias.filter(verificarPrioridade);
    }, [denuncias]);

    const categorias = useMemo(() => {
        return [...new Set(prioritarias.map((denuncia) => denuncia.categoria))]
            .filter(Boolean)
            .sort();
    }, [prioritarias]);

    const statusDisponiveis = useMemo(() => {
        return [...new Set(prioritarias.map((denuncia) => denuncia.status))]
            .filter(Boolean);
    }, [prioritarias]);

    const filtradas = useMemo(() => {
        const termo = busca.toLowerCase().trim();

        return prioritarias
            .filter((denuncia) => {
                const correspondeBusca =
                    !termo ||
                    denuncia.id.toLowerCase().includes(termo) ||
                    denuncia.titulo.toLowerCase().includes(termo) ||
                    denuncia.descricao.toLowerCase().includes(termo) ||
                    denuncia.endereco.toLowerCase().includes(termo);

                const correspondeCategoria =
                    !categoriaSelecionada ||
                    denuncia.categoria === categoriaSelecionada;

                const correspondeStatus =
                    !statusSelecionado ||
                    denuncia.status === statusSelecionado;

                return (
                    correspondeBusca &&
                    correspondeCategoria &&
                    correspondeStatus
                );
            })
            .sort((a, b) => {
                const diferenca =
                    converterData(a.data) - converterData(b.data);

                return ordemData === "recentes" ? -diferenca : diferenca;
            });
    }, [
        prioritarias,
        busca,
        categoriaSelecionada,
        statusSelecionado,
        ordemData,
    ]);

    function limparFiltros() {
        setBusca("");
        setCategoriaSelecionada("");
        setStatusSelecionado("");
        setOrdemData("recentes");
    }

    return (
        <div className="flex min-h-screen bg-[#EFF6FF]">
            <MenuLateralADM />

            <main className="min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-6 md:pt-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
                    <header>
                        <p className="text-sm font-medium text-[#A65F00]">
                            Administração
                        </p>

                        <h1 className="mt-1 text-2xl font-bold text-[#1E2939] sm:text-3xl">
                            Denúncias Prioritárias
                        </h1>
                    </header>

                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <article className="rounded-xl border border-[#F3D6A4] bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm font-medium text-[#6A7282]">
                                    Total prioritárias
                                </p>
                            </div>

                            <p className="mt-3 text-3xl font-bold text-[#1E2939]">
                                {prioritarias.length}
                            </p>
                        </article>

                        <article className="rounded-xl border border-[#D9E4F5] bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-[#6A7282]">
                                Pendentes
                            </p>

                            <p className="mt-3 text-3xl font-bold text-amber-700">
                                {
                                    prioritarias.filter(
                                        (denuncia) =>
                                            normalizarStatus(denuncia.status) ===
                                            "pendente"
                                    ).length
                                }
                            </p>
                        </article>

                        <article className="rounded-xl border border-[#D9E4F5] bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-[#6A7282]">
                                Em andamento
                            </p>

                            <p className="mt-3 text-3xl font-bold text-[#155DFC]">
                                {
                                    prioritarias.filter(
                                        (denuncia) =>
                                            normalizarStatus(denuncia.status) ===
                                            "andamento"
                                    ).length
                                }
                            </p>
                        </article>
                    </section>

                    <section className="rounded-xl border border-[#D9E4F5] bg-white p-4 shadow-sm sm:p-6">
                        <h2 className="text-lg font-semibold text-[#1E2939]">
                            Pesquisar denúncias prioritárias
                        </h2>

                        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <div className="xl:col-span-2">
                                <label htmlFor="busca-prioritarias" className="mb-2 block text-sm font-medium text-[#364153]" >
                                    Pesquisa
                                </label>

                                <input id="busca-prioritarias" type="search" value={busca} onChange={(evento) => 
                                        setBusca(evento.target.value)
                                    }
                                    placeholder="Ex.: DEN-001, buraco, endereço..." className="w-full rounded-lg border border-[#D1D9E6] px-3 py-2.5 text-sm outline-none transition focus:border-[#155DFC] focus:ring-2 focus:ring-[#155DFC]/20"
                                />
                            </div>

                            <div>
                                <label htmlFor="categoria-prioritarias" className="mb-2 block text-sm font-medium text-[#364153]" >
                                    Categoria
                                </label>

                                <select id="categoria-prioritarias" value={categoriaSelecionada} onChange={(evento) => 
                                        setCategoriaSelecionada(
                                            evento.target.value
                                        )
                                    } className="w-full rounded-lg border border-[#D1D9E6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#155DFC]" >

                                    <option value="">Todas as categorias</option>

                                    {categorias.map((categoria) => (
                                        <option
                                            key={categoria}
                                            value={categoria}
                                        >
                                            {categoria}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="status-prioritarias" className="mb-2 block text-sm font-medium text-[#364153]" >
                                    Status
                                </label>

                                <select id="status-prioritarias" value={statusSelecionado} onChange={(evento) =>
                                        setStatusSelecionado(
                                            evento.target.value
                                        )
                                    } className="w-full rounded-lg border border-[#D1D9E6] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#155DFC]" >

                                    <option value="">Todos os status</option>

                                    {statusDisponiveis.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                                <label htmlFor="ordem-prioritarias" className="text-sm text-[#6A7282]" >
                                    Ordenar por:
                                </label>

                                <select id="ordem-prioritarias" value={ordemData} onChange={(evento) =>
                                        setOrdemData(
                                            evento.target.value as
                                                | "recentes"
                                                | "antigas"
                                        )
                                    } className="rounded-lg border border-[#D1D9E6] bg-white px-3 py-2 text-sm outline-none focus:border-[#155DFC]" >

                                    <option value="recentes">
                                        Mais recentes
                                    </option>

                                    <option value="antigas">
                                        Mais antigas
                                    </option>
                                </select>
                            </div>

                            <button type="button" onClick={limparFiltros} className="rounded-lg border border-[#D1D9E6] px-4 py-2 text-sm font-medium text-[#364153] transition hover:bg-[#F3F6FC]" >
                                Limpar filtros
                            </button>
                        </div>
                    </section>

                    <section>
                        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-xl font-bold text-[#1E2939]">
                                Lista de ocorrências prioritárias
                            </h2>

                            <p className="text-sm text-[#6A7282]">
                                {filtradas.length}{" "}
                                {filtradas.length === 1
                                    ? "resultado"
                                    : "resultados"}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {filtradas.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-[#C8D5E8] bg-white px-5 py-12 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9F0FF] text-2xl text-[#155DFC]">
                                        !
                                    </div>

                                    <h3 className="mt-4 font-semibold text-[#1E2939]">
                                        Nenhuma denúncia prioritária encontrada
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-lg text-sm text-[#6A7282]">
                                        Não há registros marcados como prioritários com os filtros atuais. Se você esperava encontrar denúncias aqui, confira se os dados possuem os campos de prioridade ou periculosidade.
                                    </p>

                                    <button type="button" onClick={limparFiltros} className="mt-5 rounded-lg bg-[#1447E6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193CB8]" >
                                        Limpar filtros
                                    </button>
                                </div>
                            ) : (
                                filtradas.map((denuncia) => (
                                    <article
                                        key={denuncia.id}
                                        className="rounded-xl border border-[#F3D6A4] border-l-4 border-l-[#A65F00] bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="rounded-md bg-[#FFF3D6] px-2.5 py-1 text-xs font-bold text-[#8A4B00]">
                                                            PRIORITÁRIA
                                                        </span>

                                                        <span className="text-xs font-semibold text-[#155DFC]">
                                                            {denuncia.id}
                                                        </span>
                                                    </div>

                                                    <h3 className="mt-3 text-lg font-bold text-[#1E2939]">
                                                        {denuncia.titulo}
                                                    </h3>

                                                    <p className="mt-2 text-sm leading-6 text-[#4A5565]">
                                                        {denuncia.descricao}
                                                    </p>
                                                </div>

                                                <span className="w-fit shrink-0 rounded-full bg-[#E9F0FF] px-3 py-1.5 text-xs font-semibold text-[#193CB8]">
                                                    {denuncia.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 gap-3 border-t border-[#EDF1F7] pt-4 sm:grid-cols-2 xl:grid-cols-3">
                                                <div>
                                                    <p className="text-xs font-medium uppercase tracking-wide text-[#99A1AF]">
                                                        Categoria
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-[#364153]">
                                                        {denuncia.categoria}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs font-medium uppercase tracking-wide text-[#99A1AF]">
                                                        Endereço
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-[#364153]">
                                                        {denuncia.endereco}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-xs font-medium uppercase tracking-wide text-[#99A1AF]">
                                                        Data do registro
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-[#364153]">
                                                        {denuncia.data}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

// get: agrupa os status usados nos indicadores
function normalizarStatus(status: Status): string {
    const valor = String(status)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    if (valor.includes("pendente") || valor.includes("aguardando")) {
        return "pendente";
    }

    if (
        valor.includes("andamento") ||
        valor.includes("analise") ||
        valor.includes("encaminhad")
    ) {
        return "andamento";
    }

    return valor;
}
