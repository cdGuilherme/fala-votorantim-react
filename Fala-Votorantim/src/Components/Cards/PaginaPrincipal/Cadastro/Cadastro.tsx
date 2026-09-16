import './../../../../hooks/Cadastro/CadastroLogin'

function Cadastro()
{
    return(
        <div className="divCadastro">
            <img src="" alt="" />
            <h3>Seja Bem-Vindo</h3>

            <label htmlFor="nome">Nome completo:</label>
            <input type="text" name="Nome" id="nome" className="nome" />

            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" className="email" />

            <label htmlFor="tel">Telefone:</label>
            <input type="tel" name="tel" id="tel" className="tel" />


            <label htmlFor="senha">Senha:</label>
            <input type="password" name="senha" id="senha" className="senha" />

            <label htmlFor="confSenha">Confirmar senha:</label>
            <input type="password" id="confSenha" className="confSenha" name="confSenha" />

            <button className="btnCadastrar" id="btnCadastrar">Criar conta</button>
        
        
        </div>
    )
}

export default Cadastro;