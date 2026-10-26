import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
	{ link: "/", label: "Início" },
	{ link: "/Sobre", label: "Sobre nós" },
	{ link: "/Feed", label: "Feed de denúncias" },
	{ link: "/Registro", label: "Acessar" },
];

export default function Header() {
	const [menuAberto, setMenuAberto] = useState(false);

	return (
		<header className="relative z-50 w-full bg-gradient-to-r from-[#1447E6] to-[#193CB8]">
			<div className="mx-auto flex min-h-[10vh] items-center justify-between px-5">
				{/* Logo */}
				<NavLink to="/" className="shrink-0">
					<img
						src="/Logo.png"
						alt="Logo do Fala Votorantim"
						className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
					/>
				</NavLink>

				{/* Menu desktop */}
				<nav className="hidden items-center gap-4 md:flex lg:gap-8">
					{links.map((item) => (
						<NavLink
							key={item.link}
							to={item.link}
							end={item.link === "/"}
							className={({ isActive }) =>
								`flex h-10 items-center justify-center rounded-md px-4 text-white transition ${isActive
									? "bg-[#155DFC]"
									: "hover:bg-[#155DFC]"
								}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>

				{/* Botão mobile */}
				<button
					type="button"
					className="flex items-center justify-center rounded-md p-2 text-white transition hover:bg-white/10 md:hidden"
					onClick={() => setMenuAberto(!menuAberto)}
					aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
					aria-expanded={menuAberto}
				>
					{menuAberto ? (
						// Ícone X
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						>
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					) : (
						// Ícone hambúrguer
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						>
							<path d="M4 6h16" />
							<path d="M4 12h16" />
							<path d="M4 18h16" />
						</svg>
					)}
				</button>
			</div>

			{/* Links mobile */}
			{menuAberto && (
				<nav className="absolute left-0 top-full flex w-full flex-col gap-2 bg-[#193CB8] p-4 shadow-lg md:hidden">
					{links.map((item) => (
						<NavLink
							key={item.link}
							to={item.link}
							end={item.link === "/"}
							onClick={() => setMenuAberto(false)}
							className={({ isActive }) =>
								`rounded-md px-4 py-3 text-white transition ${isActive
									? "bg-[#155DFC]"
									: "hover:bg-[#155DFC]"
								}`
							}
						>
							{item.label}
						</NavLink>
					))}
				</nav>
			)}
		</header>
	);
}