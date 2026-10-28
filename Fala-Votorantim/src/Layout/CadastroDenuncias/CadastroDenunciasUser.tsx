import NavegacaoPublica from "../NavegacaoPublica";
import Footer from "../../Components/Footer/Footer";
import useCadastroDenuncia from "../../hooks/Denuncias/useCadastroDenuncia";
import useSessao from "../../hooks/useSessao";
import LayoutUser from "../PaginaUser/LayoutUser";

export default function CadastroDenunciasUser() {
    const {
        campos,
        arquivos,
        mensagem,
        mensagemSucesso,
        chaveInputArquivo,
        atualizarCampo,
        selecionarArquivo,
        removerArquivo,
        limparFormulario,
        cadastrarDenuncia,
    } = useCadastroDenuncia();
    const { sessao } = useSessao();

    const formulario = (
        <section className="space-y-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                    CEP
                    <input
                        value={campos.cep}
                        onChange={(evento) =>
                            atualizarCampo("cep", evento.target.value)
                        }
                        placeholder="00000-000"
                        required
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal"
                    />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                    Número
                    <input
                        value={campos.numero}
                        onChange={(evento) =>
                            atualizarCampo("numero", evento.target.value)
                        }
                        placeholder="Número do local"
                        required
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal"
                    />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                    Rua ou avenida
                    <input
                        value={campos.rua}
                        onChange={(evento) =>
                            atualizarCampo("rua", evento.target.value)
                        }
                        required
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal"
                    />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                    Complemento (opcional)
                    <input
                        value={campos.complemento}
                        onChange={(evento) =>
                            atualizarCampo(
                                "complemento",
                                evento.target.value
                            )
                        }
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal"
                    />
                </label>
                <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
                    Bairro
                    <input
                        value={campos.bairro}
                        onChange={(evento) =>
                            atualizarCampo("bairro", evento.target.value)
                        }
                        required
                        className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal sm:max-w-[calc(50%-0.5rem)]"
                    />
                </label>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
                Descrição do ocorrido
                <textarea
                    rows={5}
                    value={campos.descricao}
                    onChange={(evento) =>
                        atualizarCampo("descricao", evento.target.value)
                    }
                    required
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal"
                />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
                Categoria
                <select
                    value={campos.categoria}
                    onChange={(evento) =>
                        atualizarCampo("categoria", evento.target.value)
                    }
                    required
                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal"
                >
                    <option value="" disabled>
                        Selecione uma categoria
                    </option>
                    <option value="Buraco">Buraco</option>
                    <option value="Iluminação pública">
                        Iluminação pública
                    </option>
                    <option value="Lixo">Lixo</option>
                    <option value="Esgoto">Esgoto</option>
                    <option value="Segurança">Segurança</option>
                    <option value="Outros">Outros</option>
                </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
                Resultado esperado
                <textarea
                    rows={3}
                    value={campos.resultadoEsperado}
                    onChange={(evento) =>
                        atualizarCampo(
                            "resultadoEsperado",
                            evento.target.value
                        )
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal"
                />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
                Fotos do local (até 4, JPEG ou PNG, até 2 MB cada)
                <input
                    key={chaveInputArquivo}
                    type="file"
                    accept="image/jpeg,image/png"
                    multiple
                    onChange={selecionarArquivo}
                    className="mt-2 block w-full rounded-lg border border-slate-300 p-2 text-sm font-normal"
                />
            </label>
            {arquivos.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                    {arquivos.map((item, indice) => (
                        <li
                            key={`${item.name}-${indice}`}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 pl-3 pr-1 text-xs text-slate-700"
                        >
                            {item.name}
                            <button
                                type="button"
                                onClick={() => removerArquivo(indice)}
                                aria-label={`Remover ${item.name}`}
                                className="rounded-full px-2 py-0.5 text-slate-500 hover:bg-slate-200"
                            >
                                ×
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {mensagem && (
                <p
                    role="status"
                    className={`rounded-lg p-3 text-sm ${
                        mensagemSucesso
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-red-50 text-red-800"
                    }`}
                >
                    {mensagem}
                </p>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={limparFormulario}
                    className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                    Limpar formulário
                </button>
                <button
                    type="button"
                    onClick={() => void cadastrarDenuncia()}
                    className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                >
                    Cadastrar denúncia
                </button>
            </div>
        </section>
    );

    // Caso de uso "Cadastrar Denúncia": logado, a página usa a área do munícipe.
    if (sessao?.perfil === "usuario") {
        return (
            <LayoutUser titulo="Cadastrar Denúncia" subtitulo="Registre um problema urbano">
                {formulario}
            </LayoutUser>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <NavegacaoPublica />
            <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        Registrar denúncia
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 sm:text-base">
                        Informe o local e os detalhes da ocorrência. Os dados
                        ficam salvos neste navegador.
                    </p>
                </header>

                {formulario}
            </main>
            <Footer />
        </div>
    );
}
