import { useState } from "react";
import { NavLink } from "react-router-dom";
import LayoutUser from "../LayoutUser";
import ListaDenuncias from "../../FeedDenuncias/ListaDenuncias";
import useSessao from "../../../hooks/useSessao";
import useDenuncias from "../../../hooks/Denuncias/useDenuncias";
import useInteracoesDenuncias from "../../../hooks/Denuncias/useInteracoesDenuncias";

// Caso de uso "Acompanhar Denúncias": denúncias feitas pelo usuário e denúncias salvas.

type Aba = "minhas" | "salvas" | "favoritas";

export default function MinhasDenuncias() {
    const { sessao } = useSessao();
    const { denuncias } = useDenuncias();
    const { favoritas, salvas, alternarFavorita, alternarSalva } =
        useInteracoesDenuncias(sessao?.email);
    const [aba, setAba] = useState<Aba>("minhas");

    const listas: Record<Aba, typeof denuncias> = {
        minhas: denuncias.filter((d) => d.autorEmail === sessao?.email),
        salvas: denuncias.filter((d) => salvas.includes(d.id)),
        favoritas: denuncias.filter((d) => favoritas.includes(d.id)),
    };

    const abas: { id: Aba; label: string }[] = [
        { id: "minhas", label: "Feitas por mim" },
        { id: "salvas", label: "Salvas" },
        { id: "favoritas", label: "Favoritas" },
    ];

    const vazias: Record<Aba, string> = {
        minhas: "Você ainda não cadastrou nenhuma denúncia.",
        salvas: "Salve denúncias no feed para acompanhá-las aqui.",
        favoritas: "Favorite denúncias no feed para encontrá-las aqui.",
    };

    return (
        <LayoutUser titulo="Acompanhar Denúncias" subtitulo="Acompanhe o andamento">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div role="tablist" aria-label="Tipo de denúncia" className="flex gap-1 self-start rounded-xl border border-[#E5E7EB] bg-white p-1">
                    {abas.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={aba === item.id}
                            onClick={() => setAba(item.id)}
                            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                aba === item.id ? "bg-[#1447E6] text-white" : "text-[#4A5565] hover:bg-[#F3F4F6]"
                            }`}
                        >
                            {item.label}
                            <span className={`rounded-full px-2 text-xs ${aba === item.id ? "bg-white/20" : "bg-[#F3F4F6]"}`}>
                                {listas[item.id].length}
                            </span>
                        </button>
                    ))}
                </div>

                <NavLink
                    to="/CadastroDenuncia"
                    className="self-start rounded-lg bg-[#1447E6] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#193CB8]"
                >
                    + Nova denúncia
                </NavLink>
            </div>

            <ListaDenuncias
                key={aba}
                denuncias={listas[aba]}
                acoesPara={(denuncia) => ({
                    favorita: favoritas.includes(denuncia.id),
                    salva: salvas.includes(denuncia.id),
                    onFavoritar: () => alternarFavorita(denuncia.id),
                    onSalvar: () => alternarSalva(denuncia.id),
                })}
                mensagemVazia={vazias[aba]}
            />
        </LayoutUser>
    );
}
