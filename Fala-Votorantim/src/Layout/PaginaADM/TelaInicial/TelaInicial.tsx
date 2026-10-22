import Menu from './../../../Components/Cards/menuLateral/MenuLateralADM'

export default function TelaInicialADM() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Menu />

            <main className="min-w-0 flex-1 p-4 pt-20 sm:p-6 md:pt-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Administração
                    </h1>

                    <p className="text-gray-500">
                        Tela inicial
                    </p>

                    
                    <div className="mt-5 rounded-xl bg-white p-5 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Bem-vindo ao Fala Votorantim Sr.
                        </h2>

                        <p className="text-gray-500">
                            cargo:
                        </p>
                    </div>
                </header>

                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-bold text-gray-800">
                        Resumo geral
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                        <article className="rounded-xl border-l-4 border-blue-600 bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Denúncias hoje
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-gray-800">
                                1
                            </h3>
                        </article>

                        <article className="rounded-xl border-l-4 border-green-600 bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Denúncias resolvidas
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-gray-800">
                                1
                            </h3>
                        </article>

                        <article className="rounded-xl border-l-4 border-orange-500 bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Denúncias pendentes
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-gray-800">
                                1
                            </h3>
                        </article>

                        <article className="rounded-xl border-l-4 border-purple-600 bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Em andamento
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-gray-800">
                                1
                            </h3>
                        </article>

                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-bold text-gray-800">
                        Denúncias prioritárias
                    </h2>

                    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Denúncia #001
                                </p>
                                <h3 className="mt-1 font-semibold text-gray-800">
                                    Buraco na via
                                </h3>
                            </div>

                            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                                Pendente
                            </span>
                        </div>
                    </article>
                </section>

                <section>
                    <h2 className="mb-4 text-xl font-bold text-gray-800">
                        Denúncias recentes
                    </h2>

                    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Denúncia #002
                                </p>
                                <h3 className="mt-1 font-semibold text-gray-800">
                                    Buraco na rua
                                </h3>
                            </div>

                            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                                Pendente
                            </span>
                        </div>
                    </article>
                </section>

                
            </main>
            
        </div>
    )
}