import { NavLink } from "react-router-dom";
import logo from "./../../../assets/marrom.png";

type MenuLateralADMProps = {
    menuAberto: boolean;
    onAlternar: () => void;
    onFechar: () => void;
};

const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center rounded-lg px-3 py-2.5 text-sm transition-colors ${
        isActive
            ? "bg-[#1447E6] font-medium text-white"
            : "text-blue-100 hover:bg-[#1447E6] hover:text-white"
    }`;

export default function MenuLateralADM({
    menuAberto,
    onAlternar,
    onFechar,
}: MenuLateralADMProps) {
    return (
        <>
            <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center gap-3 bg-[#193CB8] px-4 text-white shadow-md lg:hidden">
                <button
                    type="button"
                    aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                    aria-expanded={menuAberto}
                    aria-controls="menu-lateral-adm"
                    onClick={onAlternar}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    {menuAberto ? (
                        <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <path d="m6 6 12 12M18 6 6 18" />
                        </svg>
                    ) : (
                        <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>

                <img
                    src={logo}
                    alt=""
                    className="h-10 w-10 object-contain"
                />
                <span className="truncate text-base font-bold">
                    Fala Votorantim
                </span>
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
                id="menu-lateral-adm"
                aria-label="Navegação administrativa"
                className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[min(18rem,85vw)] flex-col overflow-y-auto bg-[#193CB8] text-white shadow-lg transition-transform duration-200 lg:w-64 lg:translate-x-0 ${
                    menuAberto
                        ? "visible translate-x-0"
                        : "invisible -translate-x-full lg:visible lg:translate-x-0"
                }`}
            >
                <div className="flex items-center gap-3 px-5 py-6">
                    <img
                        src={logo}
                        alt="Logo Fala Votorantim"
                        className="h-12 w-12 object-contain"
                    />
                    <h2 className="text-lg font-bold leading-tight text-white">
                        Fala Votorantim
                    </h2>
                </div>

                <hr className="mx-4 border-blue-400/40" />

                <nav className="flex-1 space-y-3 px-3 py-4">
                    <details open className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-[#1447E6] [&::-webkit-details-marker]:hidden">
                            <span>Administração</span>
                            <svg
                                className="h-4 w-4 transition-transform group-open:rotate-180"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </summary>

                        <div className="ml-2 mt-2 space-y-1 border-l border-blue-400/40 pl-2">
                            <NavLink
                                to="/adm/TelaInicial"
                                end
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Início
                            </NavLink>
                            <NavLink
                                to="/adm/Dashboard"
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/adm/FeedDenuncias"
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Feed de Denúncias
                            </NavLink>
                            <NavLink
                                to="/adm/CadastroDenuncias"
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Cadastro de Denúncias
                            </NavLink>
                            <NavLink
                                to="/adm/DenunciasPrioritarias"
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Denúncias Prioritárias
                            </NavLink>
                            <NavLink
                                to="/adm/RelatoriosEstatisticas"
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Relatórios e Estatísticas
                            </NavLink>
                        </div>
                    </details>

                    <hr className="border-blue-400/40" />

                    <details open className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-[#1447E6] [&::-webkit-details-marker]:hidden">
                            <span>Páginas institucionais</span>
                            <svg
                                className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </summary>

                        <div className="ml-2 mt-2 space-y-1 border-l border-blue-400/40 pl-2">
                            <NavLink
                                to="/"
                                end
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Página Inicial
                            </NavLink>
                            <NavLink
                                to="/sobre"
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Sobre Nós
                            </NavLink>
                        </div>
                    </details>

                    <hr className="border-blue-400/40" />

                    <details open className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-[#1447E6] [&::-webkit-details-marker]:hidden">
                            <span>Sistema</span>
                            <svg
                                className="h-4 w-4 transition-transform group-open:rotate-180"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </summary>

                        <div className="ml-2 mt-2 space-y-1 border-l border-blue-400/40 pl-2">
                            <NavLink
                                to="/adm/UsuariosPermissoes"
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Usuários e Permissões
                            </NavLink>
                            <NavLink
                                to="/adm/Configuracoes"
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Configurações
                            </NavLink>
                            <NavLink
                                to="/Registro"
                                className={linkClass}
                                onClick={onFechar}
                            >
                                Sair
                            </NavLink>
                        </div>
                    </details>
                </nav>
            </aside>
        </>
    );
}
