import { useMemo, useState } from "react";

import ResumoDenuncias from "../../../Layout/FeedDenuncias/ResumoDenuncias";
import FiltrosDenuncias from "../../../Layout/FeedDenuncias/FiltrosDenuncias";
import ListaDenuncias from "../../../Layout/FeedDenuncias/ListaDenuncias";

import { denunciasIniciais } from "../../../Layout/FeedDenuncias/dadosDenuncias";

import type { Denuncia, Status } from "../../../Layout/FeedDenuncias/types";

export default function FeedDenunciasADM() {
	// Hoje, a página administrativa inicializa os dados assim:
	const [denuncias] = useState<Denuncia[]>(denunciasIniciais);
	// Isso é adequado para os dados de demonstração. Mas, quando houver backend, será necessário carregar os dados de forma assíncrona,
	// tratando estados como carregamento, erro e lista vazia.
	// Uma futura organização poderia ser:
	// src/
	// ├── Layout/
	// │   └── FeedDenuncias/
	// │       ├── CardDenuncia.tsx
	// │       ├── ListaDenuncias.tsx
	// │       ├── ResumoDenuncias.tsx
	// │       ├── FiltrosDenuncias.tsx
	// │       └── types.ts
	// ├── services/
	// │   └── denunciasService.ts
	// └── Pages/
	// 		├── PaginaADM/
	// 		└── PaginaUser/

	const [busca, setBusca] = useState("");
	const [mostrarFiltros, setMostrarFiltros] = useState(false);

	const [categoriasSelecionadas, setCategoriasSelecionadas] =
		useState<string[]>([]);

	const [statusSelecionados, setStatusSelecionados] =
		useState<Status[]>([]);

	const [dataInicial, setDataInicial] = useState("");
	const [dataFinal, setDataFinal] = useState("");

	const [ordemData, setOrdemData] = useState<"recentes" | "antigas">("recentes");


	const filtradas = useMemo(() => {
		const termo = busca.toLowerCase().trim();

		function converterData(data: string): number {
			// Converte "DD/MM/AAAA, HH:mm" para um timestamp.
			const [dataParte, horaParte = "00:00"] = data.split(", ");
			const [dia, mes, ano] = dataParte.split("/").map(Number);
			const [hora, minuto] = horaParte.split(":").map(Number);

			return new Date(ano, mes - 1, dia, hora, minuto).getTime();
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
					dataInicial={dataInicial}
					onDataInicialChange={setDataInicial}
					dataFinal={dataFinal}
					onDataFinalChange={setDataFinal}
					ordemData={ordemData}
					onOrdemDataChange={setOrdemData}
				/>

				<ListaDenuncias denuncias={filtradas} />
			</div>
		</main>
	);
}
