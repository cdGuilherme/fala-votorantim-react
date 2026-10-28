import type { ContaAdministrativa } from "../../../../LoginADM/contasDemonstracao";
import "./../../../../Style/CadastroLogin.css";

type LoginProps = {
    email: string;
    senha: string;
    mensagem: string;
    mensagemSucesso: boolean;
    contasDemonstracao: ContaAdministrativa[];
    onEmailChange: (email: string) => void;
    onSenhaChange: (senha: string) => void;
    onSubmit: () => void;
};

function Login({
    email,
    senha,
    mensagem,
    mensagemSucesso,
    contasDemonstracao,
    onEmailChange,
    onSenhaChange,
    onSubmit,
}: LoginProps) {
    return (
        <form
            className="divLogin"
            onSubmit={(evento) => {
                evento.preventDefault();
                onSubmit();
            }}
        >
            <div className="iconeRegistro" />

            <h3>Bem-vindo de volta</h3>

            <label htmlFor="loginEmail">E-mail:</label>
            <input
                type="email"
                name="email"
                id="loginEmail"
                autoComplete="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(evento) => onEmailChange(evento.target.value)}
            />

            <label htmlFor="loginSenha">Senha:</label>
            <input
                type="password"
                name="senha"
                id="loginSenha"
                autoComplete="current-password"
                placeholder="Sua senha"
                required
                value={senha}
                onChange={(evento) => onSenhaChange(evento.target.value)}
            />

            {mensagem && (
                <p
                    role="status"
                    className={`rounded-lg px-3 py-2 text-sm ${
                        mensagemSucesso
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-red-50 text-red-800"
                    }`}
                >
                    {mensagem}
                </p>
            )}

            <button
                type="submit"
                className="btnEntrar"
                id="btnEntrar"
                onClick={onSubmit}
            >
                Entrar
            </button>

            <details className="mt-4 w-full text-left text-sm">
                <summary className="cursor-pointer font-semibold text-slate-700">
                    Acessos demonstrativos das secretarias
                </summary>
                <p className="mt-2 text-slate-600">
                    Senha compartilhada para demonstração:{" "}
                    <strong>Demo@2026</strong>
                </p>
                <ul className="mt-2 max-h-36 space-y-1 overflow-y-auto text-xs text-slate-600">
                    {contasDemonstracao.map((conta) => (
                        <li key={conta.email}>
                            {conta.secretaria}: {conta.email}
                        </li>
                    ))}
                </ul>
                <p className="mt-2 text-xs text-amber-700">
                    Contas fictícias locais para teste; não use em produção.
                </p>
            </details>
        </form>
    );
}

export default Login;
