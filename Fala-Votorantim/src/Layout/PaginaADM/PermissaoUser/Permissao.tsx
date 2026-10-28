import NavegacaoADM from "../NavegacaoADM";
import usePermissoesADM, {
    LISTA_PERMISSOES,
    PERFIS,
    PERMISSOES_PADRAO,
    type Perfil,
} from "../../../hooks/Usuarios/usePermissoesADM";

function iniciais(nome: string) {
    return nome
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) => parte[0]?.toUpperCase() ?? "")
        .join("");
}

export default function UsuariosPermissoes() {
    const {
        usuarios,
        busca,
        setBusca,
        filtroPerfil,
        setFiltroPerfil,
        filtroSituacao,
        setFiltroSituacao,
        modalAberto,
        setModalAberto,
        usuarioEditando,
        nome,
        setNome,
        email,
        setEmail,
        perfil,
        ativo,
        setAtivo,
        permissoes,
        erro,
        mensagem,
        setMensagem,
        usuariosFiltrados,
        ativos,
        inativos,
        administradores,
        abrirCadastro,
        abrirEdicao,
        alterarPerfil,
        alterarPermissao,
        salvarUsuario,
        alternarSituacao,
    } = usePermissoesADM();
    return (
        <div className="min-h-screen bg-slate-50">
            <NavegacaoADM />

            <main className="ml-64 min-w-0 px-4 pb-10 pt-20 sm:px-6 md:pt-8 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">

                    {/* Cabeçalho */}
                    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-sm font-semibold text-blue-700">
                                Administração / Sistema
                            </p>

                            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                                Usuários e Permissões
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Gerencie os usuários e seus níveis de acesso.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={abrirCadastro}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1447E6] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#193CB8]"
                        >
                            <span className="text-lg">+</span>
                            Novo usuário
                        </button>
                    </header>

                    {/* Indicadores */}
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">
                                Total de usuários
                            </p>
                            <p className="mt-3 text-3xl font-bold text-slate-900">
                                {usuarios.length}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Usuários cadastrados localmente
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">
                                Usuários ativos
                            </p>
                            <p className="mt-3 text-3xl font-bold text-emerald-600">
                                {ativos}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Marcados como ativos
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">
                                Usuários inativos
                            </p>
                            <p className="mt-3 text-3xl font-bold text-slate-500">
                                {inativos}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Acessos desativados na demonstração
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-sm font-medium text-slate-500">
                                Administradores
                            </p>
                            <p className="mt-3 text-3xl font-bold text-blue-700">
                                {administradores}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Usuários com perfil administrativo
                            </p>
                        </div>
                    </section>

                    {/* Permissões por perfil */}
                    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Níveis de acesso
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Referência das permissões padrão de cada perfil.
                            </p>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {PERFIS.map((nomePerfil) => (
                                <div
                                    key={nomePerfil}
                                    className="rounded-lg border border-slate-200 p-4"
                                >
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                            nomePerfil === "Administrador"
                                                ? "bg-blue-100 text-blue-800"
                                                : nomePerfil === "Atendente"
                                                  ? "bg-violet-100 text-violet-800"
                                                  : "bg-slate-100 text-slate-700"
                                        }`}
                                    >
                                        {nomePerfil}
                                    </span>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {nomePerfil === "Administrador"
                                            ? "Acesso amplo às funções administrativas e ao gerenciamento de usuários."
                                            : nomePerfil === "Atendente"
                                              ? "Pode consultar, cadastrar e editar denúncias, além de visualizar relatórios."
                                              : "Pode consultar denúncias e visualizar relatórios, sem alterar registros."}
                                    </p>

                                    <p className="mt-3 text-xs font-medium text-slate-400">
                                        {
                                            Object.values(
                                                PERMISSOES_PADRAO[nomePerfil]
                                            ).filter(Boolean).length
                                        }{" "}
                                        de {LISTA_PERMISSOES.length} permissões padrão
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Mensagem */}
                    {mensagem && (
                        <div
                            role="status"
                            className="flex items-start justify-between gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800"
                        >
                            <span>{mensagem}</span>
                            <button
                                type="button"
                                onClick={() => setMensagem("")}
                                className="font-bold"
                                aria-label="Fechar mensagem"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    {/* Pesquisa e filtros */}
                    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="md:col-span-1">
                                <label
                                    htmlFor="busca-usuario"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Buscar usuário
                                </label>

                                <input
                                    id="busca-usuario"
                                    type="search"
                                    value={busca}
                                    onChange={(evento) =>
                                        setBusca(evento.target.value)
                                    }
                                    placeholder="Nome ou e-mail..."
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="filtro-perfil"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Perfil
                                </label>

                                <select
                                    id="filtro-perfil"
                                    value={filtroPerfil}
                                    onChange={(evento) =>
                                        setFiltroPerfil(evento.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="Todos">Todos os perfis</option>
                                    {PERFIS.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="filtro-situacao"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Situação
                                </label>

                                <select
                                    id="filtro-situacao"
                                    value={filtroSituacao}
                                    onChange={(evento) =>
                                        setFiltroSituacao(evento.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="Todas">Todas as situações</option>
                                    <option value="Ativos">Ativos</option>
                                    <option value="Inativos">Inativos</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Tabela */}
                    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                            <div>
                                <h2 className="font-bold text-slate-900">
                                    Usuários cadastrados
                                </h2>
                                <p className="mt-1 text-xs text-slate-500">
                                    {usuariosFiltrados.length} resultado(s)
                                </p>
                            </div>
                        </div>

                        {usuariosFiltrados.length === 0 ? (
                            <div className="p-10 text-center">
                                <p className="font-semibold text-slate-700">
                                    Nenhum usuário encontrado
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    Tente alterar a busca ou os filtros.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px] text-left text-sm">
                                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                                        <tr>
                                            <th className="px-5 py-4 font-semibold">
                                                Usuário
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Perfil
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Permissões
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Situação
                                            </th>
                                            <th className="px-5 py-4 text-right font-semibold">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {usuariosFiltrados.map((usuario) => (
                                            <tr
                                                key={usuario.id}
                                                className="transition hover:bg-slate-50"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-800">
                                                            {iniciais(usuario.nome)}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="font-semibold text-slate-800">
                                                                {usuario.nome}
                                                            </p>
                                                            <p className="mt-1 text-xs text-slate-500">
                                                                {usuario.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                            usuario.perfil === "Administrador"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : usuario.perfil === "Atendente"
                                                                  ? "bg-violet-100 text-violet-800"
                                                                  : "bg-slate-100 text-slate-700"
                                                        }`}
                                                    >
                                                        {usuario.perfil}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 text-slate-600">
                                                    {Object.values(
                                                        usuario.permissoes
                                                    ).filter(Boolean).length}{" "}
                                                    de {LISTA_PERMISSOES.length}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                                                            usuario.ativo
                                                                ? "bg-emerald-100 text-emerald-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                    >
                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${
                                                                usuario.ativo
                                                                    ? "bg-emerald-600"
                                                                    : "bg-red-600"
                                                            }`}
                                                        />
                                                        {usuario.ativo ? "Ativo" : "Inativo"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                abrirEdicao(usuario)
                                                            }
                                                            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                alternarSituacao(usuario)
                                                            }
                                                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                                                usuario.ativo
                                                                    ? "bg-red-50 text-red-700 hover:bg-red-100"
                                                                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                                            }`}
                                                        >
                                                            {usuario.ativo
                                                                ? "Desativar"
                                                                : "Ativar"}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            {/* Modal de cadastro e edição */}
            {modalAberto && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 p-4 py-8 sm:items-center"
                    onMouseDown={(evento) => {
                        if (evento.target === evento.currentTarget) {
                            setModalAberto(false);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="titulo-modal"
                        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                            <div>
                                <h2
                                    id="titulo-modal"
                                    className="text-xl font-bold text-slate-900"
                                >
                                    {usuarioEditando !== null
                                        ? "Editar usuário"
                                        : "Cadastrar usuário"}
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Preencha os dados e defina as permissões.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setModalAberto(false)}
                                className="rounded-lg p-2 text-xl text-slate-500 hover:bg-slate-100"
                                aria-label="Fechar formulário"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={salvarUsuario}>
                            <div className="max-h-[65vh] space-y-5 overflow-y-auto p-5 sm:p-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="nome-usuario"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Nome completo
                                        </label>
                                        <input
                                            id="nome-usuario"
                                            value={nome}
                                            onChange={(evento) =>
                                                setNome(evento.target.value)
                                            }
                                            required
                                            minLength={3}
                                            maxLength={100}
                                            placeholder="Nome do usuário"
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email-usuario"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            E-mail
                                        </label>
                                        <input
                                            id="email-usuario"
                                            type="email"
                                            value={email}
                                            onChange={(evento) =>
                                                setEmail(evento.target.value)
                                            }
                                            required
                                            maxLength={150}
                                            placeholder="usuario@exemplo.com.br"
                                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="perfil-usuario"
                                            className="mb-2 block text-sm font-semibold text-slate-700"
                                        >
                                            Perfil de acesso
                                        </label>

                                        <select
                                            id="perfil-usuario"
                                            value={perfil}
                                            onChange={(evento) =>
                                                alterarPerfil(
                                                    evento.target.value as Perfil
                                                )
                                            }
                                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                        >
                                            {PERFIS.map((item) => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>

                                        <p className="mt-1.5 text-xs text-slate-500">
                                            Trocar o perfil redefine as permissões
                                            para os valores padrão dele.
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-2 block text-sm font-semibold text-slate-700">
                                            Situação do usuário
                                        </p>

                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={ativo}
                                            onClick={() => setAtivo(!ativo)}
                                            className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium ${
                                                ativo
                                                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                                    : "border-red-200 bg-red-50 text-red-800"
                                            }`}
                                        >
                                            {ativo ? "Usuário ativo" : "Usuário inativo"}
                                            <span className="text-lg">
                                                {ativo ? "✓" : "×"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 pt-5">
                                    <h3 className="font-bold text-slate-900">
                                        Permissões de acesso
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Selecione as ações que este usuário poderá
                                        realizar na configuração demonstrativa.
                                    </p>

                                    <div className="mt-4 divide-y divide-slate-100">
                                        {LISTA_PERMISSOES.map((item) => (
                                            <label
                                                key={item.chave}
                                                className="flex cursor-pointer items-start gap-3 py-3"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={permissoes[item.chave]}
                                                    onChange={(evento) =>
                                                        alterarPermissao(
                                                            item.chave,
                                                            evento.target.checked
                                                        )
                                                    }
                                                    className="mt-1 h-4 w-4 rounded border-slate-300 accent-blue-700"
                                                />

                                                <span className="min-w-0">
                                                    <span className="block text-sm font-semibold text-slate-800">
                                                        {item.titulo}
                                                    </span>
                                                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                                                        {item.descricao}
                                                    </span>
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {erro && (
                                    <p
                                        role="alert"
                                        className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                                    >
                                        {erro}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                                <button
                                    type="button"
                                    onClick={() => setModalAberto(false)}
                                    className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-[#1447E6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193CB8]"
                                >
                                    {usuarioEditando !== null
                                        ? "Salvar alterações"
                                        : "Cadastrar usuário"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
