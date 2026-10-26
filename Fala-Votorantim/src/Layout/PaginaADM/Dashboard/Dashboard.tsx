import { useMemo } from "react";

import MenuLateralADM from "../../../Components/Cards/menuLateral/MenuLateralADM";

import { denunciasIniciais } from "../../../Layout/FeedDenuncias/dadosDenuncias";

import type { Denuncia } from "../../../Layout/FeedDenuncias/types";

function normalizar(texto: string): string {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
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

function identificarStatus(status: string): "pendente" | "andamento" | "concluida" | "outro" {
    const valor = normalizar(status);

    if (
        valor.includes("pendente") ||
        valor.includes("aguardando")
    ) {
        return "pendente";
    }

    if (
        valor.includes("andamento") ||
        valor.includes("analise") ||
        valor.includes("encaminhada") ||
        valor.includes("encaminhado")
    ) {
        return "andamento";
    }

    if (
        valor.includes("conclu") ||
        valor.includes("resolvid") ||
        valor.includes("finaliz")
    ) {
        return "concluida";
    }

    return "outro";
}

function formatarData(data: string): string {
    const [dataParte, horaParte] = data.split(", ");

    return horaParte
        ? `${dataParte} às ${horaParte}`
        : dataParte;
}

function CartaoIndicador({
    titulo,
    valor,
    descricao,
}: {
    titulo: string;
    valor: number;
    descricao: string;
}) {
    return (
        <article className="rounded-xl border border-[#D9E4F5] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-[#6A7282]">
                        {titulo}
                    </p>

                    <p className="mt-3 text-3xl font-bold text-[#1E2939]">
                        {valor}
                    </p>
                </div>

                <div
                    className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"}
                    aria-hidden="true"
                >
                </div>
            </div>

            <p className="mt-3 text-xs text-[#6A7282]">
                {descricao}
            </p>
        </article>
    );
}

export default function Dashboard() {
    const indicadores = useMemo(() => {
        const pendentes = denunciasIniciais.filter(
            (denuncia) =>
                identificarStatus(denuncia.status) === "pendente"
        ).length;

        const andamento = denunciasIniciais.filter(
            (denuncia) =>
                identificarStatus(denuncia.status) === "andamento"
        ).length;

        const concluidas = denunciasIniciais.filter(
            (denuncia) =>
                identificarStatus(denuncia.status) === "concluida"
        ).length;

        const categorias = denunciasIniciais.reduce<
            Record<string, number>
        >((acumulado, denuncia) => {
            const categoria = denuncia.categoria || "Sem categoria";

            acumulado[categoria] =
                (acumulado[categoria] || 0) + 1;

            return acumulado;
        }, {});

        const status = denunciasIniciais.reduce<
            Record<string, number>
        >((acumulado, denuncia) => {
            const nomeStatus = denuncia.status || "Sem status";

            acumulado[nomeStatus] =
                (acumulado[nomeStatus] || 0) + 1;

            return acumulado;
        }, {});

        const recentes = [...denunciasIniciais]
            .sort(
                (a, b) =>
                    converterData(b.data) - converterData(a.data)
            )
            .slice(0, 5);

        return {
            total: denunciasIniciais.length,
            pendentes,
            andamento,
            concluidas,
            categorias: Object.entries(categorias).sort(
                (a, b) => b[1] - a[1]
            ),
            status: Object.entries(status).sort(
                (a, b) => b[1] - a[1]
            ),
            recentes,
        };
    }, []);

    const maiorQuantidadeCategoria = Math.max(
        1,
        ...indicadores.categorias.map(([, quantidade]) => quantidade)
    );

    return (
        <div className="flex min-h-screen bg-[#EFF6FF]">
            <MenuLateralADM />

            <main className="min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-6 md:pt-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-7">

                    <header>
                        <p className="text-sm font-medium text-[#155DFC]">
                            Administração
                        </p>

                        <h1 className="mt-1 text-2xl font-bold text-[#1E2939] sm:text-3xl">
                            Dashboard
                        </h1>
                    </header>

                    <section>
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-[#1E2939]">
                                Visão geral
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <CartaoIndicador
                                titulo="Total de denúncias"
                                valor={indicadores.total}
                                descricao="Todos os registros disponíveis"
                            />

                            <CartaoIndicador
                                titulo="Pendentes"
                                valor={indicadores.pendentes}
                                descricao="Aguardando atendimento"
                            />

                            <CartaoIndicador
                                titulo="Em andamento"
                                valor={indicadores.andamento}
                                descricao="Em análise ou atendimento"
                            />

                            <CartaoIndicador
                                titulo="Concluídas"
                                valor={indicadores.concluidas}
                                descricao="Resolvidas ou finalizadas"
                            />
                        </div>
                    </section>

                    <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                       
                        <article className="rounded-xl border border-[#D9E4F5] bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-[#1E2939]">
                                    Denúncias por categoria
                                </h2>
                            </div>

                            {indicadores.categorias.length === 0 ? (
                                <p className="py-8 text-center text-sm text-[#6A7282]">
                                    Nenhuma denúncia cadastrada.
                                </p>
                            ) : (
                                <div className="flex flex-col gap-5">
                                    {indicadores.categorias.map(
                                        ([categoria, quantidade]) => (
                                            <div key={categoria}>
                                                <div className="mb-2 flex items-center justify-between gap-3">
                                                    <span className="text-sm font-medium text-[#364153]">
                                                        {categoria}
                                                    </span>

                                                    <span className="text-sm font-semibold text-[#1E2939]">
                                                        {quantidade}
                                                    </span>
                                                </div>

                                                <div
                                                    className="h-2.5 overflow-hidden rounded-full bg-[#E9F0FF]"
                                                    role="progressbar"
                                                    aria-label={`Denúncias da categoria ${categoria}`}
                                                    aria-valuemin={0}
                                                    aria-valuemax={maiorQuantidadeCategoria}
                                                    aria-valuenow={quantidade}
                                                >
                                                    <div
                                                        className="h-full rounded-full bg-[#155DFC] transition-all"
                                                        style={{
                                                            width: `${(quantidade / maiorQuantidadeCategoria) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </article>

                        <article className="rounded-xl border border-[#D9E4F5] bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-[#1E2939]">
                                    Situação das denúncias
                                </h2>
                            </div>

                            <div className="flex flex-col gap-3">
                                {indicadores.status.length === 0 ? (
                                    <p className="py-8 text-center text-sm text-[#6A7282]">
                                        Nenhuma situação disponível.
                                    </p>
                                ) : (
                                    indicadores.status.map(
                                        ([status, quantidade]) => {
                                            const grupo = identificarStatus(status);

                                            const estilo =
                                                grupo === "pendente"
                                                    ? "bg-amber-100 text-amber-800"
                                                    : grupo === "andamento"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : grupo === "concluida"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-700";

                                            const percentual =
                                                indicadores.total > 0
                                                    ? (quantidade / indicadores.total) * 100
                                                    : 0;

                                            return (
                                                <div
                                                    key={status}
                                                    className="rounded-lg border border-[#E5EAF3] p-4"
                                                >
                                                    <div className="flex items-center justify-between gap-3">
                                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${estilo}`}>
                                                            {status}
                                                        </span>

                                                        <span className="text-lg font-bold text-[#1E2939]">
                                                            {quantidade}
                                                        </span>
                                                    </div>

                                                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EDF1F7]">
                                                        <div
                                                            className="h-full rounded-full bg-[#155DFC]"
                                                            style={{
                                                                width: `${percentual}%`,
                                                            }}
                                                        />
                                                    </div>

                                                    <p className="mt-2 text-right text-xs text-[#6A7282]">
                                                        {percentual.toFixed(1)}% do total
                                                    </p>
                                                </div>
                                            );
                                        }
                                    )
                                )}
                            </div>
                        </article>
                    </section>

                    <section className="overflow-hidden rounded-xl border border-[#D9E4F5] bg-white shadow-sm">
                        <div className="flex flex-col gap-2 border-b border-[#E5EAF3] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <div>
                                <h2 className="text-lg font-semibold text-[#1E2939]">
                                    Denúncias recentes
                                </h2>
                            </div>

                            <span className="w-fit rounded-full bg-[#E9F0FF] px-3 py-1 text-xs font-semibold text-[#1447E6]">
                                {indicadores.recentes.length} registros
                            </span>
                        </div>

                        {indicadores.recentes.length === 0 ? (
                            <p className="p-8 text-center text-sm text-[#6A7282]">
                                Nenhuma denúncia cadastrada até o momento.
                            </p>
                        ) : (
                            <div className="divide-y divide-[#E5EAF3]">
                                {indicadores.recentes.map(
                                    (denuncia: Denuncia) => {
                                        const grupo = identificarStatus(
                                            denuncia.status
                                        );

                                        const estilo =
                                            grupo === "pendente"
                                                ? "bg-amber-100 text-amber-800"
                                                : grupo === "andamento"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : grupo === "concluida"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-700";

                                        return (
                                            <article
                                                key={denuncia.id}
                                                className="flex flex-col gap-3 p-5 transition-colors hover:bg-[#F8FAFF] sm:flex-row sm:items-center sm:justify-between sm:px-6"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-xs font-semibold text-[#155DFC]">
                                                            {denuncia.id}
                                                        </span>

                                                        <span className="text-xs text-[#99A1AF]">
                                                            {formatarData(denuncia.data)}
                                                        </span>
                                                    </div>

                                                    <h3 className="mt-1 font-semibold text-[#1E2939]">
                                                        {denuncia.titulo}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-[#6A7282]">
                                                        {denuncia.categoria}
                                                        {" · "}
                                                        {denuncia.endereco}
                                                    </p>
                                                </div>

                                                <span className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${estilo}`}>
                                                    {denuncia.status}
                                                </span>
                                            </article>
                                        );
                                    }
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
