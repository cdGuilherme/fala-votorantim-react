import LayoutUser from "../LayoutUser";
import useSessao from "../../../hooks/useSessao";
import useNotificacoes from "../../../hooks/Denuncias/notificacoes";

// Caso de uso "Visualizar Notificações".

export default function Notificacoes() {
    const { sessao } = useSessao();
    const { notificacoes, naoLidas, marcarComoLida, marcarTodasComoLidas } =
        useNotificacoes(sessao?.email);

    return (
        <LayoutUser titulo="Notificações" subtitulo="Atualizações das suas denúncias" naoLidasAtual={naoLidas}>
            <div className="flex items-center justify-between">
                <p className="text-sm text-[#6A7282]">
                    {naoLidas === 0 ? "Nenhuma notificação nova" : `${naoLidas} ${naoLidas === 1 ? "notificação nova" : "notificações novas"}`}
                </p>
                {naoLidas > 0 && (
                    <button
                        type="button"
                        onClick={marcarTodasComoLidas}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-[#1447E6] transition hover:bg-[#EFF6FF]"
                    >
                        Marcar todas como lidas
                    </button>
                )}
            </div>

            {notificacoes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#D1D5DC] bg-white px-6 py-14 text-center">
                    <p className="text-lg font-semibold text-[#1E2939]">Nenhuma notificação</p>
                    <p className="mt-2 text-sm text-[#6A7282]">
                        Quando a prefeitura alterar o status de uma denúncia sua, você será avisado aqui.
                    </p>
                </div>
            ) : (
                <ul className="flex flex-col gap-3">
                    {notificacoes.map((n) => (
                        <li
                            key={n.id}
                            className={`flex items-start gap-4 rounded-2xl border bg-white p-5 ${n.lida ? "border-[#E5E7EB]" : "border-[#BEDBFF] shadow-sm shadow-[#1447E6]/5"}`}
                        >
                            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${n.lida ? "bg-[#F3F4F6] text-[#99A1AF]" : "bg-[#EFF6FF] text-[#1447E6]"}`}>
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9Zm4 13a2 2 0 0 0 4 0" />
                                </svg>
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-semibold text-[#1E2939]">{n.titulo}</p>
                                    {!n.lida && (
                                        <span className="rounded-full bg-[#1447E6] px-2 py-0.5 text-xs font-semibold text-white">Nova</span>
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-[#4A5565]">{n.mensagem}</p>
                                <p className="mt-2 text-xs text-[#99A1AF]">{n.data}</p>
                            </div>
                            {!n.lida && (
                                <button
                                    type="button"
                                    onClick={() => marcarComoLida(n.id)}
                                    className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1447E6] transition hover:bg-[#EFF6FF]"
                                >
                                    Marcar como lida
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </LayoutUser>
    );
}
