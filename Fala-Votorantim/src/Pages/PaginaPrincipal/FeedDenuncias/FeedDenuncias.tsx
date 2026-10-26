import { useMemo, useState } from "react";

import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";

import ResumoDenuncias from "../../../Layout/FeedDenuncias/ResumoDenuncias";
import FiltrosDenuncias from "../../../Layout/FeedDenuncias/FiltrosDenuncias";
import ListaDenuncias from "../../../Layout/FeedDenuncias/ListaDenuncias";

import { denunciasIniciais } from "../../../Layout/FeedDenuncias/dadosDenuncias";

import type {
  Denuncia,
  Status,
} from "../../../Layout/FeedDenuncias/types";

export default function Feed() {
  const [denuncias] = useState<Denuncia[]>(denunciasIniciais);

  const [busca, setBusca] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [categoriasSelecionadas, setCategoriasSelecionadas] =
    useState<string[]>([]);

  const [statusSelecionados, setStatusSelecionados] =
    useState<Status[]>([]);

  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");

  const [ordemData, setOrdemData] =
    useState<"recentes" | "antigas">("recentes");

  const filtradas = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    function converterData(data: string): number {
      const [dataParte, horaParte = "00:00"] = data.split(", ");
      const [dia, mes, ano] = dataParte.split("/").map(Number);
      const [hora, minuto] = horaParte.split(":").map(Number);

      return new Date(
        ano,
        mes - 1,
        dia,
        hora,
        minuto
      ).getTime();
    }

    const resultado = denuncias.filter((denuncia) => {
      const correspondeBusca =
        !termo ||
        denuncia.titulo.toLowerCase().includes(termo) ||
        denuncia.id.toLowerCase().includes(termo) ||
        denuncia.descricao.toLowerCase().includes(termo) ||
        denuncia.endereco.toLowerCase().includes(termo);

      const correspondeCategoria =
        categoriasSelecionadas.length === 0 ||
        categoriasSelecionadas.includes(denuncia.categoria);

      const correspondeStatus =
        statusSelecionados.length === 0 ||
        statusSelecionados.includes(denuncia.status);

      const partesData = denuncia.data.split(",")[0].split("/");

      const dataDenuncia =
        partesData.length === 3
          ? `${partesData[2]}-${partesData[1]}-${partesData[0]}`
          : "";

      const correspondeData =
        (!dataInicial ||
          (dataDenuncia !== "" && dataDenuncia >= dataInicial)) &&
        (!dataFinal ||
          (dataDenuncia !== "" && dataDenuncia <= dataFinal));

      return (
        correspondeBusca &&
        correspondeCategoria &&
        correspondeStatus &&
        correspondeData
      );
    });

    return resultado.sort((a, b) => {
      const diferenca = converterData(a.data) - converterData(b.data);

      return ordemData === "recentes" ? -diferenca : diferenca;
    });
  }, [
    denuncias,
    busca,
    categoriasSelecionadas,
    statusSelecionados,
    dataInicial,
    dataFinal,
    ordemData,
  ]);

  function limparFiltros() {
    setBusca("");
    setCategoriasSelecionadas([]);
    setStatusSelecionados([]);
    setDataInicial("");
    setDataFinal("");
    setOrdemData("recentes");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-[#EFF6FF] px-4 py-8 sm:px-8 lg:px-[8vw]">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
          {/* Cabeçalho do feed público */}
          <header className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-[#1E2939]">
              Feed de Denúncias
            </h1>

            <p className="pl-1 text-base text-[#6A7282]">
              Acompanhe as denúncias registradas em Votorantim.
            </p>
          </header>

          {/* Resumo das denúncias */}
          <ResumoDenuncias denuncias={denuncias} />

          {/* Filtros */}
          <FiltrosDenuncias
            busca={busca}
            onBuscaChange={setBusca}
            mostrarFiltros={mostrarFiltros}
            onToggleFiltros={() =>
              setMostrarFiltros((atual) => !atual)
            }
            categoriasSelecionadas={categoriasSelecionadas}
            onCategoriasChange={setCategoriasSelecionadas}
            statusSelecionados={statusSelecionados}
            onStatusChange={setStatusSelecionados}
            onLimparFiltros={limparFiltros}
            dataInicial={dataInicial}
            onDataInicialChange={setDataInicial}
            dataFinal={dataFinal}
            onDataFinalChange={setDataFinal}
            ordemData={ordemData}
            onOrdemDataChange={setOrdemData}
          />

          {/* Lista de denúncias filtradas */}
          <ListaDenuncias denuncias={filtradas} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
