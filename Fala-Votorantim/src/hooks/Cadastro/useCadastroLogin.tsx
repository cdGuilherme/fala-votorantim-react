import { useState } from "react";
import { useNavigate  } from "react-router-dom";

export default function useCadastroLogin()
{
    const navegation = useNavigate ();


    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");

    async function Cadastrar()
    {
        // se a senha não for igual a confirmação de senha
        // eu quero que o usuario nem cadastre 
        if(senha !== confSenha)
        {
            alert("As senhas n são compativeis, tente novamente");
            return;
        }

        // caso seja igual, vamos continuar o processo do cadastro 
        const UsuarioText = localStorage.getItem('usuarios');
        const UsuariodaLista = UsuarioText ? JSON.parse(UsuarioText) : [];

        // agora é para ver se o email que o usuário digitou
        // já não tem no localStorage
        // se tiver, ele retorna que o usuário já existe,
        // e ai não continua o cadastro
        const isEmailExistente = UsuariodaLista.some((user: any) => user.email === email) ;
        
        if(isEmailExistente)
        {
            alert("email já cadastrado")
            return;
        }

        // agora que verificamos que as senhas batem uma com a outra
        // e não existe já um email cadastrado com aquele que ele 
        //está digitando, vamos salvar ele já no localStorage

        const NovoUser = {
            nome: nome,
            email: email,
            telefone: telefone,
            senha: senha
        }

        UsuariodaLista.push(NovoUser);
        localStorage.setItem('usuarios', JSON.stringify(UsuariodaLista));
        alert("Usuário Cadastrado com sucesso");

        navegation('/Registro');
    }

    async function Login()
    {
        const UsuarioText = localStorage.getItem('usuarios');
        const UsuariodaLista = UsuarioText ? JSON.parse(UsuarioText) : [];

        // procurar usuario com o mesmo nome e mesma senha
        const UsersEncontrados = UsuariodaLista.find(
            (user: any) => user && user.email === email && user.senha === senha
        );

        if(UsersEncontrados)
        {
           navegation('/adm/TelaInicial') 
        }
        else
        {
            alert("E-mail ou senha incorretos");
        }
    }

    return{
        nome, 
        email,
        telefone,
        senha,
        confSenha,

        setNome,
        setEmail,
        setSenha,
        setConfSenha,
        setTelefone,

        Cadastrar,
        Login
    }
}