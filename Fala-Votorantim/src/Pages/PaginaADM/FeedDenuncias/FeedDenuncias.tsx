
import { useMemo, useState } from "react";

type Status = "Pendente" | "Em andamento" | "Resolvido";

type Denuncia = {
	id: string;
	titulo: string;
	categoria: string;
	descricao: string;
	endereco: string;
	data: string;
	status: Status;
};

const categoriasAgrupadas = [
	{
		titulo: "Problemas de infraestrutura urbana",
		itens: [
			"Buracos",
			"Calçadas danificadas",
			"Sinalização quebrada",
		],
	},
	{
		titulo: "Problemas de iluminação pública",
		itens: [
			"Postes apagados",
			"Falta de iluminação",
			"Problemas elétricos urbanos",
		],
	},
	{
		titulo: "Problemas de limpeza urbana",
		itens: [
			"Lixo acumulado",
			"Entulho irregular",
			"Terrenos abandonados",
		],
	},
	{
		titulo: "Problemas de vazamentos e saneamento",
		itens: [
			"Vazamentos de água",
			"Esgoto",
			"Problemas em vias públicas",
		],
	},
];

const statusDisponiveis: Status[] = [
	"Pendente",
	"Em andamento",
	"Resolvido",
];

const denunciasIniciais: Denuncia[] = [
	{
		id: "2255510",
		titulo: "Buraco grande na rua das Florestas",
		categoria: "Buracos",
		descricao:
			"Buraco profundo causando risco de acidentes para veículos e pedestres. O problema existe há mais de 2 semanas.",
		endereco: "Rua das Flores, 123, Centro",
		data: "10/05/2024, 14:30",
		status: "Em andamento",
	},
	{
		id: "2024051402",
		titulo: "Poste apagado na avenida",
		categoria: "Postes apagados",
		descricao:
			"Poste sem iluminação há mais de uma semana, deixando a rua escura e perigosa durante a noite.",
		endereco: "Avenida Principal, 456, Jardim América",
		data: "08/05/2024, 09:15",
		status: "Resolvido",
	},
	{
		id: "2024051403",
		titulo: "Lixo acumulado na esquina",
		categoria: "Lixo acumulado",
		descricao:
			"Acúmulo de lixo na esquina há 4 dias. A coleta não está passando regularmente.",
		endereco: "Rua Santos Dumont, 789, Vila Nova",
		data: "12/05/2024, 16:45",
		status: "Pendente",
	},
];

const estilosStatus: Record<Status, string> = {
	Pendente: "border-yellow-300 bg-yellow-50 text-yellow-600",
	"Em andamento": "border-blue-200 bg-blue-50 text-blue-600",
	Resolvido: "border-green-200 bg-green-50 text-green-600",
};

