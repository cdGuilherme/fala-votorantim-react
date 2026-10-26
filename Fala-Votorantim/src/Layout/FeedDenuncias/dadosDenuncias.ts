// Manter os dados de exemplo e as opções de categorias e status.

import type { Denuncia, GrupoCategoria, Status } from "./types";

export const categoriasAgrupadas: GrupoCategoria[] = [
  {
    titulo: "Problemas de infraestrutura urbana",
    itens: [
      "Buracos",
      "Calçadas danificadas",
      "Sinalização quebrada",
    ],
  },
  {
    titulo: "Problemas de iluminação pública",
    itens: [
      "Postes apagados",
      "Falta de iluminação",
      "Problemas elétricos urbanos",
    ],
  },
  {
    titulo: "Problemas de limpeza urbana",
    itens: [
      "Lixo acumulado",
      "Entulho irregular",
      "Terrenos abandonados",
    ],
  },
  {
    titulo: "Problemas de vazamentos e saneamento",
    itens: [
      "Vazamentos de água",
      "Esgoto",
      "Problemas em vias públicas",
    ],
  },
];

export const statusDisponiveis: Status[] = [
  "Pendente",
  "Em andamento",
  "Resolvido",
];

export const denunciasIniciais: Denuncia[] = [
  {
    id: "2255510",
    titulo: "Buraco grande na rua das Florestas",
    categoria: "Buracos",
    descricao:
      "Buraco profundo causando risco de acidentes para veículos e pedestres. O problema existe há mais de 2 semanas.",
    endereco: "Rua das Flores, 123, Centro",
    data: "10/05/2024, 14:30",
    status: "Em andamento",
  },
  {
    id: "2024051402",
    titulo: "Poste apagado na avenida",
    categoria: "Postes apagados",
    descricao:
      "Poste sem iluminação há mais de uma semana, deixando a rua escura e perigosa durante a noite.",
    endereco: "Avenida Principal, 456, Jardim América",
    data: "08/05/2024, 09:15",
    status: "Resolvido",
  },
  {
    id: "2024051403",
    titulo: "Lixo acumulado na esquina",
    categoria: "Lixo acumulado",
    descricao:
      "Acúmulo de lixo na esquina há 4 dias. A coleta não está passando regularmente.",
    endereco: "Rua Santos Dumont, 789, Vila Nova",
    data: "12/05/2024, 16:45",
    status: "Pendente",
  },
];

export const estilosStatus: Record<Status, string> = {
  Pendente: "border-yellow-300 bg-yellow-50 text-yellow-600",
  "Em andamento": "border-blue-200 bg-blue-50 text-blue-600",
  Resolvido: "border-green-200 bg-green-50 text-green-600",
};