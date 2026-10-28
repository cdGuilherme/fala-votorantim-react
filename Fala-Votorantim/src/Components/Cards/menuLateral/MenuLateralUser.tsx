import { NavLink } from "react-router-dom";

type MenuLateralUserProps = {
    nome?: string;
    naoLidas: number;
    menuAberto: boolean;
    onAlternar: () => void;
    onFechar: () => void;
    onSair: () => void;
};

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
        isActive
            ? "bg-[#1447E6] font-medium text-white"
            : "text-blue-100 hover:bg-[#1447E6] hover:text-white"
    }`;

const links = [
    { to: "/users/TelaInicial", label: "Início" },
    { to: "/users/FeedDenunciasUser", label: "Feed de Denúncias" },
    { to: "/users/MinhasDenuncias", label: "Acompanhar Denúncias" },
    { to: "/CadastroDenuncia", label: "Cadastrar Denúncia" },
    { to: "/users/notificacoes", label: "Notificações" },
    { to: "/users/MeusDados", label: "Meus Dados" },
];

export default function MenuLateralUser({
    nome,
    naoLidas,
    menuAberto,
    onAlternar,
    onFechar,
    onSair,
}: MenuLateralUserProps) {
    const logo = `${import.meta.env.BASE_URL}simbolo-branco.svg`;

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center gap-3 bg-[#193CB8] px-4 text-white shadow-md lg:hidden">
                <button
                    type="button"
                    aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={menuAberto}
                    aria-controls="menu-lateral-user"
                    onClick={onAlternar}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d={menuAberto ? "m6 6 12 12M18 6 6 18" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
                <img src={logo} alt="" className="h-10 w-10 object-contain" />
                <span className="truncate text-base font-bold">Fala Votorantim</span>
            </header>

            {menuAberto && (
                <button
                    type="button"
                    aria-label="Fechar menu"
                    onClick={onFechar}
                    className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
                />
            )}

            <aside
                id="menu-lateral-user"
                aria-label="Navegação do munícipe"
                className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[min(18rem,85vw)] flex-col overflow-y-auto bg-[#193CB8] text-white shadow-lg transition-transform duration-200 lg:w-64 lg:translate-x-0 ${
                    menuAberto
                        ? "visible translate-x-0"
                        : "invisible -translate-x-full lg:visible lg:translate-x-0"
                }`}
            >
                <div className="flex items-center gap-3 px-5 py-6">
                    <img src={logo} alt="Logo Fala Votorantim" className="h-12 w-12 object-contain" />
                    <h2 className="text-lg font-bold leading-tight text-white">Fala Votorantim</h2>
                </div>

                {nome && (
                    <p className="mx-5 mb-4 rounded-lg bg-white/10 px-3 py-2 text-sm text-blue-100">
                        Olá, <span className="font-semibold text-white">{nome.split(" ")[0]}</span>
                    </p>
                )}

                <hr className="mx-4 border-blue-400/40" />

                <nav className="flex-1 space-y-1 px-3 py-4">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} className={linkClass} onClick={onFechar}>
                            {link.label}
                            {link.to === "/users/notificacoes" && naoLidas > 0 && (
                                <span className="rounded-full bg-white px-2 text-xs font-bold text-[#1447E6]">
                                    {naoLidas}
                                </span>
                            )}
                        </NavLink>
                    ))}

                    <hr className="!my-4 border-blue-400/40" />

                    <NavLink to="/" end className={linkClass} onClick={onFechar}>
                        Página Inicial
                    </NavLink>
                    <NavLink to="/Sobre" className={linkClass} onClick={onFechar}>
                        Sobre Nós
                    </NavLink>
                    <button
                        type="button"
                        onClick={onSair}
                        className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-blue-100 transition-colors hover:bg-[#1447E6] hover:text-white"
                    >
                        Sair
                    </button>
                </nav>
            </aside>
        </>
    );
}
