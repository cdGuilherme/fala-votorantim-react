// Painel com a denúncia completa e o histórico.
// Com "gestao" (ADM): alterar status, responder e encaminhar para outra secretaria.
// Sem "gestao" (munícipe): somente leitura.

import { useEffect, useState } from "react";
import type { Anexo, Denuncia, EventoHistorico, Status } from "./types";
import { corStatus, estilosStatus, imagemDenuncia, statusDisponiveis } from "./dadosDenuncias";

export type GestaoDenuncia = {
    secretarias: string[];
    onAlterarStatus: (id: string, status: Status) => boolean;
    onResponder: (id: string, texto: string) => boolean;
    onEncaminhar: (id: string, secretaria: string) => boolean;
};

type DetalheDenunciaProps = {
    denuncia: Denuncia;
    historico: EventoHistorico[];
    onFechar: () => void;
    gestao?: GestaoDenuncia;
};

type Aviso = { ok: boolean; texto: string } | null;

const rotuloEvento: Record<EventoHistorico["tipo"], string> = {
    status: "Status",
    resposta: "Resposta da prefeitura",
    encaminhamento: "Encaminhamento",
};

const estiloBloco = "flex flex-col gap-3 rounded-xl border border-[#E5E7EB] p-5";
const estiloBotao =
    "self-end rounded-lg bg-[#1447E6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193CB8] disabled:cursor-not-allowed disabled:opacity-40";

function Campo({ titulo, valor }: { titulo: string; valor?: string }) {
    if (!valor) return null;
    return (
        <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">
                {titulo}
            </dt>
            <dd className="mt-1 text-sm text-[#1E2939]">{valor}</dd>
        </div>
    );
}

function Mensagem({ aviso }: { aviso: Aviso }) {
    if (!aviso) return null;
    return (
        <p role="status" className={`text-sm ${aviso.ok ? "text-[#0D542B]" : "text-[#C10007]"}`}>
            {aviso.texto}
        </p>
    );
}

function anexosDa(denuncia: Denuncia): Anexo[] {
    if (denuncia.anexos?.length) return denuncia.anexos;
    if (denuncia.anexoDataUrl) {
        return [{ nome: denuncia.anexoNome ?? "Anexo", dataUrl: denuncia.anexoDataUrl }];
    }
    return [];
}

