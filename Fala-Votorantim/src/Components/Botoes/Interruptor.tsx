type InterruptorProps = {
    titulo: string;
    descricao: string;
    ativo: boolean;
    onChange: (valor: boolean) => void;
};

export default function Interruptor({
    titulo,
    descricao,
    ativo,
    onChange,
}: InterruptorProps) {
    return (
        <div className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">{titulo}</p>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                    {descricao}
                </p>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={ativo}
                aria-label={titulo}
                onClick={() => onChange(!ativo)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                    ativo ? "bg-blue-700" : "bg-slate-300"
                }`}
            >
                <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        ativo ? "translate-x-5" : "translate-x-0.5"
                    }`}
                />
            </button>
        </div>
    );
}
