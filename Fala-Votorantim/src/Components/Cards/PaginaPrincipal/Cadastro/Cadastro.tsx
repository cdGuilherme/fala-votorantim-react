import "./../../../../Style/CadastroLogin.css";

type CadastroProps = {
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    confSenha: string;
    mensagem: string;
    mensagemSucesso: boolean;
    onNomeChange: (valor: string) => void;
    onEmailChange: (valor: string) => void;
    onTelefoneChange: (valor: string) => void;
    onSenhaChange: (valor: string) => void;
    onConfSenhaChange: (valor: string) => void;
    onSubmit: () => void;
};

function Cadastro({
    nome,
    email,
    telefone,
    senha,
    confSenha,
    mensagem,
    mensagemSucesso,
    onNomeChange,
    onEmailChange,
    onTelefoneChange,
    onSenhaChange,
    onConfSenhaChange,
    onSubmit,
}: CadastroProps) {
    return (
        <form
            className="divCadastro"
            onSubmit={(evento) => {
                evento.preventDefault();
                onSubmit();
            }}
        >
            <div className="iconeRegistro" />

            <h3>Seja bem-vindo</h3>

            <label htmlFor="nome">Nome completo:</label>
            <input
                type="text"
                name="Nome"
                id="nome"
                autoComplete="name"
                placeholder="Seu nome completo"
                required
                value={nome}
                onChange={(evento) => onNomeChange(evento.target.value)}
            />

            <label htmlFor="cadastroEmail">E-mail:</label>
            <input
                type="email"
                name="email"
                id="cadastroEmail"
                autoComplete="email"
                placeholder="seu@email.com"
                required
                value={email}
                onChange={(evento) => onEmailChange(evento.target.value)}
            />

            <label htmlFor="tel">Telefone:</label>
            <input
                type="tel"
                name="tel"
                id="tel"
                autoComplete="tel"
                placeholder="(00) 00000-0000"
                required
                value={telefone}
                onChange={(evento) => onTelefoneChange(evento.target.value)}
            />

            <label htmlFor="cadastroSenha">Senha:</label>
            <input
                type="password"
                name="senha"
                id="cadastroSenha"
                autoComplete="new-password"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
                value={senha}
                onChange={(evento) => onSenhaChange(evento.target.value)}
            />

            <label htmlFor="confSenha">Confirmar senha:</label>
            <input
                type="password"
                id="confSenha"
                name="confSenha"
                autoComplete="new-password"
                placeholder="Digite sua senha novamente"
                minLength={6}
                required
                value={confSenha}
                onChange={(evento) => onConfSenhaChange(evento.target.value)}
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

            <p className="text-xs text-slate-500">
                Protótipo local: os dados ficam neste navegador. Não use uma
                senha real ou reutilizada.
            </p>

            <button
                type="submit"
                className="btnCadastrar"
                id="btnCadastrar"
                onClick={onSubmit}
            >
                Criar conta
            </button>
        </form>
    );
}

export default Cadastro;
