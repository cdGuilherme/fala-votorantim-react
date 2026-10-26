// Busca, botão para expandir filtros, categorias, status e limpeza dos filtros.


import {
	categoriasAgrupadas,
	statusDisponiveis,
} from "./dadosDenuncias";
import type { Status } from "./types";

type FiltrosDenunciasProps = {
	busca: string;
	onBuscaChange: (valor: string) => void;

	mostrarFiltros: boolean;
	onToggleFiltros: () => void;

	categoriasSelecionadas: string[];
	onCategoriasChange: (categorias: string[]) => void;

	statusSelecionados: Status[];
	onStatusChange: (status: Status[]) => void;

	dataInicial: string;
	onDataInicialChange: (data: string) => void;

	dataFinal: string;
	onDataFinalChange: (data: string) => void;

	onLimparFiltros: () => void;

	ordemData: "recentes" | "antigas";
	onOrdemDataChange: (ordem: "recentes" | "antigas") => void;
};

export default function FiltrosDenuncias({
	busca,
	onBuscaChange,
	mostrarFiltros,
	onToggleFiltros,
	categoriasSelecionadas,
	onCategoriasChange,
	statusSelecionados,
	onStatusChange,
	dataInicial,
	onDataInicialChange,
	dataFinal,
	onDataFinalChange,
	onLimparFiltros,
	ordemData,
	onOrdemDataChange,
}: FiltrosDenunciasProps) {
	function alternarCategoria(
		categoria: string,
		selecionada: boolean
	) {
		if (selecionada) {
			onCategoriasChange([
				...categoriasSelecionadas,
				categoria,
			]);
		} else {
			onCategoriasChange(
				categoriasSelecionadas.filter(
					(item) => item !== categoria
				)
			);
		}
	}

	function alternarStatus(
		status: Status,
		selecionado: boolean
	) {
		if (selecionado) {
			onStatusChange([...statusSelecionados, status]);
		} else {
			onStatusChange(
				statusSelecionados.filter(
					(item) => item !== status
				)
			);
		}
	}

	return (
		<section className="flex flex-col gap-3 rounded-xl border border-[#A0AEC0] bg-white p-4">
			<h2 className="text-lg font-semibold text-[#1E2939]">
				Filtros
			</h2>

			{/* Busca e botão para expandir filtros */}
			<div className="flex items-center gap-2">
				<input
					type="search"
					value={busca}
					onChange={(e) => onBuscaChange(e.target.value)}
					placeholder="Buscar denúncia..."
					aria-label="Buscar denúncia"
					className="min-w-0 flex-1 rounded-xl border border-[#A0AEC0] bg-white px-3 py-3 text-base text-[#1E2939] outline-none placeholder:text-[#98A2B3] focus:border-[#1447E6] focus:ring-2 focus:ring-blue-100"
				/>

				<button
					type="button"
					onClick={onToggleFiltros}
					aria-label={
						mostrarFiltros
							? "Ocultar filtros"
							: "Mostrar filtros"
					}
					aria-expanded={mostrarFiltros}
					title={
						mostrarFiltros
							? "Ocultar filtros"
							: "Mostrar filtros"
					}
					className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition ${mostrarFiltros
						? "border-[#1447E6] bg-blue-50 text-[#1447E6]"
						: "border-[#A0AEC0] bg-white text-[#364152] hover:bg-gray-50"
						}`}
				>
					<svg
						width="21"
						height="21"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="M4 7h16" />
						<path d="M7 12h10" />
						<path d="M10 17h4" />
					</svg>
				</button>
			</div>

			{/* Filtros adicionais */}
			{mostrarFiltros && (
				<div className="flex flex-col gap-5">

					{/* Ordenação por data */}
					<div className="flex flex-col gap-2">
						<label
							htmlFor="ordem-data"
							className="text-sm font-medium text-[#364152]"
						>
							Ordenar por data
						</label>

						<select
							id="ordem-data"
							value={ordemData}
							onChange={(e) =>
								onOrdemDataChange(
									e.target.value as "recentes" | "antigas"
								)
							}
							className="w-full rounded-lg border border-[#A0AEC0] bg-white px-3 py-2 text-sm text-[#1E2939] outline-none focus:border-[#1447E6] focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
						>
							<option value="recentes">
								Mais recentes primeiro
							</option>
							<option value="antigas">
								Mais antigas primeiro
							</option>
						</select>
					</div>

					{/* Período */}
					<fieldset className="rounded-xl border border-[#D0D5DD] p-4">
						<legend className="px-2 text-base font-semibold text-[#1E2939]">
							Período da denúncia
						</legend>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<label className="flex flex-col gap-2 text-sm font-medium text-[#364152]">
								Data inicial
								<input
									type="date"
									value={dataInicial}
									max={dataFinal || undefined}
									onChange={(e) =>
										onDataInicialChange(e.target.value)
									}
									className="w-full rounded-lg border border-[#A0AEC0] bg-white px-3 py-2 text-sm outline-none focus:border-[#1447E6] focus:ring-2 focus:ring-blue-100"
								/>
							</label>

							<label className="flex flex-col gap-2 text-sm font-medium text-[#364152]">
								Data final
								<input
									type="date"
									value={dataFinal}
									min={dataInicial || undefined}
									onChange={(e) =>
										onDataFinalChange(e.target.value)
									}
									className="w-full rounded-lg border border-[#A0AEC0] bg-white px-3 py-2 text-sm outline-none focus:border-[#1447E6] focus:ring-2 focus:ring-blue-100"
								/>
							</label>
						</div>
					</fieldset>

					<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						{/* Categorias */}
						<fieldset className="min-w-0 rounded-xl border border-[#D0D5DD] p-4">
							<legend className="px-2 text-base font-semibold text-[#1E2939]">
								Categorias
							</legend>

							<div className="flex flex-col gap-4">
								{categoriasAgrupadas.map((grupo) => (
									<div key={grupo.titulo}>
										<p className="mb-2 text-sm font-semibold text-[#667085]">
											{grupo.titulo}
										</p>

										<div className="flex flex-col gap-2">
											{grupo.itens.map((item) => (
												<label
													key={item}
													className="flex cursor-pointer items-start gap-2 text-sm text-[#364152]"
												>
													<input
														type="checkbox"
														checked={categoriasSelecionadas.includes(item)}
														onChange={(e) =>
															alternarCategoria(
																item,
																e.target.checked
															)
														}
														className="mt-0.5 accent-[#1447E6]"
													/>
													<span>{item}</span>
												</label>
											))}
										</div>
									</div>
								))}
							</div>
						</fieldset>

						{/* Status */}
						<fieldset className="min-w-0 rounded-xl border border-[#D0D5DD] p-4">
							<legend className="px-2 text-base font-semibold text-[#1E2939]">
								Status
							</legend>

							<div className="flex flex-col gap-3">
								{statusDisponiveis.map((item) => (
									<label
										key={item}
										className="flex cursor-pointer items-center gap-2 text-sm text-[#364152]"
									>
										<input
											type="checkbox"
											checked={statusSelecionados.includes(item)}
											onChange={(e) =>
												alternarStatus(item, e.target.checked)
											}
											className="accent-[#1447E6]"
										/>
										<span>{item}</span>
									</label>
								))}
							</div>
						</fieldset>
					</div>

					{/* Limpar filtros */}
					<button
						type="button"
						onClick={onLimparFiltros}
						className="self-start rounded-lg border border-[#A0AEC0] px-4 py-2 text-sm font-medium text-[#364152] transition hover:bg-gray-50"
					>
						Limpar filtros
					</button>
				</div>
			)}
		</section>
	);
}
