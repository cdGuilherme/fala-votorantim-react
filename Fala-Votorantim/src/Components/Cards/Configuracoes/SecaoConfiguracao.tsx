import type { ReactNode } from "react";

type SecaoConfiguracaoProps = {
    titulo: string;
    descricao: string;
    children: ReactNode;
    id: string;
};

export default function SecaoConfiguracao({
    titulo,
    descricao,
    children,
    id,
}: SecaoConfiguracaoProps) {
    return (
        <section
            id={id}
            className="scroll-mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        >
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
                <h2 className="text-lg font-bold text-slate-900">{titulo}</h2>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                    {descricao}
                </p>
            </div>
            <div className="space-y-5 p-5 sm:p-6">{children}</div>
        </section>
    );
}
