import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Mensagem } from "./Tipos";
import { getMockAIResponse } from "./CapivaraIa";

import Logo from './../../../public/simbolo-azul.svg'

export default function ChatWidget() {
    const [aberto, setAberto] = useState(false);
    const [mensagens, setMensagens] = useState<Mensagem[]>([
        {
            id: "boas-vindas",
            text: "Olá! Sou o assistente virtual do Fala Votorantim. Como posso ajudar você?",
            user: "bot",
            tempo: new Date(),
        },
    ]);

    const [entrada, setEntrada] = useState("");
    const [digitando, setDigitando] = useState(false);

    const fimMensagensRef = useRef<HTMLDivElement>(null);
    const temporizadorRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        fimMensagensRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [mensagens, digitando, aberto]);

    useEffect(() => {
        return () => {
            if (temporizadorRef.current) {
                clearTimeout(temporizadorRef.current);
            }
        };
    }, []);

    const enviarMensagem = (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const texto = entrada.trim();

        if (!texto || digitando) return;

        const mensagemUsuario: Mensagem = {
            id: crypto.randomUUID(),
            text: texto,
            user: "user",
            tempo: new Date(),
        };

        setMensagens((anteriores) => [...anteriores, mensagemUsuario]);

        setEntrada("");
        setDigitando(true);

        temporizadorRef.current = setTimeout(() => {
            const resposta: Mensagem = {
                id: crypto.randomUUID(),
                text: getMockAIResponse(texto),
                user: "bot",
                tempo: new Date(),
            };

            setMensagens((anteriores) => [...anteriores, resposta]);

            setDigitando(false);
            temporizadorRef.current = null;
        }, 900);
    };

    const formatarHorario = (data: Date) =>
        data.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <div className="fixed bottom-5 right-5 z-[100] font-sans sm:bottom-6 sm:right-6">
            {aberto && (
                <section aria-label="Assistente virtual do Fala Votorantim" className="mb-4 flex h-[min(600px,calc(100dvh-120px))] w-[calc(100vw-32px)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                    <header className="flex shrink-0 items-center justify-between bg-[#193CB8] px-4 py-4 text-white">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="min-w-0">
                                <h2 className="truncate font-bold">Assistente virtual</h2>
                            </div>
                        </div>

                        <button type="button" onClick={() => setAberto(false)} aria-label="Fechar chat" className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl text-white transition hover:bg-white/15">
                            ×
                        </button>
                    </header>

                    {/* Campo de mensagens */}
                    <div role="log" aria-live="polite" aria-label="Mensagens da conversa" className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
                        {mensagens.map((mensagem) => {
                            const mensagemUsuario = mensagem.user === "user";

                            return (
                                <div key={mensagem.id} className={`flex ${mensagemUsuario ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] ${mensagemUsuario ? "items-end" : "items-start"} flex flex-col`}>
                                        <div className={`whitespace-pre-wrap break-words rounded-2xl px-3.5 py-3 text-sm leading-6 ${mensagemUsuario ? "rounded-br-md bg-[#1447E6] text-white" : "rounded-bl-md border border-slate-200 bg-white text-slate-800 shadow-sm"}`}>
                                            {mensagem.text}
                                        </div>

                                        <span className="mt-1 px-1 text-[10px] text-slate-400">
                                            {formatarHorario(mensagem.tempo)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}

                        {digitando && (
                            <div className="flex justify-start">
                                <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm" aria-label="O assistente está digitando">
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={fimMensagensRef} />
                    </div>

                    {/* Sugestões de perguntas */}
                    {mensagens.length === 1 && (
                        <div className="shrink-0 border-t border-slate-100 bg-white px-3 pb-3 pt-3">
                            <p className="mb-2 text-xs font-semibold text-slate-500">Perguntas frequentes</p>

                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Como faço uma denúncia?",
                                    "Buraco na rua",
                                    "Como acompanhar?",
                                ].map((sugestao) => (
                                    <button key={sugestao} type="button" onClick={() => setEntrada(sugestao)} className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-50">
                                        {sugestao}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Campo de envio de mensagem */}
                    <form onSubmit={enviarMensagem} className="flex shrink-0 items-center gap-2 border-t border-slate-200 bg-white p-3">
                        <input type="text" value={entrada} onChange={(evento) => setEntrada(evento.target.value)} placeholder="Digite sua mensagem..." aria-label="Digite sua mensagem" maxLength={1000} disabled={digitando} className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:opacity-60" />

                        <button type="submit" disabled={!entrada.trim() || digitando} aria-label="Enviar mensagem" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1447E6] text-white transition hover:bg-[#193CB8] disabled:cursor-not-allowed disabled:opacity-40">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                                <path d="m22 2-7 20-4-9-9-4Z" />
                                <path d="M22 2 11 13" />
                            </svg>
                        </button>
                    </form>
                </section>
            )}

            {/* Botão flutuante */}
            <div className="flex justify-end">
                <button type="button" onClick={() => setAberto((anterior) => !anterior)} aria-label={aberto ? "Fechar assistente virtual" : "Abrir assistente virtual"} aria-expanded={aberto} className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-lg shadow-blue-900/25 transition duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200">
                    {aberto ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="#193CB8" strokeWidth="2" className="h-7 w-7" aria-hidden="true">
                            <path d="m18 6-12 12M6 6l12 12" />
                        </svg>
                    ) : (
                        <img src={Logo} alt="Logo Fala Votorantim" className="h-full w-full rounded-full object-contain" />
                    )}
                </button>
            </div>
        </div>
    );
}
