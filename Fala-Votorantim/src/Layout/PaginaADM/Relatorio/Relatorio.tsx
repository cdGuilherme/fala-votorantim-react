
import NavegacaoADM from "../NavegacaoADM";
import ResumoDenuncias from "../../FeedDenuncias/ResumoDenuncias";
import useRelatoriosADM from "../../../hooks/Denuncias/useRelatoriosADM";
import type { Periodo } from "../../../hooks/Denuncias/useRelatoriosADM";

export default function RelatoriosEstatisticas() {
    const {
        periodo,
        setPeriodo,
        categoriaSelecionada,
        setCategoriaSelecionada,
        categorias,
        denunciasFiltradas,
        total,
        percentualConcluido,
        dadosCategorias,
        dadosStatus,
        mensagemErro,
        mensagemExportacao,
        interpretarStatus,
        exportarRelatorio,
    } = useRelatoriosADM();

    return (
        <div className="min-h-screen bg-slate-50 lg:flex">
            <NavegacaoADM />

            <main className="min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-6 lg:ml-64 lg:pt-8 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    {(mensagemErro || mensagemExportacao) && (
                        <p
                            role="status"
                            className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800"
                        >
                            {mensagemErro || mensagemExportacao}
                        </p>
                    )}

                    <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-sm font-semibold text-blue-700">
                                Relatórios
                            </p>

                            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                                Relatórios e Estatísticas
                            </h1>
                        </div>

                        <button
                            type="button"
                            onClick={exportarRelatorio}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                        >
                            Exportar relatório
                        </button>
                    </section>

                    <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end">
                        <div className="flex-1">
                            <label
                                htmlFor="periodo"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Período
                            </label>

                            <select
                                id="periodo"
                                value={periodo}
                                onChange={(evento) =>
                                    setPeriodo(evento.target.value as Periodo)
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="todos">Todo o período</option>
                                <option value="7">Últimos 7 dias</option>
                                <option value="30">Últimos 30 dias</option>
                                <option value="90">Últimos 90 dias</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label
                                htmlFor="categoria"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Categoria
                            </label>

                            <select
                                id="categoria"
                                value={categoriaSelecionada}
                                onChange={(evento) =>
                                    setCategoriaSelecionada(evento.target.value)
                                }
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            >
                                {categorias.map((categoria) => (
                                    <option key={categoria} value={categoria}>
                                        {categoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </section>

                    <ResumoDenuncias denuncias={denunciasFiltradas} />

                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-slate-900">
                                    Denúncias por categoria
                                </h2>
                            </div>

                            {dadosCategorias.length === 0 ? (
                                <p className="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500">
                                    Nenhuma denúncia encontrada para os filtros selecionados.
                                </p>
                            ) : (
                                <div className="space-y-5">
                                    {dadosCategorias.map((item) => {
                                        const largura =
                                            total > 0
                                                ? (item.quantidade / total) * 100
                                                : 0;

                                        return (
                                            <div key={item.nome}>
                                                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                                                    <span className="font-medium text-slate-700">
                                                        {item.nome}
                                                    </span>

                                                    <span className="font-bold text-slate-900">
                                                        {item.quantidade}
                                                    </span>
                                                </div>

                                                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                                    <div
                                                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                                                        style={{ width: `${largura}%` }}
                                                    />
                                                </div>

                                                <p className="mt-1 text-right text-xs text-slate-400">
                                                    {Math.round(largura)}% do total
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-slate-900">
                                    Situação das denúncias
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {dadosStatus.map((item) => {
                                    const largura =
                                        total > 0
                                            ? (item.quantidade / total) * 100
                                            : 0;

                                    return (
                                        <div key={item.nome}>
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-sm font-medium text-slate-700">
                                                    {item.nome}
                                                </span>

                                                <span className="text-sm font-bold text-slate-900">
                                                    {item.quantidade}{" "}
                                                    <span className="font-normal text-slate-400">
                                                        ({Math.round(largura)}%)
                                                    </span>
                                                </span>
                                            </div>

                                            <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${item.cor}`}
                                                    style={{ width: `${largura}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 rounded-lg bg-slate-50 p-4">
                                <p className="text-sm font-semibold text-slate-800">
                                    Taxa de conclusão
                                </p>

                                <div className="mt-3 flex items-center gap-4">
                                    <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
                                        <div
                                            className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                                            style={{
                                                width: `${percentualConcluido}%`,
                                            }}
                                        />
                                    </div>

                                    <span className="text-lg font-bold text-emerald-700">
                                        {percentualConcluido}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 p-5 sm:p-6">
                            <h2 className="text-lg font-bold text-slate-900">
                                Detalhamento das denúncias
                            </h2>
                        </div>

                        {denunciasFiltradas.length === 0 ? (
                            <div className="p-8 text-center text-sm text-slate-500">
                                Nenhum registro encontrado para os filtros selecionados.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[650px] text-left text-sm">
                                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                                        <tr>
                                            <th className="px-5 py-4 font-semibold">
                                                Denúncia
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Categoria
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Data
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Situação
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {denunciasFiltradas.map((denuncia) => {
                                            const situacao = interpretarStatus(
                                                String(denuncia.status)
                                            );

                                            const corStatus =
                                                situacao === "Concluídas"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : situacao === "Em andamento"
                                                      ? "bg-blue-100 text-blue-700"
                                                      : "bg-amber-100 text-amber-700";

                                            return (
                                                <tr
                                                    key={denuncia.id}
                                                    className="transition hover:bg-slate-50"
                                                >
                                                    <td className="max-w-xs px-5 py-4">
                                                        <p className="truncate font-semibold text-slate-800">
                                                            {denuncia.titulo}
                                                        </p>
                                                        <p className="mt-1 text-xs text-slate-400">
                                                            #{denuncia.id}
                                                        </p>
                                                    </td>

                                                    <td className="px-5 py-4 text-slate-600">
                                                        {denuncia.categoria}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                                                        {denuncia.data}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${corStatus}`}
                                                        >
                                                            {situacao}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
