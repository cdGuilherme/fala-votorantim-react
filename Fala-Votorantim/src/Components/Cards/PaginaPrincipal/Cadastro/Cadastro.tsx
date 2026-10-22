import './../../../../Style/CadastroLogin.css';
import useCadastro from './../../../../hooks/Cadastro/useCadastroLogin';

function Cadastro() {

    const {
        nome, setNome,
        email, setEmail,
        telefone, setTelefone,
        senha, setSenha,
        confSenha, setConfSenha,
        Cadastrar
    } = useCadastro();



    return(
        <div className="divCadastro">
            <div className="iconeRegistro"></div>

            <h3>Seja Bem-Vindo</h3>

            <label htmlFor="nome">Nome completo:</label>
            <input 
                type="text" 
                name="Nome" 
                id="nome" 
                placeholder="Seu nome completo" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <label htmlFor="email">Email:</label>
            <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="seu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="tel">Telefone:</label>
            <input 
                type="tel" 
                name="tel" 
                id="tel" 
                placeholder="(00) 00000-0000" 
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
            />

            <label htmlFor="senha">Senha:</label>
            <input 
                type="password" 
                name="senha" 
                id="senha" 
                placeholder="Mínimo 6 caracteres" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />

            <label htmlFor="confSenha">Confirmar senha:</label>
            <input 
                type="password" 
                id="confSenha" 
                name="confSenha" 
                placeholder="Digite sua senha novamente" 
                value={confSenha}
                onChange={(e) => setConfSenha(e.target.value)}
            />

            {/* Adicionado o onClick para disparar a função do Hook */}
            <button type="button" className="btnCadastrar" id="btnCadastrar" onClick={Cadastrar}>
                Criar conta
            </button>
        </div>
    )
}

export default Cadastro