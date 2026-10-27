type CampoTextoProps = {
    id: string;
    label: string;
    descricao?: string;
    value: string;
    placeholder?: string;
    onChange: (valor: string) => void;
    type?: string;
};

export default function CampoTexto({
    id,
    label,
    descricao,
    value,
    placeholder,
    onChange,
    type = "text",
}: CampoTextoProps) {
    return (
        <div className="min-w-0">
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-semibold text-slate-700"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(evento) => onChange(evento.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            {descricao && (
                <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    {descricao}
                </p>
            )}
        </div>
    );
}
