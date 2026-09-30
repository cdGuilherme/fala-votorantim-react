
// Este arquivo guarda SÓ OS DADOS da seção "Como funciona?".
// Não tem nenhuma tag HTML/JSX aqui (nao tem<div>, <section>...).
// Por isso a extensão é .ts (e não .tsx).
// Importa os ícones que vamos usar. Cada nome é um componente
// de ícone da biblioteca lucide-react.
// (se ainda não instalou: npm install lucide-react)
import { UserPlus, FileText, LayoutList, Activity, Bell, Heart } from "lucide-react";

// "import type" importa apenas um TIPO do TypeScript.
// Tipos só existem para o editor checar erros; somem quando o site é construído.
// LucideIcon = "o tipo de um componente de ícone do lucide".
import type { LucideIcon } from "lucide-react";

// Aqui a gente descreve o FORMATO de cada passo.
// Todo passo PRECISA ter esses 3 campos, com esses tipos.
// Se você esquecer um campo ou errar o tipo, o VS Code sublinha de vermelho.
type Passo = {
    icone: LucideIcon; // o ícone em si (o componente, SEM os sinais < >)
    titulo: string;    // título do card, ex: "Crie sua conta"
    texto: string;     // frase curta embaixo do título
};

// "export" deixa esta lista disponível para outros arquivos.
// É o que permite o ComoFunciona.tsx fazer: import { passos } from "./Passos"
//
// ": Passo[]" quer dizer "uma lista (array) de objetos no formato Passo".
export const passos: Passo[] = [
    {
        icone: UserPlus, // guardamos o ícone sem < />, o componente vai desenhá-lo depois
        titulo: "Crie sua conta",
        texto: "Cadastro rápido e seguro para começar a denunciar.",
    },
    {
        icone: FileText,
        titulo: "Registre sua denúncia",
        texto: "Descreva o problema, informe o local e envie fotos.",
    },
    {
        icone: LayoutList,
        titulo: "Informações organizadas",
        texto: "Sua denúncia é classificada por tipo, local e prioridade.",
    },
    {
        icone: Activity,
        titulo: "Acompanhe o andamento",
        texto: "Veja o status da denúncia direto na plataforma.",
    },
    {
        icone: Bell,
        titulo: "Receba atualizações",
        texto: "Seja avisado quando o status da sua denúncia mudar.",
    },
    {
        icone: Heart,
        titulo: "Ajude Votorantim",
        texto: "Cada denúncia contribui para uma cidade melhor.",
    },
];

// Para adicionar um passo novo: copie um bloco { ... }, cole dentro da
// lista (antes do "];"), troque os textos e importe o ícone lá em cima.
// O número do card (1, 2, 3...) é automático, vem da posição na lista.