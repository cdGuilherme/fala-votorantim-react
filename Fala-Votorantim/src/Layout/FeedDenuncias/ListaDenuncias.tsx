// Exibir as denúncias filtradas ou a mensagem de lista vazia.


import { useEffect, useMemo, useState } from "react";

import type { Denuncia } from "./types";
import CardDenuncia from "./CardDenuncia";

type ListaDenunciasProps = {
	denuncias: Denuncia[];
};

const ITENS_POR_PAGINA_PADRAO = 10;


type ControlesPaginacaoProps = {
	paginaAtual: number;
	totalPaginas: number;
	quantidadePorPagina: string;
	totalDenuncias: number;
	inicio: number;
	fim: number;
	onPaginaChange: (pagina: number) => void;
	onQuantidadeChange: (quantidade: string) => void;
};

// Componente dos controles
function ControlesPaginacao({
	paginaAtual,
	totalPaginas,
	quantidadePorPagina,
	onPaginaChange,
	onQuantidadeChange,
}: ControlesPaginacaoProps) {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-3">
			<div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">

				<label className="flex items-center gap-2">
					Itens por página:
					<input
						type="number"
						min={1}
						step={1}
						value={quantidadePorPagina}
						onChange={(e) => onQuantidadeChange(e.target.value)}
						onBlur={() => {
							const valor = Number(quantidadePorPagina);
							onQuantidadeChange(
								Number.isInteger(valor) && valor > 0
									? String(valor)
									: "10"
							);
						}}
						className="w-16 rounded-md border border-gray-300 px-2 py-1 text-center"
					/>
				</label>
			</div>

			<div className="flex w-full items-center justify-center gap-2">
				<button
					type="button"
					onClick={() => onPaginaChange(paginaAtual - 1)}
					disabled={paginaAtual <= 1}
					className="rounded-md border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
				>
					Anterior
				</button>

				<span className="whitespace-nowrap text-sm text-gray-700">
					Página {paginaAtual} de {totalPaginas}
				</span>

				<button
					type="button"
					onClick={() => onPaginaChange(paginaAtual + 1)}
					disabled={paginaAtual >= totalPaginas}
					className="rounded-md border border-gray-300 px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
				>
					Próxima
				</button>
			</div>
		</div>
	);
}

