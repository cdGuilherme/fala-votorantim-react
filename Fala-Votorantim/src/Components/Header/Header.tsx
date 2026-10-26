
import { NavLink } from "react-router-dom";

const links = [
	{ link: "/", label: "Início" },
	{ link: "/Sobre", label: "Sobre nós" },
	{ link: "/Feed", label: "Feed de denúncias" },
	{ link: "/Registro", label: "Acessar" },
];

export default function Header() {
	return (
		<header className="relative z-50 w-full bg-linear-to-r from-[#1447E6] to-[#193CB8]">
			<div className="mx-5 flex min-h-[10vh] items-center justify-between">
				<div className="flex items-center gap-5">
					<NavLink to="/">
						<img
							src="/Logo.png"
							alt="Logo do Fala Votorantim"
							className="h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12"
						/>
					</NavLink>

					<h1 className="hidden text-white md:inline-block">
						Fala Votorantim
					</h1>
				</div>

				<nav className="hidden items-center gap-4 md:flex lg:gap-8">
					{links.map((dado) => (
						<NavLink
							to={dado.link}
							end={dado.link === "/"}
							className={({ isActive }) =>
								`flex h-10 items-center justify-center rounded-md px-4 text-white transition ${isActive
									? "bg-[#155DFC]"
									: "bg-[#1447E6] hover:bg-[#155DFC]"
								}`
							}
							key={dado.link}
						>
							{dado.label}
						</NavLink>
					))}
				</nav>

				<div className="md:hidden text-white">
					Hamburguer
				</div>
			</div>
		</header>
	);
}
