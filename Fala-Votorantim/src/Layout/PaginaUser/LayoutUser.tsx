import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import MenuLateralUser from "../../Components/Cards/menuLateral/MenuLateralUser";
import useNavegacaoADM from "../../hooks/useNavegacaoADM";
import useSessao from "../../hooks/useSessao";
import useConta from "../../hooks/Cadastro/useConta";
import useNotificacoes from "../../hooks/Denuncias/notificacoes";

type LayoutUserProps = {
    titulo: string;
    subtitulo: string;
    children: ReactNode;
    // A página de notificações informa a contagem atualizada para o menu.
    naoLidasAtual?: number;
};

// Estrutura comum das páginas do munícipe: menu lateral, cabeçalho e bloqueio para quem não está logado.
export default function LayoutUser({ titulo, subtitulo, children, naoLidasAtual }: LayoutUserProps) {
    const { sessao } = useSessao();
    const { menuAberto, alternarMenu, fecharMenu } = useNavegacaoADM();
    const { naoLidas } = useNotificacoes(sessao?.email);
    const { sair } = useConta(sessao?.email);

    if (sessao?.perfil !== "usuario") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F5F8FF] px-4">
                <div className="max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center">
                    <h1 className="text-xl font-bold text-[#1E2939]">Acesso restrito</h1>
                    <p className="mt-2 text-sm text-[#4A5565]">
                        Entre com sua conta de munícipe para acessar esta página.
                    </p>
                    <NavLink
                        to="/Registro"
                        className="mt-6 inline-block rounded-lg bg-[#1447E6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#193CB8]"
                    >
                        Entrar ou criar conta
                    </NavLink>
                </div>
            </main>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#F5F8FF]">
            <MenuLateralUser
                nome={sessao.nome}
                naoLidas={naoLidasAtual ?? naoLidas}
                menuAberto={menuAberto}
                onAlternar={alternarMenu}
                onFechar={fecharMenu}
                onSair={sair}
            />

            <main className="min-w-0 flex-1 px-4 pb-10 pt-20 sm:px-6 lg:ml-64 lg:px-10 lg:pt-8">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
                    <header className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-[#1E2939] sm:text-3xl">{titulo}</h1>
                        <p className="text-sm text-[#155DFC] sm:text-base">{subtitulo}</p>
                    </header>
                    {children}
                </div>
            </main>
        </div>
    );
}
