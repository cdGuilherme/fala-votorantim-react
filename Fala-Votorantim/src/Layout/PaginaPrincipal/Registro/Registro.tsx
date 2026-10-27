import Login from "../../../Components/Cards/PaginaPrincipal/Cadastro/Login";
import Cadastro from "../../../Components/Cards/PaginaPrincipal/Cadastro/Cadastro";
import Footer from "../../../Components/Footer/Footer";
import NavegacaoPublica from "../../NavegacaoPublica";
import { contasAdministrativasDemonstracao } from "../../../LoginADM/contasDemonstracao";
import useRegistro from "../../../hooks/Cadastro/useRegistro";
import "./../../../Style/Registro.css";

export default function Registro() {
    const {
        ehLogin,
        email,
        senha,
        mensagem,
        mensagemSucesso,
        nome,
        telefone,
        confSenha,
        setEmail,
        setSenha,
        setNome,
        setTelefone,
        setConfSenha,
        login,
        cadastrar,
        alterarModo,
    } = useRegistro();

    return (
        <div className="flex min-h-screen flex-col">
            <NavegacaoPublica />
            <main
                className={`containerRegistro ${
                    ehLogin ? "modoLogin" : "modoCadastro"
                }`}
            >
                <section className="ladoFormulario ladoLogin">
                    <Login
                        email={email}
                        senha={senha}
                        mensagem={ehLogin ? mensagem : ""}
                        mensagemSucesso={mensagemSucesso}
                        contasDemonstracao={contasAdministrativasDemonstracao}
                        onEmailChange={setEmail}
                        onSenhaChange={setSenha}
                        onSubmit={login}
                    />
                </section>

                <section className="ladoFormulario ladoCadastro">
                    <Cadastro
                        nome={nome}
                        email={email}
                        telefone={telefone}
                        senha={senha}
                        confSenha={confSenha}
                        mensagem={!ehLogin ? mensagem : ""}
                        mensagemSucesso={mensagemSucesso}
                        onNomeChange={setNome}
                        onEmailChange={setEmail}
                        onTelefoneChange={setTelefone}
                        onSenhaChange={setSenha}
                        onConfSenhaChange={setConfSenha}
                        onSubmit={cadastrar}
                    />
                </section>

                <section
                    className={`painelDeslizante ${
                        ehLogin ? "painelNaDireita" : "painelNaEsquerda"
                    }`}
                >
                    <div
                        className={`overlayTexto ${
                            ehLogin ? "overlayVisivel" : "overlayOculto"
                        }`}
                    >
                        <h2>Novo por aqui?</h2>
                        <p>Crie sua conta e comece a usar em poucos minutos.</p>
                        <button
                            type="button"
                            className="btnTrocarModo"
                            onClick={() => alterarModo("cadastro")}
                        >
                            Cadastrar
                        </button>
                    </div>

                    <div
                        className={`overlayTexto ${
                            !ehLogin ? "overlayVisivel" : "overlayOculto"
                        }`}
                    >
                        <h2>Já tem uma conta?</h2>
                        <p>Entre com seus dados para continuar de onde parou.</p>
                        <button
                            type="button"
                            className="btnTrocarModo"
                            onClick={() => alterarModo("login")}
                        >
                            Entrar
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