export default function DetalheDenuncia({
    denuncia,
    historico,
    onFechar,
    gestao,
}: DetalheDenunciaProps) {
    const [novoStatus, setNovoStatus] = useState<Status>(denuncia.status);
    const [avisoStatus, setAvisoStatus] = useState<Aviso>(null);
    const [resposta, setResposta] = useState("");
    const [avisoResposta, setAvisoResposta] = useState<Aviso>(null);
    const [secretaria, setSecretaria] = useState(denuncia.secretaria ?? "");
    const [avisoEncaminhar, setAvisoEncaminhar] = useState<Aviso>(null);

    // Fecha com Esc e trava a rolagem do fundo enquanto o painel está aberto.
    useEffect(() => {
        function aoTeclar(evento: KeyboardEvent) {
            if (evento.key === "Escape") onFechar();
        }
        document.addEventListener("keydown", aoTeclar);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", aoTeclar);
            document.body.style.overflow = "";
        };
    }, [onFechar]);

    const anexos = anexosDa(denuncia);
    const fotos = anexos.filter((anexo) => anexo.dataUrl.startsWith("data:image/"));

    function salvarStatus() {
        if (!gestao) return;
        const ok = gestao.onAlterarStatus(denuncia.id, novoStatus);
        setAvisoStatus({ ok, texto: ok ? "Status atualizado e munícipe notificado." : "Não foi possível salvar o status." });
    }

    function enviarResposta() {
        if (!gestao) return;
        if (!resposta.trim()) {
            setAvisoResposta({ ok: false, texto: "Escreva a resposta antes de enviar." });
            return;
        }
        const ok = gestao.onResponder(denuncia.id, resposta);
        setAvisoResposta({ ok, texto: ok ? "Resposta enviada ao munícipe." : "Não foi possível enviar a resposta." });
        if (ok) setResposta("");
    }

    function encaminhar() {
        if (!gestao) return;
        const ok = gestao.onEncaminhar(denuncia.id, secretaria);
        setAvisoEncaminhar({ ok, texto: ok ? "Denúncia encaminhada." : "Escolha uma secretaria diferente da atual." });
    }

    return (
        <div
            className="fixed inset-0 z-50 flex justify-end bg-[#1E2939]/50 backdrop-blur-sm"
            onClick={onFechar}
        >
            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-detalhe"
                className="flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl"
                onClick={(evento) => evento.stopPropagation()}
            >
                <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#E5E7EB] bg-white px-6 py-5">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#1447E6]">
                            Denúncia #{denuncia.id}
                        </p>
                        <h2 id="titulo-detalhe" className="mt-1 text-xl font-bold text-[#1E2939]">
                            {denuncia.titulo}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onFechar}
                        aria-label="Fechar detalhes"
                        className="rounded-lg p-2 text-[#6A7282] transition hover:bg-[#F3F4F6]"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="flex flex-col gap-6 px-6 py-6">
                    {/* Fotos enviadas, ou a ilustrativa da categoria */}
                    {fotos.length > 0 ? (
                        <div className={`grid gap-2 ${fotos.length > 1 ? "grid-cols-2" : ""}`}>
                            {fotos.map((foto, indice) => (
                                <img
                                    key={indice}
                                    src={foto.dataUrl}
                                    alt={foto.nome}
                                    className={`w-full rounded-xl border border-[#E5E7EB] object-cover ${fotos.length > 1 ? "aspect-square" : "max-h-72"}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <img
                            src={imagemDenuncia(denuncia)}
                            alt="Imagem ilustrativa da categoria"
                            className="h-56 w-full rounded-xl object-cover"
                        />
                    )}

                    <div className="flex flex-wrap gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${estilosStatus[denuncia.status]}`}>
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: corStatus[denuncia.status] }} />
                            {denuncia.status}
                        </span>
                        <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-medium text-[#364153]">
                            {denuncia.categoria}
                        </span>
                    </div>

                    <p className="leading-relaxed text-[#4A5565]">{denuncia.descricao}</p>

                    <dl className="grid gap-4 rounded-xl bg-[#F9FAFB] p-5 sm:grid-cols-2">
                        <Campo titulo="Endereço" valor={denuncia.endereco} />
                        <Campo titulo="Bairro" valor={denuncia.bairro} />
                        <Campo titulo="Registrada em" valor={denuncia.data} />
                        <Campo titulo="Secretaria responsável" valor={denuncia.secretaria} />
                        <div className="sm:col-span-2">
                            <Campo titulo="Resultado esperado" valor={denuncia.resultadoEsperado} />
                        </div>
                    </dl>

                    {/* Histórico: alterações de status, respostas e encaminhamentos */}
                    <section>
                        <h3 className="mb-3 text-sm font-semibold text-[#1E2939]">Histórico</h3>
                        {historico.length === 0 ? (
                            <p className="text-sm text-[#6A7282]">Nenhuma atualização registrada ainda.</p>
                        ) : (
                            <ol className="relative flex flex-col gap-4 border-l-2 border-[#E5E7EB] pl-5">
                                {[...historico].reverse().map((evento, indice) => (
                                    <li key={indice} className="relative">
                                        <span
                                            className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white ${
                                                evento.tipo === "resposta" ? "bg-[#1447E6]" : evento.tipo === "encaminhamento" ? "bg-[#9810FA]" : "bg-[#99A1AF]"
                                            }`}
                                        />
                                        <p className="text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">
                                            {rotuloEvento[evento.tipo]} · {evento.data}
                                        </p>
                                        <p className={`mt-1 text-sm ${evento.tipo === "resposta" ? "rounded-lg bg-[#EFF6FF] p-3 text-[#1C398E]" : "text-[#364153]"}`}>
                                            {evento.texto}
                                        </p>
                                        <p className="mt-1 text-xs text-[#6A7282]">{evento.responsavel}</p>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </section>

                    {gestao && (
                        <>
                            {/* Alterar status */}
                            <fieldset className={estiloBloco}>
                                <legend className="px-1 text-sm font-semibold text-[#1E2939]">Alterar status</legend>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {statusDisponiveis.map((status) => (
                                        <label
                                            key={status}
                                            className={`flex cursor-pointer items-center justify-center rounded-lg border px-2 py-2.5 text-center text-sm font-medium transition ${
                                                novoStatus === status
                                                    ? estilosStatus[status]
                                                    : "border-[#E5E7EB] text-[#4A5565] hover:bg-[#F9FAFB]"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="status"
                                                value={status}
                                                checked={novoStatus === status}
                                                onChange={() => {
                                                    setNovoStatus(status);
                                                    setAvisoStatus(null);
                                                }}
                                                className="sr-only"
                                            />
                                            {status}
                                        </label>
                                    ))}
                                </div>
                                <Mensagem aviso={avisoStatus} />
                                <button type="button" onClick={salvarStatus} disabled={novoStatus === denuncia.status} className={estiloBotao}>
                                    Salvar status
                                </button>
                            </fieldset>

                            {/* Responder denúncia */}
                            <div className={estiloBloco}>
                                <label htmlFor="resposta" className="text-sm font-semibold text-[#1E2939]">
                                    Responder ao munícipe
                                </label>
                                <textarea
                                    id="resposta"
                                    rows={3}
                                    value={resposta}
                                    onChange={(e) => {
                                        setResposta(e.target.value);
                                        setAvisoResposta(null);
                                    }}
                                    placeholder="Ex.: A equipe de manutenção foi acionada e deve atender o local nesta semana."
                                    className="w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-sm text-[#1E2939] outline-none focus:border-[#1447E6] focus:ring-4 focus:ring-[#1447E6]/10"
                                />
                                <Mensagem aviso={avisoResposta} />
                                <button type="button" onClick={enviarResposta} className={estiloBotao}>
                                    Enviar resposta
                                </button>
                            </div>

                            {/* Encaminhar para outra secretaria */}
                            <div className={estiloBloco}>
                                <label htmlFor="secretaria" className="text-sm font-semibold text-[#1E2939]">
                                    Encaminhar para outra secretaria
                                </label>
                                <select
                                    id="secretaria"
                                    value={secretaria}
                                    onChange={(e) => {
                                        setSecretaria(e.target.value);
                                        setAvisoEncaminhar(null);
                                    }}
                                    className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#1E2939] outline-none focus:border-[#1447E6] focus:ring-4 focus:ring-[#1447E6]/10"
                                >
                                    <option value="">Selecione a secretaria</option>
                                    {gestao.secretarias.map((nome) => (
                                        <option key={nome} value={nome}>{nome}</option>
                                    ))}
                                </select>
                                <Mensagem aviso={avisoEncaminhar} />
                                <button
                                    type="button"
                                    onClick={encaminhar}
                                    disabled={!secretaria || secretaria === denuncia.secretaria}
                                    className={estiloBotao}
                                >
                                    Encaminhar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </aside>
        </div>
    );
}
