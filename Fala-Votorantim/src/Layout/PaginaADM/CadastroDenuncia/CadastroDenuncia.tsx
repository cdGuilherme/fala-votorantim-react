
import NavegacaoADM from '../NavegacaoADM'
import useCadastroDenuncia from '../../../hooks/Denuncias/useCadastroDenuncia'

export default function CadastroDenuncia() {
    const {
        campos,
        arquivo,
        mensagem,
        mensagemSucesso,
        chaveInputArquivo,
        atualizarCampo,
        selecionarArquivo,
        limparFormulario,
        cadastrarDenuncia,
    } = useCadastroDenuncia()

    return (
        <div className="flex min-h-screen bg-gray-50">
            <NavegacaoADM />

            <main className="min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-6 lg:ml-64 lg:px-8 lg:pt-8">

                <header className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                        Cadastro de Denúncias
                    </h1>

                    <p className="mt-2 text-sm text-[#155DFC] sm:text-base">
                        Registrar denúncia
                    </p>
                </header>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                    {/* 1 - parte de endereço */}
                    <section className="p-5 sm:p-6">
                        <div className="mb-6 flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                1
                            </span>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Endereço da ocorrência
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Informe o local onde o problema foi identificado.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div className="flex flex-col gap-2">
                                <label htmlFor="cep" className="text-sm font-semibold text-gray-700">
                                    CEP
                                </label>

                                <input
                                    id="cep"
                                    type="text"
                                    value={campos.cep}
                                    onChange={(evento) => atualizarCampo("cep", evento.target.value)}
                                    required
                                    placeholder="00000-000"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="numero" className="text-sm font-semibold text-gray-700">
                                    Número
                                </label>

                                <input
                                    id="numero"
                                    type="text"
                                    value={campos.numero}
                                    onChange={(evento) => atualizarCampo("numero", evento.target.value)}
                                    required
                                    placeholder="Número do local"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="rua" className="text-sm font-semibold text-gray-700">
                                    Nome da rua
                                </label>

                                <input
                                    id="rua"
                                    type="text"
                                    value={campos.rua}
                                    onChange={(evento) => atualizarCampo("rua", evento.target.value)}
                                    required
                                    placeholder="Rua ou avenida"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="complemento" className="text-sm font-semibold text-gray-700">
                                    Complemento (opcional)
                                </label>

                                <input
                                    id="complemento"
                                    type="text"
                                    value={campos.complemento}
                                    onChange={(evento) => atualizarCampo("complemento", evento.target.value)}
                                    placeholder="Casa, bloco ou referência"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="flex flex-col gap-2 sm:col-span-2">
                                <label htmlFor="bairro" className="text-sm font-semibold text-gray-700">
                                    Bairro
                                </label>

                                <input
                                    id="bairro"
                                    type="text"
                                    value={campos.bairro}
                                    onChange={(evento) => atualizarCampo("bairro", evento.target.value)}
                                    required
                                    placeholder="Nome do bairro"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:max-w-[calc(50%-0.625rem)]"
                                />
                            </div>

                        </div>
                    </section>

                    <hr className="border-gray-200" />

                    {/* 2 - parte para descrever a denuncia */}
                    <section className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                2
                            </span>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Descrição do ocorrido
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Descreva o problema e os riscos observados.
                                </p>
                            </div>
                        </div>

                        <textarea
                            id="descricao"
                            rows={5}
                            value={campos.descricao}
                            onChange={(evento) => atualizarCampo("descricao", evento.target.value)}
                            required
                            placeholder="Digite aqui a descrição do ocorrido..."
                            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </section>

                    <hr className="border-gray-200" />

                    {/* 3 - parte de categoria */}
                    <section className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                3
                            </span>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Categoria da denúncia
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Selecione a categoria que melhor identifica o problema.
                                </p>
                            </div>
                        </div>

                        <select
                            id="categoria"
                            value={campos.categoria}
                            onChange={(evento) => atualizarCampo("categoria", evento.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="" disabled>
                                Selecione uma categoria
                            </option>

                            <option value="buraco">Buraco</option>
                            <option value="iluminacao">Iluminação pública</option>
                            <option value="lixo">Lixo</option>
                            <option value="esgoto">Esgoto</option>
                            <option value="seguranca">Segurança</option>
                        </select>
                    </section>

                    <hr className="border-gray-200" />

                    {/* 4 - parte de resultado que o usuário deseja  */}
                    <section className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                4
                            </span>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Resultado esperado
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Informe o que você espera que seja feito.
                                </p>
                            </div>
                        </div>

                        <textarea
                            id="resultado"
                            rows={3}
                            value={campos.resultadoEsperado}
                            onChange={(evento) => atualizarCampo("resultadoEsperado", evento.target.value)}
                            placeholder="Digite o resultado esperado..."
                            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </section>

                    <hr className="border-gray-200" />

                    {/* 5 - parte para anexar a midia */}
                    <section className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                                5
                            </span>

                            <div>
                                <h2 className="text-lg font-bold text-gray-800">
                                    Anexo de mídia
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Adicione imagens que ajudem a comprovar a denúncia.
                                </p>
                            </div>
                        </div>

                        <label
                            htmlFor="anexo"
                            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/40 px-4 py-10 text-center transition hover:border-blue-500 hover:bg-blue-50"
                        >
                            <span className="mb-3 text-3xl text-blue-600">
                                ↑
                            </span>

                            <span className="font-semibold text-blue-700">
                                Arraste e solte ou clique para selecionar
                            </span>

                            <span className="mt-2 text-sm text-gray-500">
                                Formatos aceitos: JPEG e PNG · Até 2 MB
                            </span>
                            {arquivo && (
                                <span className="mt-2 text-sm font-medium text-blue-700">
                                    {arquivo.name}
                                </span>
                            )}

                            <input
                                key={chaveInputArquivo}
                                id="anexo"
                                type="file"
                                accept="image/jpeg,image/png"
                                className="sr-only"
                                onChange={selecionarArquivo}
                            />
                        </label>
                    </section>

                    <hr className="border-gray-200" />

                    {/* Botões */}
                    {mensagem && (
                        <p
                            role="status"
                            className={`px-5 pt-4 text-sm sm:px-6 ${
                                mensagemSucesso ? "text-emerald-700" : "text-red-700"
                            }`}
                        >
                            {mensagem}
                        </p>
                    )}

                    <footer className="flex flex-col-reverse gap-3 bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                        <button
                            type="button"
                            onClick={limparFormulario}
                            className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 sm:w-auto"
                        >
                            Limpar formulário
                        </button>

                        <button
                            type="button"
                            onClick={() => void cadastrarDenuncia()}
                            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 sm:w-auto"
                        >
                            Cadastrar denúncia
                        </button>

                    </footer>

                </div>
            </main>
        </div>
    )
}