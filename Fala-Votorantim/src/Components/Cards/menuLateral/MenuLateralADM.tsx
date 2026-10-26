import logo from './../../../assets/marrom.png';
import { NavLink } from "react-router-dom";

export default function MenuLateralADM() {
    return (
        <aside className="w-64 min-h-screen bg-[#193CB8] text-white flex flex-col shrink-0 shadow-lg">
            
            {/* parte aonde fica a logo e o Fala Votorantim*/}
            <div className="flex items-center gap-3 px-5 py-6">
                {/* imagem da logo */}
                <img src={logo} alt="Logo Fala Votorantim" className="w-12 h-12 object-contain" />

                <div className="flex flex-col">
                    <h2 className="text-lg font-bold leading-tight">
                        Fala Votorantim
                    </h2>
                </div>
            </div>

            <hr className="border-blue-400/40 mx-4" />

            <nav className="flex-1 px-3 py-4 space-y-3">

                <details open className="group">
                    <summary className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer list-none font-semibold text-sm hover:bg-[#1447E6] transition-colors [&::-webkit-details-marker]:hidden">
                        <span>Administração</span>
                        <svg
                            className="w-4 h-4 transition-transform group-open:rotate-180"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </summary>

                    <div className="mt-2 ml-2 space-y-1 border-l border-blue-400/40 pl-2">
                        
                        <NavLink to='/adm/TelaInicial' className="flex items-center px-3 py-2.5 rounded-lg bg-[#1447E6] font-medium text-sm">
                            Início
                        </NavLink>

                        <NavLink to='/adm/Dashboard' className="flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Dashboard
                        </NavLink>

                        <NavLink to='/adm/FeedDenuncias' className="flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Feed de Denúncias
                        </NavLink>

                        <NavLink to='/adm/CadastroDenuncias' className="flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Cadastro de Denúncias
                        </NavLink>

                        <NavLink to='/adm/DenunciasPrioritarias' className="flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Denúncias Prioritárias
                        </NavLink>

                        <NavLink to='/adm/RelatoriosEstatisticas' className="flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Relatórios e Estatísticas
                        </NavLink>

                    </div>
                </details>

                <hr className="border-blue-400/40" />

                <details open className="group">
                    <summary className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer list-none font-semibold text-sm hover:bg-[#1447E6] transition-colors [&::-webkit-details-marker]:hidden">
                        <span>Páginas institucionais</span>
                        <svg
                            className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </summary>

                    <div className="mt-2 ml-2 space-y-1 border-l border-blue-400/40 pl-2">
                        <NavLink to='/' className="block px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Página Inicial
                        </NavLink>
                        <NavLink to='/sobre' className="block px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Sobre Nós
                        </NavLink>
                    </div>
                </details>

                <hr className="border-blue-400/40" />

                <details open className="group">
                    <summary className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer list-none font-semibold text-sm hover:bg-[#1447E6] transition-colors [&::-webkit-details-marker]:hidden">
                        <span>Sistema</span>
                        <svg
                            className="w-4 h-4 transition-transform group-open:rotate-180"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </summary>

                    <div className="mt-2 ml-2 space-y-1 border-l border-blue-400/40 pl-2">
                        
                        <NavLink to='/adm/UsuariosPermissoes' className="block px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Usuários e Permissões
                        </NavLink>

                        <NavLink to='/adm/Configuracoes' className="block px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Configurações
                        </NavLink>

                        <NavLink to='/logout' className="block px-3 py-2.5 rounded-lg text-sm text-red-200 hover:bg-red-500/20 hover:text-white transition-colors">
                            Sair
                        </NavLink>

                    </div>
                </details>

            </nav>

        </aside>
    );
}
