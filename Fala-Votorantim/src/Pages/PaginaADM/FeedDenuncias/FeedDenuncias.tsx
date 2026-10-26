import { useMemo, useState } from "react";

import ResumoDenuncias from "../../../Layout/FeedDenuncias/ResumoDenuncias";
import FiltrosDenuncias from "../../../Layout/FeedDenuncias/FiltrosDenuncias";
import ListaDenuncias from "../../../Layout/FeedDenuncias/ListaDenuncias";

import { denunciasIniciais } from "../../../Layout/FeedDenuncias/dadosDenuncias";

import type { Denuncia, Status } from "../../../Layout/FeedDenuncias/types";

export default function FeedDenunciasADM() {
  const [denuncias] = useState<Denuncia[]>(denunciasIniciais);

  const [busca, setBusca] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [categoriasSelecionadas, setCategoriasSelecionadas] =
    useState<string[]>([]);

  const [statusSelecionados, setStatusSelecionados] =
    useState<Status[]>([]);

  const filtradas = useMemo(() => {
    return denuncias.filter((denuncia) => {
      const termo = busca.toLowerCase().trim();

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

      return (
        correspondeBusca &&
        correspondeCategoria &&
        correspondeStatus
      );
    });
  }, [
    denuncias,
    busca,
    categoriasSelecionadas,
    statusSelecionados,
  ]);

  function limparFiltros() {
    setBusca("");
    setCategoriasSelecionadas([]);
    setStatusSelecionados([]);
  }

  return (
    <main className="min-h-screen bg-[#EFF6FF] px-4 py-8 sm:px-8 lg:px-[8vw]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">

        {/* Cabeçalho exclusivo do administrador */}
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-[#1E2939]">
            Admin
          </h1>

          <p className="pl-1 text-base text-[#6A7282]">
            Feed de Denúncias
          </p>
        </header>

        {/* Componentes compartilhados */}
        <ResumoDenuncias denuncias={denuncias} />

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
        />

        <ListaDenuncias denuncias={filtradas} />
      </div>
    </main>
  );
}
