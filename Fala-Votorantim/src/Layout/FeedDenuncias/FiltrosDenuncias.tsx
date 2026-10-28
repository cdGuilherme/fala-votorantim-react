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
	onAlternarCategoria: (categoria: string, selecionada: boolean) => void;

	statusSelecionados: Status[];
	onAlternarStatus: (status: Status, selecionado: boolean) => void;

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
	onAlternarCategoria,
	statusSelecionados,
	onAlternarStatus,
	dataInicial,
	onDataInicialChange,
	dataFinal,
	onDataFinalChange,
	onLimparFiltros,
	ordemData,
	onOrdemDataChange,
}: FiltrosDenunciasProps) {
	return (
		<section className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">

			{/* Busca e botão para expandir filtros */}
			<div className="flex items-center gap-2">
				<input
					type="search"
					value={busca}
					onChange={(e) => onBuscaChange(e.target.value)}
					placeholder="Buscar por título, código, descrição ou endereço"
					aria-label="Buscar denúncia"
					className="min-w-0 flex-1 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-base text-[#1E2939] outline-none transition placeholder:text-[#99A1AF] focus:border-[#1447E6] focus:bg-white focus:ring-4 focus:ring-[#1447E6]/10"
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
						: "border-[#E5E7EB] bg-white text-[#364152] hover:bg-[#F9FAFB]"
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
				<div className="flex flex-col gap-5 border-t border-[#F3F4F6] pt-5">

					{/* Ordenação e período */}
					<div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
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
								className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#1E2939] outline-none focus:border-[#1447E6] focus:ring-4 focus:ring-[#1447E6]/10"
							>
								<option value="recentes">Mais recentes primeiro</option>
								<option value="antigas">Mais antigas primeiro</option>
							</select>
						</div>

						{/* Data inicial */}
						<label className="flex flex-col gap-2 text-sm font-medium text-[#364152]">
							Data inicial
							<input
								type="date"
								value={dataInicial}
								max={dataFinal || undefined}
								onChange={(e) => onDataInicialChange(e.target.value)}
								className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm outline-none focus:border-[#1447E6] focus:ring-4 focus:ring-[#1447E6]/10"
							/>
						</label>

						{/* Data final */}
						<label className="flex flex-col gap-2 text-sm font-medium text-[#364152]">
							Data final
							<input
								type="date"
								value={dataFinal}
								min={dataInicial || undefined}
								onChange={(e) => onDataFinalChange(e.target.value)}
								className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm outline-none focus:border-[#1447E6] focus:ring-4 focus:ring-[#1447E6]/10"
							/>
						</label>
					</div>

					<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						{/* Categorias */}
						<fieldset className="min-w-0 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
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
															onAlternarCategoria(
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
						<fieldset className="min-w-0 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
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
												onAlternarStatus(item, e.target.checked)
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
						className="self-start rounded-lg px-4 py-2 text-sm font-semibold text-[#1447E6] transition hover:bg-[#EFF6FF]"
					>
						Limpar filtros
					</button>
				</div>
			)}
		</section>
	);
}