export default function FeedDenunciasADM() {
	const [denuncias] = useState<Denuncia[]>(denunciasIniciais);
	const [busca, setBusca] = useState("");

	const [mostrarFiltros, setMostrarFiltros] = useState(false);

	const [categoriasSelecionadas, setCategoriasSelecionadas] =
		useState<string[]>([]);

	const [statusSelecionados, setStatusSelecionados] =
		useState<Status[]>([]);

	const total = denuncias.length;

	const pendentes = denuncias.filter(
		(d) => d.status === "Pendente"
	).length;

	const andamento = denuncias.filter(
		(d) => d.status === "Em andamento"
	).length;

	const resolvidas = denuncias.filter(
		(d) => d.status === "Resolvido"
	).length;


	const filtradas = useMemo(() => {
		return denuncias.filter((d) => {
			const termo = busca.toLowerCase().trim();

			const correspondeBusca =
				!termo ||
				d.titulo.toLowerCase().includes(termo) ||
				d.id.toLowerCase().includes(termo) ||
				d.descricao.toLowerCase().includes(termo) ||
				d.endereco.toLowerCase().includes(termo);

			const correspondeCategoria =
				categoriasSelecionadas.length === 0 ||
				categoriasSelecionadas.includes(d.categoria);

			const correspondeStatus =
				statusSelecionados.length === 0 ||
				statusSelecionados.includes(d.status);

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


	const cards = [
		{
			titulo: "Total",
			valor: total,
			cor: "border-gray-300",
			numero: "text-gray-400",
		},
		{
			titulo: "Pendentes",
			valor: pendentes,
			cor: "border-yellow-400",
			numero: "text-yellow-500",
		},
		{
			titulo: "Em andamento",
			valor: andamento,
			cor: "border-blue-500",
			numero: "text-blue-600",
		},
		{
			titulo: "Resolvidas",
			valor: resolvidas,
			cor: "border-green-400",
			numero: "text-green-500",
		},
	];

	return (
		<main className="min-h-screen bg-[#EFF6FF] px-4 py-8 sm:px-8 lg:px-[8vw]">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-5">

				{/* Cabeçalho */}
				<header className="flex flex-col gap-1">
					<h1 className="text-3xl font-bold text-[#1E2939]">
						Admin
					</h1>

					<p className="pl-1 text-base text-[#6A7282]">
						Feed de Denúncias
					</p>
				</header>

				{/* Resumo das denúncias */}
				<section
					aria-label="Resumo das denúncias"
					className="grid grid-cols-2 gap-3 sm:grid-cols-4"
				>
					{cards.map((card) => (
						<div
							key={card.titulo}
							className={`flex min-h-[88px] flex-col justify-between rounded-xl border-b-4 border-l-4 bg-white p-4 shadow-sm ${card.cor}`}
						>
							<span
								className={`text-2xl font-semibold ${card.numero}`}
							>
								{card.valor}
							</span>

							<span className="text-sm text-[#6A7282]">
								{card.titulo}
							</span>
						</div>
					))}
				</section>

				{/* Filtros */}
				<section className="flex flex-col gap-3 rounded-xl border border-[#A0AEC0] bg-white p-4">
					<h2 className="text-lg font-semibold text-[#1E2939]">
						Filtros
					</h2>


					{/* Busca e botão de filtros */}
					<div className="flex items-center gap-2">
						<input
							type="search"
							value={busca}
							onChange={(e) => setBusca(e.target.value)}
							placeholder="Buscar denúncia..."
							aria-label="Buscar denúncia"
							className="min-w-0 flex-1 rounded-xl border border-[#A0AEC0] bg-white px-3 py-3 text-base text-[#1E2939] outline-none placeholder:text-[#98A2B3] focus:border-[#1447E6] focus:ring-2 focus:ring-blue-100"
						/>

						<button
							type="button"
							onClick={() => setMostrarFiltros((atual) => !atual)}
							aria-label={mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
							aria-expanded={mostrarFiltros}
							title={mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
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

					{/* Opções extras aparecem somente quando solicitado */}
					{mostrarFiltros && (
						<div className="flex flex-col gap-5">
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
																onChange={(e) => {
																	setCategoriasSelecionadas((atual) =>
																		e.target.checked
																			? [...atual, item]
																			: atual.filter((c) => c !== item)
																	);
																}}
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
													onChange={(e) => {
														setStatusSelecionados((atual) =>
															e.target.checked
																? [...atual, item]
																: atual.filter((s) => s !== item)
														);
													}}
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
								onClick={() => {
									setBusca("");
									setCategoriasSelecionadas([]);
									setStatusSelecionados([]);
								}}
								className="self-start rounded-lg border border-[#A0AEC0] px-4 py-2 text-sm font-medium text-[#364152] transition hover:bg-gray-50"
							>
								Limpar filtros
							</button>
						</div>
					)}
				</section>

				{/* Lista de denúncias */}
				<section
					aria-label="Lista de denúncias"
					className="flex flex-col gap-3 rounded-xl border border-[#A0AEC0] bg-white p-3 sm:p-4"
				>
					{filtradas.length > 0 ? (
						filtradas.map((denuncia) => (
							<article
								key={denuncia.id}
								className={`flex flex-col gap-2 rounded-xl border-2 p-4 transition-shadow hover:shadow-sm sm:p-5 ${denuncia.status === "Em andamento"
									? "border-blue-200 bg-blue-50"
									: denuncia.status === "Resolvido"
										? "border-green-200 bg-green-50"
										: "border-yellow-200 bg-yellow-50"
									}`}
							>
								{/* Código e status */}
								<div className="flex flex-wrap items-center gap-2">
									<span className="rounded-full border border-[#C7CDD6] bg-white px-3 py-1.5 text-sm text-[#273449]">
										#{denuncia.id}
									</span>

									<span
										className={`rounded-full border px-3 py-1.5 text-sm ${estilosStatus[denuncia.status]}`}
									>
										{denuncia.status}
									</span>
								</div>

								{/* Título */}
								<h3 className="text-xl font-medium leading-snug text-[#1E2939]">
									{denuncia.titulo}
								</h3>

								{/* Categoria */}
								<div>
									<span className="inline-block rounded-full border border-[#C7CDD6] bg-white px-3 py-1.5 text-sm text-[#273449]">
										{denuncia.categoria}
									</span>
								</div>

								{/* Descrição */}
								<p className="text-base leading-relaxed text-[#364152]">
									{denuncia.descricao}
								</p>

								{/* Local e data */}
								<div className="flex flex-col gap-1">
									<p className="text-sm text-[#6A7282]">
										{denuncia.endereco}
									</p>

									<p className="text-sm text-[#6A7282]">
										{denuncia.data}
									</p>
								</div>
							</article>
						))
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
			</div>
		</main>
	);
}
