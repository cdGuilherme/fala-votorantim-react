// Painel do ADM: mostra a denúncia completa e permite alterar o status.

import { useEffect, useState } from "react";
import type { Denuncia, Status } from "./types";
import { corStatus, estilosStatus, imagemDenuncia, statusDisponiveis } from "./dadosDenuncias";

type DetalheDenunciaProps = {
    denuncia: Denuncia;
    onFechar: () => void;
    onAlterarStatus: (id: string, status: Status) => boolean;
};

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

export default function DetalheDenuncia({
    denuncia,
    onFechar,
    onAlterarStatus,
}: DetalheDenunciaProps) {
    const [novoStatus, setNovoStatus] = useState<Status>(denuncia.status);
    const [mensagem, setMensagem] = useState("");

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

    function salvar() {
        const ok = onAlterarStatus(denuncia.id, novoStatus);
        setMensagem(ok ? "Status atualizado com sucesso." : "Não foi possível salvar o status.");
    }

    const isImagem = denuncia.anexoDataUrl?.startsWith("data:image/");

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
                    {!isImagem && (
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
                        <Campo titulo="Número" valor={denuncia.numero} />
                        <Campo titulo="Complemento" valor={denuncia.complemento} />
                        <Campo titulo="CEP" valor={denuncia.cep} />
                        <Campo titulo="Registrada em" valor={denuncia.data} />
                        <div className="sm:col-span-2">
                            <Campo titulo="Resultado esperado" valor={denuncia.resultadoEsperado} />
                        </div>
                    </dl>

                    {denuncia.anexoDataUrl && (
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#99A1AF]">
                                Anexo
                            </p>
                            {isImagem ? (
                                <img
                                    src={denuncia.anexoDataUrl}
                                    alt={denuncia.anexoNome ?? "Anexo da denúncia"}
                                    className="w-full rounded-xl border border-[#E5E7EB] object-cover"
                                />
                            ) : (
                                <a
                                    href={denuncia.anexoDataUrl}
                                    download={denuncia.anexoNome}
                                    className="text-sm font-semibold text-[#1447E6] hover:underline"
                                >
                                    Baixar {denuncia.anexoNome ?? "anexo"}
                                </a>
                            )}
                        </div>
                    )}
                </div>

                {/* Alteração de status */}
                <footer className="sticky bottom-0 mt-auto border-t border-[#E5E7EB] bg-white px-6 py-5">
                    <fieldset>
                        <legend className="mb-3 text-sm font-semibold text-[#1E2939]">
                            Alterar status
                        </legend>
                        <div className="grid grid-cols-3 gap-2">
                            {statusDisponiveis.map((status) => (
                                <label
                                    key={status}
                                    className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-center text-sm font-medium transition ${
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
                                            setMensagem("");
                                        }}
                                        className="sr-only"
                                    />
                                    {status}
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <div className="mt-4 flex items-center justify-between gap-3">
                        <p role="status" className={`text-sm ${mensagem.startsWith("Não") ? "text-[#C10007]" : "text-[#0D542B]"}`}>
                            {mensagem}
                        </p>
                        <button
                            type="button"
                            onClick={salvar}
                            disabled={novoStatus === denuncia.status}
                            className="rounded-lg bg-[#1447E6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193CB8] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Salvar alteração
                        </button>
                    </div>
                </footer>
            </aside>
        </div>
    );
}
