import './../../../../Style/CadastroLogin.css'

function Cadastro()
{
    return(
        <div className="divCadastro">

            <div className="iconeRegistro">

            </div>

            <h3>Seja Bem-Vindo</h3>

            <label htmlFor="nome">Nome completo:</label>

            <input type="text" name="Nome" id="nome" placeholder="Seu nome completo" />

            <label htmlFor="email">Email:</label>

            <input type="email" name="email" id="email" placeholder="seu@email.com" />

            <label htmlFor="tel">Telefone:</label>

            <input type="tel" name="tel" id="tel" placeholder="(00) 00000-0000" />

            <label htmlFor="senha">Senha:</label>

            <input type="password" name="senha" id="senha" placeholder="Mínimo 6 caracteres" />

            <label htmlFor="confSenha">Confirmar senha:</label>

            <input type="password" id="confSenha" name="confSenha" placeholder="Digite sua senha novamente" />

            <button type="button" className="btnCadastrar" id="btnCadastrar">Criar conta</button>

        </div>
    )
}

export default Cadastro