export default function ListaDenuncias({
	denuncias,
}: ListaDenunciasProps) {
	const [paginaAtual, setPaginaAtual] = useState(1);

	const [quantidadePorPagina, setQuantidadePorPagina] =
		useState(String(ITENS_POR_PAGINA_PADRAO));

	const itensPorPagina = useMemo(() => {
		const quantidade = Number(quantidadePorPagina);

		if (
			!Number.isInteger(quantidade) ||
			quantidade < 1
		) {
			return ITENS_POR_PAGINA_PADRAO;
		}

		return quantidade;
	}, [quantidadePorPagina]);

	const totalPaginas = Math.ceil(
		denuncias.length / itensPorPagina
	);

	const denunciasPaginadas = useMemo(() => {
		const inicio = (paginaAtual - 1) * itensPorPagina;
		const fim = inicio + itensPorPagina;

		return denuncias.slice(inicio, fim);
	}, [denuncias, paginaAtual, itensPorPagina]);

	// Volta à primeira página quando a busca,
	// os filtros ou a quantidade por página mudam.
	useEffect(() => {
		setPaginaAtual(1);
	}, [denuncias, itensPorPagina]);

	// Evita permanecer em uma página que deixou de existir.
	useEffect(() => {
		if (totalPaginas > 0 && paginaAtual > totalPaginas) {
			setPaginaAtual(totalPaginas);
		}
	}, [paginaAtual, totalPaginas]);

	const primeiraDenuncia =
		denuncias.length === 0
			? 0
			: (paginaAtual - 1) * itensPorPagina + 1;

	const ultimaDenuncia = Math.min(
		paginaAtual * itensPorPagina,
		denuncias.length
	);

	function alterarQuantidadePorPagina(valor: string) {
		if (valor === "") {
			setQuantidadePorPagina("");
			return;
		}

		const quantidade = Number(valor);

		if (Number.isInteger(quantidade) && quantidade >= 1) {
			const limite = Math.max(denuncias.length, 1);

			setQuantidadePorPagina(
				String(Math.min(quantidade, limite))
			);
		}
	}

	// function normalizarQuantidadePorPagina() {
	// 	const quantidade = Number(quantidadePorPagina);

	// 	if (
	// 		quantidadePorPagina === "" ||
	// 		!Number.isInteger(quantidade) ||
	// 		quantidade < 1
	// 	) {
	// 		setQuantidadePorPagina(
	// 			String(ITENS_POR_PAGINA_PADRAO)
	// 		);
	// 	}
	// }

	return (
		<section
			aria-label="Lista de denúncias"
			className="flex flex-col gap-3 rounded-xl border border-[#A0AEC0] bg-white p-3 sm:p-4"
		>
			{/* Cabeçalho e quantidade por página */}
			<div className="flex flex-col gap-3 border-b border-gray-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-lg font-semibold text-[#1E2939]">
						Denúncias
					</h2>

					<p
						className="text-sm text-[#6A7282]"
						aria-live="polite"
					>
						{denuncias.length === 0
							? "Nenhuma denúncia encontrada"
							: `Exibindo ${primeiraDenuncia}–${ultimaDenuncia} de ${denuncias.length} denúncias`}
					</p>
				</div>

				{/* <div className="flex items-center gap-2">
					<label
						htmlFor="quantidade-por-pagina"
						className="text-sm text-[#364152]"
					>
						Por página:
					</label>

					<input
						id="quantidade-por-pagina"
						type="number"
						min={1}
						step={1}
						value={quantidadePorPagina}
						onChange={(e) =>
							alterarQuantidadePorPagina(e.target.value)
						}
						onBlur={normalizarQuantidadePorPagina}
						className="w-20 rounded-lg border border-[#A0AEC0] px-3 py-2 text-sm text-[#1E2939] outline-none focus:border-[#1447E6] focus:ring-2 focus:ring-blue-100"
					/>
				</div> */}
			</div>

			{/* Controles de paginação superiores */}
			{totalPaginas > 0 && (
				<ControlesPaginacao
					paginaAtual={paginaAtual}
					totalPaginas={totalPaginas}
					quantidadePorPagina={quantidadePorPagina}
					totalDenuncias={denuncias.length}
					inicio={primeiraDenuncia}
					fim={ultimaDenuncia}
					onPaginaChange={(pagina) => setPaginaAtual(pagina)}
					onQuantidadeChange={alterarQuantidadePorPagina}
				/>
			)}

			{/* Cards da página atual */}
			{denuncias.length > 0 ? (
				<>
					<div className="flex flex-col gap-3">
						{denunciasPaginadas.map((denuncia) => (
							<CardDenuncia
								key={denuncia.id}
								denuncia={denuncia}
							/>
						))}
					</div>

					{/* Controles de paginação */}
					{/* Controles de paginação inferiores */}
					{totalPaginas > 0 && (
						<ControlesPaginacao
							paginaAtual={paginaAtual}
							totalPaginas={totalPaginas}
							quantidadePorPagina={quantidadePorPagina}
							totalDenuncias={denuncias.length}
							inicio={primeiraDenuncia}
							fim={ultimaDenuncia}
							onPaginaChange={(pagina) => setPaginaAtual(pagina)}
							onQuantidadeChange={alterarQuantidadePorPagina}
						/>
					)}
				</>
			) : (
				<div className="px-4 py-10 text-center">
					<p className="text-lg font-medium text-[#1E2939]">
						Nenhuma denúncia encontrada
					</p>

					<p className="mt-2 text-base text-[#6A7282]">
						Tente alterar os filtros da pesquisa.
					</p>
				</div>
			)}
		</section>
	);
}
