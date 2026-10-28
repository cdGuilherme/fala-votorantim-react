import { useState, type FormEvent } from "react";
import LayoutUser from "../LayoutUser";
import useSessao from "../../../hooks/useSessao";
import useConta from "../../../hooks/Cadastro/useConta";

// Casos de uso "Modificar conta", "Modificar senha" e "Desativar conta".

type Aviso = { ok: boolean; mensagem: string } | null;

const estiloCampo =
    "mt-1.5 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#1E2939] outline-none transition focus:border-[#1447E6] focus:ring-4 focus:ring-[#1447E6]/10 disabled:bg-[#F9FAFB] disabled:text-[#6A7282]";
const estiloRotulo = "text-sm font-medium text-[#364153]";

function Mensagem({ aviso }: { aviso: Aviso }) {
    if (!aviso) return null;
    return (
        <p role="status" className={`text-sm ${aviso.ok ? "text-[#0D542B]" : "text-[#C10007]"}`}>
            {aviso.mensagem}
        </p>
    );
}

export default function MeusDados() {
    const { sessao } = useSessao();
    const { usuario, atualizarDados, alterarSenha, desativarConta } = useConta(sessao?.email);

    const [nome, setNome] = useState(usuario?.nome ?? "");
    const [telefone, setTelefone] = useState(usuario?.telefone ?? "");
    const [avisoDados, setAvisoDados] = useState<Aviso>(null);

    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmacao, setConfirmacao] = useState("");
    const [avisoSenha, setAvisoSenha] = useState<Aviso>(null);

    const [confirmandoDesativar, setConfirmandoDesativar] = useState(false);
    const [avisoConta, setAvisoConta] = useState<Aviso>(null);

    function salvarDados(evento: FormEvent) {
        evento.preventDefault();
        setAvisoDados(atualizarDados(nome, telefone));
    }

    function salvarSenha(evento: FormEvent) {
        evento.preventDefault();
        const resultado = alterarSenha(senhaAtual, novaSenha, confirmacao);
        setAvisoSenha(resultado);
        if (resultado.ok) {
            setSenhaAtual("");
            setNovaSenha("");
            setConfirmacao("");
        }
    }

    return (
        <LayoutUser titulo="Meus Dados" subtitulo="Dados do usuário">
            {!usuario && (
                <p role="status" className="rounded-xl border border-[#FDE68A] bg-[#FEFCE8] p-3 text-sm text-[#A65F00]">
                    Não encontramos o cadastro desta conta neste navegador.
                </p>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                <form onSubmit={salvarDados} className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6">
                    <div>
                        <h2 className="text-lg font-semibold text-[#1E2939]">Informações pessoais</h2>
                        <p className="text-sm text-[#6A7282]">Atualize seu nome e telefone.</p>
                    </div>
                    <label className={estiloRotulo}>
                        Nome completo
                        <input value={nome} onChange={(e) => setNome(e.target.value)} className={estiloCampo} />
                    </label>
                    <label className={estiloRotulo}>
                        Telefone
                        <input value={telefone} onChange={(e) => setTelefone(e.target.value)} className={estiloCampo} />
                    </label>
                    <label className={estiloRotulo}>
                        E-mail
                        <input value={sessao?.email ?? ""} disabled className={estiloCampo} />
                    </label>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                        <Mensagem aviso={avisoDados} />
                        <button type="submit" disabled={!usuario} className="ml-auto rounded-lg bg-[#1447E6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193CB8] disabled:opacity-40">
                            Salvar dados
                        </button>
                    </div>
                </form>

                <form onSubmit={salvarSenha} className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6">
                    <div>
                        <h2 className="text-lg font-semibold text-[#1E2939]">Alterar senha</h2>
                        <p className="text-sm text-[#6A7282]">Use pelo menos 6 caracteres.</p>
                    </div>
                    <label className={estiloRotulo}>
                        Senha atual
                        <input type="password" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} autoComplete="current-password" className={estiloCampo} />
                    </label>
                    <label className={estiloRotulo}>
                        Nova senha
                        <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} autoComplete="new-password" className={estiloCampo} />
                    </label>
                    <label className={estiloRotulo}>
                        Confirmar nova senha
                        <input type="password" value={confirmacao} onChange={(e) => setConfirmacao(e.target.value)} autoComplete="new-password" className={estiloCampo} />
                    </label>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                        <Mensagem aviso={avisoSenha} />
                        <button type="submit" disabled={!usuario} className="ml-auto rounded-lg bg-[#1447E6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193CB8] disabled:opacity-40">
                            Alterar senha
                        </button>
                    </div>
                </form>
            </div>

            <section className="flex flex-col gap-4 rounded-2xl border border-[#FFC9C9] bg-[#FEF2F2] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-[#82181A]">Desativar conta</h2>
                    <p className="text-sm text-[#9F0712]">
                        Sua conta será desativada e você não poderá mais entrar com ela. As denúncias já registradas continuam no sistema.
                    </p>
                    <Mensagem aviso={avisoConta} />
                </div>
                {confirmandoDesativar ? (
                    <div className="flex shrink-0 gap-2">
                        <button type="button" onClick={() => setConfirmandoDesativar(false)} className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#364153] hover:bg-[#F9FAFB]">
                            Cancelar
                        </button>
                        <button type="button" onClick={() => setAvisoConta(desativarConta())} className="rounded-lg bg-[#C10007] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#9F0712]">
                            Confirmar desativação
                        </button>
                    </div>
                ) : (
                    <button type="button" disabled={!usuario} onClick={() => setConfirmandoDesativar(true)} className="shrink-0 rounded-lg border border-[#C10007] bg-white px-4 py-2.5 text-sm font-semibold text-[#C10007] hover:bg-[#FEF2F2] disabled:opacity-40">
                        Desativar conta
                    </button>
                )}
            </section>
        </LayoutUser>
    );
}
