import { NavLink } from "react-router-dom";
import LayoutUser from "../LayoutUser";
import ResumoDenuncias from "../../FeedDenuncias/ResumoDenuncias";
import useSessao from "../../../hooks/useSessao";
import useDenuncias from "../../../hooks/Denuncias/useDenuncias";
import useNotificacoes from "../../../hooks/Denuncias/notificacoes";

const atalhos = [
    { to: "/CadastroDenuncia", titulo: "Cadastrar denúncia", texto: "Registre um problema com endereço, descrição e foto.", icone: "M12 5v14M5 12h14" },
    { to: "/users/MinhasDenuncias", titulo: "Acompanhar denúncias", texto: "Veja o andamento das suas denúncias e das que você salvou.", icone: "M3 12h4l3 8 4-16 3 8h4" },
    { to: "/users/FeedDenunciasUser", titulo: "Feed de denúncias", texto: "Pesquise, favorite e salve denúncias da cidade.", icone: "M4 6h16M4 12h16M4 18h10" },
    { to: "/users/MeusDados", titulo: "Meus dados", texto: "Altere seus dados, sua senha ou desative a conta.", icone: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0" },
];

export default function TelaInicialUser() {
    const { sessao } = useSessao();
    const { denuncias } = useDenuncias();
    const { notificacoes } = useNotificacoes(sessao?.email);
    const minhas = denuncias.filter((d) => d.autorEmail === sessao?.email);

    return (
        <LayoutUser
            titulo={`Olá${sessao?.nome ? `, ${sessao.nome.split(" ")[0]}` : ""}!`}
            subtitulo="Área do munícipe"
        >
            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-[#1E2939]">Suas denúncias</h2>
                <ResumoDenuncias denuncias={minhas} />
            </section>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {atalhos.map((atalho) => (
                    <NavLink
                        key={atalho.to}
                        to={atalho.to}
                        className="group flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#BEDBFF] hover:shadow-lg hover:shadow-[#1447E6]/5"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#1447E6]">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d={atalho.icone} />
                            </svg>
                        </span>
                        <span className="font-semibold text-[#1E2939]">{atalho.titulo}</span>
                        <span className="text-sm leading-relaxed text-[#4A5565]">{atalho.texto}</span>
                    </NavLink>
                ))}
            </section>

            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-[#1E2939]">Últimas notificações</h2>
                    <NavLink to="/users/notificacoes" className="text-sm font-semibold text-[#1447E6] hover:underline">
                        Ver todas
                    </NavLink>
                </div>
                {notificacoes.length === 0 ? (
                    <p className="text-sm text-[#6A7282]">
                        Você ainda não tem notificações. Quando a prefeitura atualizar uma denúncia sua, o aviso aparece aqui.
                    </p>
                ) : (
                    <ul className="divide-y divide-[#F3F4F6]">
                        {notificacoes.slice(0, 3).map((n) => (
                            <li key={n.id} className="flex items-start gap-3 py-3">
                                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.lida ? "bg-[#D1D5DC]" : "bg-[#1447E6]"}`} />
                                <div>
                                    <p className="text-sm font-semibold text-[#1E2939]">{n.titulo}</p>
                                    <p className="text-sm text-[#4A5565]">{n.mensagem}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </LayoutUser>
    );
}
