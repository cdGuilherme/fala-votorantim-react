
import NavegacaoADM from "../NavegacaoADM";
import CampoTexto from "../../../Components/Campos/CampoTexto";
import Interruptor from "../../../Components/Botoes/Interruptor";
import SecaoConfiguracao from "../../../Components/Cards/Configuracoes/SecaoConfiguracao";
import useConfiguracoes from "../../../hooks/Configuracoes/useConfiguracoes";

export default function Configuracoes() {
    const {
        configuracoes,
        salvo,
        mensagem,
        mensagemSucesso,
        atualizarCampo,
        salvarConfiguracoes,
        restaurarPadrao,
    } = useConfiguracoes();

    return (
        <div className="min-h-screen bg-slate-50">
            <NavegacaoADM />

            <main className="min-w-0 px-4 pb-10 pt-20 sm:px-6 lg:ml-64 lg:px-8 lg:pt-8">
                <div className="mx-auto max-w-5xl space-y-6">
                    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                                Configurações
                            </h1>
                        </div>

                        <div className="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 sm:self-auto">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${
                                    salvo ? "bg-emerald-500" : "bg-amber-500"
                                }`}
                            />

                            <span className="text-xs font-medium text-slate-600">
                                {salvo ? "Tudo salvo" : "Alterações não salvas"}
                            </span>
                        </div>
                    </header>

                    <nav className="flex gap-2 overflow-x-auto pb-1">
                        <a
                            href="#gerais"
                            className="shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
                        >
                            Gerais
                        </a>

                        <a
                            href="#notificacoes"
                            className="shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
                        >
                            Notificações
                        </a>

                        <a
                            href="#preferencias"
                            className="shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
                        >
                            Preferências
                        </a>

                        <a
                            href="#conta"
                            className="shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
                        >
                            Conta administrativa
                        </a>
                    </nav>

                    <SecaoConfiguracao
                        id="gerais"
                        titulo="Configurações gerais"
                    >
                        <CampoTexto
                            id="nomeSistema"
                            label="Nome do sistema"
                            value={configuracoes.nomeSistema}
                            placeholder="Nome da plataforma"
                            onChange={(valor) =>
                                atualizarCampo("nomeSistema", valor)
                            }
                        />

                        <CampoTexto
                            id="descricaoSistema"
                            label="Descrição do sistema"
                            value={configuracoes.descricaoSistema}
                            placeholder="Descreva a finalidade do sistema"
                            onChange={(valor) =>
                                atualizarCampo("descricaoSistema", valor)
                            }
                        />

                        <CampoTexto
                            id="emailContato"
                            label="E-mail de contato institucional"
                            type="email"
                            value={configuracoes.emailContato}
                            placeholder="contato@exemplo.com.br"
                            descricao="Endereço de referência para contato com a instituição."
                            onChange={(valor) =>
                                atualizarCampo("emailContato", valor)
                            }
                        />
                    </SecaoConfiguracao>

                    <SecaoConfiguracao
                        id="notificacoes"
                        titulo="Notificações"
                    >
                        <div className="divide-y divide-slate-100">
                            <Interruptor
                                titulo="Novas denúncias"
                                descricao="Habilitar a preferência para receber avisos sobre novos registros."
                                ativo={configuracoes.notificacoesNovas}
                                onChange={(valor) =>
                                    atualizarCampo("notificacoesNovas", valor)
                                }
                            />

                            <Interruptor
                                titulo="Denúncias prioritárias"
                                descricao="Habilitar a preferência para avisos sobre ocorrências prioritárias."
                                ativo={configuracoes.notificacoesPrioritarias}
                                onChange={(valor) =>
                                    atualizarCampo("notificacoesPrioritarias", valor)
                                }
                            />

                            <Interruptor
                                titulo="Atualizações de status"
                                descricao="Habilitar a preferência para avisos de mudanças na situação das denúncias."
                                ativo={configuracoes.notificacoesStatus}
                                onChange={(valor) =>
                                    atualizarCampo("notificacoesStatus", valor)
                                }
                            />
                        </div>

                        <p className="rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                            Estes controles salvam suas preferências. O envio de
                            notificações reais depende de uma integração futura.
                        </p>
                    </SecaoConfiguracao>

                    <SecaoConfiguracao
                        id="preferencias"
                        titulo="Preferências da interface"
                    >
                        <div className="divide-y divide-slate-100">
                            <Interruptor
                                titulo="Confirmar ações"
                                descricao="Indicar a preferência por confirmação antes de ações importantes."
                                ativo={configuracoes.confirmarAcoes}
                                onChange={(valor) =>
                                    atualizarCampo("confirmarAcoes", valor)
                                }
                            />

                            <Interruptor
                                titulo="Modo compacto"
                                descricao="Guardar sua preferência por uma interface mais compacta."
                                ativo={configuracoes.modoCompacto}
                                onChange={(valor) =>
                                    atualizarCampo("modoCompacto", valor)
                                }
                            />
                        </div>

                        <p className="rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
                            Por enquanto, os controles guardam as preferências.
                            Para alterar o espaçamento da interface inteira, será
                            necessário aplicar essas opções aos demais componentes.
                        </p>
                    </SecaoConfiguracao>

                    <SecaoConfiguracao
                        id="conta"
                        titulo="Conta administrativa"
                    >
                        <CampoTexto
                            id="nomeAdministrador"
                            label="Nome do administrador"
                            value={configuracoes.nomeAdministrador}
                            placeholder="Digite seu nome"
                            onChange={(valor) =>
                                atualizarCampo("nomeAdministrador", valor)
                            }
                        />

                        <CampoTexto
                            id="emailAdministrador"
                            label="E-mail administrativo"
                            type="email"
                            value={configuracoes.emailAdministrador}
                            placeholder="admin@exemplo.com.br"
                            descricao="Este campo não altera o e-mail utilizado na autenticação."
                            onChange={(valor) =>
                                atualizarCampo("emailAdministrador", valor)
                            }
                        />
                    </SecaoConfiguracao>

                    {mensagem && (
                        <div
                            role="status"
                            className={`rounded-lg border p-4 text-sm ${
                                mensagemSucesso
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                    : "border-red-200 bg-red-50 text-red-800"
                            }`}
                        >
                            {mensagem}
                        </div>
                    )}

                    <footer className="sticky bottom-0 z-10 -mx-4 flex flex-col gap-3 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:-mx-8 lg:px-8">
                        <button
                            type="button"
                            onClick={restaurarPadrao}
                            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Restaurar padrão
                        </button>

                        <button
                            type="button"
                            onClick={salvarConfiguracoes}
                            disabled={salvo}
                            className="rounded-lg bg-[#1447E6] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#193CB8] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Salvar configurações
                        </button>
                    </footer>
                </div>
            </main>
        </div>
    );
}
