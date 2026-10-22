import './../../../../Style/CadastroLogin.css'

import useCadastro from './../../../../hooks/Cadastro/useCadastroLogin';

function Login()
{
    const {
            email, setEmail,
            senha, setSenha,
            Login
        } = useCadastro();

    return(
        <div className="divLogin">

            <div className="iconeRegistro">

            </div>

            <h3>Bem-vindo de volta</h3>

            <label htmlFor="loginEmail">Email:</label>

            <input type="email" name="email" id="loginEmail" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="loginSenha">Senha:</label>

            <input type="password" name="senha" id="loginSenha" placeholder="Sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

            <button type="button" className="btnEntrar" id="btnEntrar" onClick={Login}>Entrar</button>

        </div>
    )
}

export default Login