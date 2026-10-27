// Definir os tipos compartilhados, como Denuncia e Status.

export type Status = "Pendente" | "Em andamento" | "Resolvido";

export type Denuncia = {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  endereco: string;
  data: string;
  status: Status;
  cep?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  resultadoEsperado?: string;
  anexoNome?: string;
  anexoDataUrl?: string;
};

export type GrupoCategoria = {
  titulo: string;
  itens: string[];
};

export type CardResumo = {
  titulo: string;
  valor: number;
  cor: string;
  numero: string;
};
