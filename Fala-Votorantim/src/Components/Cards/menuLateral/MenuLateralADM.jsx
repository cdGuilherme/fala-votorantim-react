import logo from './../../../assets/marrom.png'
import {NavLink} from "react-router-dom";

export default function MenuLateralADM()
{

    const links = [
        { link: "/adm/TelaInicial", label: "Tela Início" },
        { link: "/adm/Dashboard", label: "Dashboard" },
        { link: "/adm/FeedDenuncias", label: "Feed de Denúncias" },
        { link: "/adm/CadastroDenuncias", label: "Cadastro de Denúncias" },
        { link: "/adm/DenunciasPrioritarias", label: "Denúncias Prioritárias" },
        { link: "/adm/RelatoriosEstatisticas", label: "Relatórios e Estatísticas" },
        { link: "/adm/UsuariosPermissoes", label: "Usuários e Permissões" },
        { link: "/adm/Configuracoes", label: "Configurações" }
    ];
    return(
        <aside className="w-64 min-h-screen bg-[#193CB8] text-white flex flex-col shrink-0 shadow-lg">
            
            {/* parte aonde fica a llogo e o Fala Votorantim*/}
            <div className="flex items-center gap-3 px-5 py-6">
                {/* imagem da logo */}
                <img src={logo} alt="Logo Fala Votorantim" className="w-12 h-12 object-contain" />

                <div className="flex flex-col">
                    <h2 className="text-lg font-bold leading-tight text">
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
                        
                        <NavLink to={'/adm/TelaInicial'}>
                            <a href="#" className="flex items-center px-3 py-2.5 rounded-lg bg-[#1447E6] font-medium text-sm">
                                Início
                            </a>
                        </NavLink>

                        <NavLink to={'/adm/Dashboard'}>
                            <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                                Dashboard
                            </a>
                        </NavLink>

                        <NavLink to={'/adm/FeedDenuncias'}>
                            <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                                Feed de Denúncias
                            </a>
                        </NavLink>

                        <NavLink to={'/adm/CadastroDenuncias'}>
                            <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                                Cadastro de Denúncias
                            </a>
                        </NavLink>

                        <NavLink to={'/adm/DenunciasPrioritarias'}>
                            <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                                Denúncias Prioritárias
                            </a>
                        </NavLink>

                        <NavLink to={'/adm/RelatoriosEstatisticas'}>
                            <a href="#" className="flex items-center px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                                Relatórios e Estatísticas
                            </a>
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

                        <a href="#" className="block px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Página Inicial
                        </a>

                        <a href="#" className="block px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                            Sobre Nós
                        </a>

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
                        
                        <NavLink to={'/adm/UsuariosPermissoes'}>
                            <a href="#" className="block px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                                Usuários e Permissões
                            </a>
                        </NavLink>

                        <NavLink to={'/adm/Configuracoes'}>
                            <a href="#" className="block px-3 py-2.5 rounded-lg text-sm text-blue-100 hover:bg-[#1447E6] hover:text-white transition-colors">
                                Configurações
                            </a>
                        </NavLink>

                        <a href="#" className="block px-3 py-2.5 rounded-lg text-sm text-red-200 hover:bg-red-500/20 hover:text-white transition-colors">
                            Sair
                        </a>

                    </div>
                </details>

            </nav>

        </aside>
    )
}