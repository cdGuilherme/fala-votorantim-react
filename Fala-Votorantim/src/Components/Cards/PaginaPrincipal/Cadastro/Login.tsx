import './../../../../Style/CadastroLogin.css'

function Login()
{
    return(
        <div className="divLogin">

            <div className="iconeRegistro">

            </div>

            <h3>Bem-vindo de volta</h3>

            <label htmlFor="loginEmail">Email:</label>

            <input type="email" name="email" id="loginEmail" placeholder="seu@email.com" />

            <label htmlFor="loginSenha">Senha:</label>

            <input type="password" name="senha" id="loginSenha" placeholder="Sua senha" />

            <button type="button" className="btnEntrar" id="btnEntrar">Entrar</button>

        </div>
    )
}

export default Login