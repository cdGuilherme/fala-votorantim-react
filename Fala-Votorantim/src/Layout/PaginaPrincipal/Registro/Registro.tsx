import { useState } from 'react'

import Login from './../../../Components/Cards/PaginaPrincipal/Cadastro/Login'
import Cadastro from './../../../Components/Cards/PaginaPrincipal/Cadastro/Cadastro'

import './../../../Style/Registro.css'

type Modo = 'login' | 'cadastro'

export default function Registro()
{
    const [modo, setModo] = useState<Modo>('login')

    const ehLogin = modo === 'login'

    return (
        <main
            className={`containerRegistro ${
                ehLogin ? 'modoLogin' : 'modoCadastro'
            }`}
        >
            <section className="ladoFormulario ladoLogin">
                <Login />
            </section>

            <section className="ladoFormulario ladoCadastro">
                <Cadastro />
            </section>

            <section
                className={`painelDeslizante ${
                    ehLogin
                        ? 'painelNaDireita'
                        : 'painelNaEsquerda'
                }`}
            >
                <div
                    className={`overlayTexto ${
                        ehLogin
                            ? 'overlayVisivel'
                            : 'overlayOculto'
                    }`}
                >
                    <h2>Novo por aqui?</h2>

                    <p>
                        Crie sua conta e comece a usar
                        em poucos minutos.
                    </p>

                    <button type="button" className="btnTrocarModo" onClick={() => setModo('cadastro')}>Cadastrar</button>
                </div>

                <div
                    className={`overlayTexto ${
                        !ehLogin
                            ? 'overlayVisivel'
                            : 'overlayOculto'
                    }`}
                >
                    <h2>Já tem uma conta?</h2>

                    <p>
                        Entre com seus dados para
                        continuar de onde parou.
                    </p>

                    <button type="button" className="btnTrocarModo" onClick={() => setModo('login')}>Entrar</button>
                </div>
            </section>
        </main>
    )
}