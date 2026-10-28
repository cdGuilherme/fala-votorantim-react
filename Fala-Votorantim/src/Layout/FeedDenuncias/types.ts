// Definir os tipos compartilhados, como Denuncia e Status.

// Status definidos no caso de uso "Alterar Status da Denúncia" do PI.
export type Status =
  | "Recebida"
  | "Em análise"
  | "Em execução"
  | "Concluída"
  | "Indeferida";

export type Anexo = {
  nome: string;
  dataUrl: string;
};

export type EventoHistorico = {
  tipo: "status" | "resposta" | "encaminhamento";
  texto: string;
  data: string;
  responsavel: string;
};

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
  anexos?: Anexo[];
  autorEmail?: string;
  secretaria?: string;
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
