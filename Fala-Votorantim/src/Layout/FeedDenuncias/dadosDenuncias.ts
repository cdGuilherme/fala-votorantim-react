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
    id: "1001",
    titulo: "Buracos na rua próximo ao cruzamento",
    categoria: "Buracos",
    descricao:
      "Dois buracos se formaram próximos ao cruzamento e obrigam os motoristas a desviar repentinamente. Moradores relatam que o problema aumentou após as últimas chuvas.",
    endereco: "Rua Antônio Perez, 85, Jardim Europa",
    data: "14/05/2026, 08:40",
    status: "Pendente",
  },
  {
    id: "1002",
    titulo: "Calçada com placas soltas",
    categoria: "Calçadas danificadas",
    descricao:
      "Algumas placas da calçada estão soltas e desniveladas, dificultando a passagem de idosos e pessoas com mobilidade reduzida.",
    endereco: "Rua José Maria, 210, Vila Carvalho",
    data: "14/05/2026, 09:15",
    status: "Em andamento",
  },
  {
    id: "1003",
    titulo: "Placa de trânsito caída",
    categoria: "Sinalização quebrada",
    descricao:
      "Uma placa de sinalização está caída junto ao meio-fio e não pode ser vista pelos motoristas que chegam ao cruzamento.",
    endereco: "Avenida Independência, 540, Centro",
    data: "14/05/2026, 10:05",
    status: "Pendente",
  },
  {
    id: "1004",
    titulo: "Poste apagado em rua residencial",
    categoria: "Postes apagados",
    descricao:
      "O poste permanece apagado durante a noite há vários dias, deixando parte da rua sem iluminação e dificultando a circulação de pedestres.",
    endereco: "Rua dos Ipês, 72, Jardim Simus",
    data: "14/05/2026, 19:20",
    status: "Em andamento",
  },
  {
    id: "1005",
    titulo: "Trecho de avenida sem iluminação",
    categoria: "Falta de iluminação",
    descricao:
      "Um trecho extenso da avenida está sem iluminação pública, tornando a travessia de pedestres e a circulação noturna mais difíceis.",
    endereco: "Avenida Paraná, 1180, Jardim Santa Rosália",
    data: "15/05/2026, 07:50",
    status: "Pendente",
  },
  {
    id: "1006",
    titulo: "Fiação exposta em poste",
    categoria: "Problemas elétricos urbanos",
    descricao:
      "Há fios aparentemente soltos e componentes danificados na estrutura de um poste. A área merece avaliação técnica para prevenir acidentes.",
    endereco: "Rua Bela Vista, 340, Vila Santana",
    data: "15/05/2026, 08:25",
    status: "Pendente",
  },
  {
    id: "1007",
    titulo: "Resíduos acumulados ao lado de praça",
    categoria: "Lixo acumulado",
    descricao:
      "Sacolas, embalagens e restos de alimentos estão acumulados ao lado da praça. O material permanece no local e atrai animais.",
    endereco: "Praça das Palmeiras, 15, Jardim Planalto",
    data: "15/05/2026, 09:10",
    status: "Resolvido",
  },
  {
    id: "1008",
    titulo: "Descarte irregular de móveis",
    categoria: "Entulho irregular",
    descricao:
      "Móveis velhos, pedaços de madeira e outros materiais volumosos foram deixados na calçada, reduzindo o espaço de passagem.",
    endereco: "Rua Francisco Bueno, 425, Vila Hortência",
    data: "15/05/2026, 10:35",
    status: "Pendente",
  },
  {
    id: "1009",
    titulo: "Terreno com vegetação muito alta",
    categoria: "Terrenos abandonados",
    descricao:
      "O terreno está com vegetação alta e resíduos espalhados. Moradores solicitam vistoria e manutenção para reduzir riscos e melhorar a conservação da área.",
    endereco: "Rua das Paineiras, 160, Jardim São Paulo",
    data: "15/05/2026, 11:00",
    status: "Em andamento",
  },
  {
    id: "1010",
    titulo: "Vazamento próximo à guia da rua",
    categoria: "Vazamentos de água",
    descricao:
      "Água limpa está escorrendo continuamente junto à guia, formando uma poça e desperdiçando água mesmo sem chuva.",
    endereco: "Rua Padre Madureira, 98, Centro",
    data: "15/05/2026, 11:45",
    status: "Pendente",
  },
  {
    id: "1011",
    titulo: "Mau cheiro vindo de bueiro",
    categoria: "Esgoto",
    descricao:
      "Um forte odor semelhante a esgoto vem de um bueiro e persiste durante boa parte do dia. É necessária uma avaliação do sistema de saneamento.",
    endereco: "Rua João Wagner Wey, 310, Jardim América",
    data: "15/05/2026, 12:20",
    status: "Em andamento",
  },
  {
    id: "1012",
    titulo: "Tampa de bueiro desnivelada",
    categoria: "Problemas em vias públicas",
    descricao:
      "A tampa de um bueiro está desnivelada em relação ao pavimento, causando impactos nos veículos e oferecendo risco a ciclistas.",
    endereco: "Rua Álvaro Soares, 675, Centro",
    data: "15/05/2026, 13:05",
    status: "Resolvido",
  },
  {
    id: "1013",
    titulo: "Afundamento no asfalto",
    categoria: "Buracos",
    descricao:
      "O pavimento apresenta um afundamento próximo à faixa de estacionamento. A irregularidade está aumentando e pode causar danos aos veículos.",
    endereco: "Rua Nogueira Padilha, 890, Vila Hortência",
    data: "15/05/2026, 14:10",
    status: "Pendente",
  },
  {
    id: "1014",
    titulo: "Rampa de acesso danificada",
    categoria: "Calçadas danificadas",
    descricao:
      "A rampa de acessibilidade está rachada e apresenta desníveis, dificultando o acesso seguro de cadeirantes e pessoas com carrinhos.",
    endereco: "Rua da Penha, 145, Centro",
    data: "15/05/2026, 14:55",
    status: "Em andamento",
  },
  {
    id: "1015",
    titulo: "Faixa de pedestres pouco visível",
    categoria: "Sinalização quebrada",
    descricao:
      "A pintura da faixa de pedestres está bastante desgastada e quase não pode ser identificada pelos motoristas, especialmente à noite.",
    endereco: "Avenida General Carneiro, 720, Vila Lucy",
    data: "15/05/2026, 15:30",
    status: "Pendente",
  },
  {
    id: "1016",
    titulo: "Iluminação intermitente em poste",
    categoria: "Postes apagados",
    descricao:
      "A luminária acende e apaga repetidamente durante a noite, deixando a iluminação da calçada irregular.",
    endereco: "Rua Antônio Perez, 190, Jardim Europa",
    data: "16/05/2026, 06:50",
    status: "Em andamento",
  },
  {
    id: "1017",
    titulo: "Praça com iluminação insuficiente",
    categoria: "Falta de iluminação",
    descricao:
      "A área central da praça permanece muito escura após o anoitecer, dificultando o uso dos caminhos e bancos pelos moradores.",
    endereco: "Praça do Trabalhador, 40, Vila Progresso",
    data: "16/05/2026, 07:30",
    status: "Pendente",
  },
  {
    id: "1018",
    titulo: "Caixa elétrica urbana danificada",
    categoria: "Problemas elétricos urbanos",
    descricao:
      "Uma caixa de instalação elétrica localizada junto à calçada apresenta partes quebradas. Solicita-se inspeção para verificar as condições de segurança.",
    endereco: "Rua Santa Clara, 265, Jardim Vera Cruz",
    data: "16/05/2026, 08:15",
    status: "Pendente",
  },
  {
    id: "1019",
    titulo: "Lixo espalhado após coleta",
    categoria: "Lixo acumulado",
    descricao:
      "Restos de resíduos ficaram espalhados pela calçada após a coleta, incluindo embalagens e sacos rasgados que ainda não foram recolhidos.",
    endereco: "Rua Comendador Oetterer, 510, Vila Carvalho",
    data: "16/05/2026, 09:00",
    status: "Resolvido",
  },
  {
    id: "1020",
    titulo: "Restos de construção na calçada",
    categoria: "Entulho irregular",
    descricao:
      "Tijolos quebrados, sacos de cimento e pedaços de concreto foram depositados na calçada, bloqueando parcialmente a passagem.",
    endereco: "Rua João Ribeiro de Barros, 155, Jardim Faculdade",
    data: "16/05/2026, 09:45",
    status: "Em andamento",
  },
  {
    id: "1021",
    titulo: "Imóvel desocupado com resíduos no quintal",
    categoria: "Terrenos abandonados",
    descricao:
      "O imóvel aparenta estar desocupado e possui resíduos visíveis no quintal. Solicita-se vistoria para verificar a necessidade de limpeza.",
    endereco: "Rua Pedro José Senger, 82, Jardim Guadalajara",
    data: "16/05/2026, 10:25",
    status: "Pendente",
  },
  {
    id: "1022",
    titulo: "Vazamento de água na calçada",
    categoria: "Vazamentos de água",
    descricao:
      "Uma pequena corrente de água sai de uma conexão próxima à calçada e segue até a sarjeta. O vazamento continua ao longo do dia.",
    endereco: "Rua Benedito de Oliveira Cassu, 230, Jardim Maria Eugênia",
    data: "16/05/2026, 11:10",
    status: "Em andamento",
  },
  {
    id: "1023",
    titulo: "Retorno de esgoto em bueiro",
    categoria: "Esgoto",
    descricao:
      "Foi observado líquido com odor forte retornando por uma abertura de drenagem. O local precisa de avaliação para identificar a origem do problema.",
    endereco: "Rua Octaviano Gozzano, 470, Jardim Paulistano",
    data: "16/05/2026, 11:55",
    status: "Pendente",
  },
  {
    id: "1024",
    titulo: "Pavimento danificado após reparo",
    categoria: "Problemas em vias públicas",
    descricao:
      "Após uma intervenção na via, o trecho de pavimento ficou irregular e apresenta diferenças de altura que dificultam a passagem de veículos.",
    endereco: "Rua Professor Toledo, 330, Centro",
    data: "16/05/2026, 12:40",
    status: "Resolvido",
  },
  {
    id: "1025",
    titulo: "Buraco próximo à parada de ônibus",
    categoria: "Buracos",
    descricao:
      "Um buraco próximo à parada de ônibus obriga os passageiros a caminhar pela lateral da via para embarcar com segurança.",
    endereco: "Avenida Itavuvu, 1450, Jardim Santa Cecília",
    data: "16/05/2026, 13:20",
    status: "Pendente",
  },
  {
    id: "1026",
    titulo: "Calçada quebrada por raízes de árvore",
    categoria: "Calçadas danificadas",
    descricao:
      "As raízes de uma árvore levantaram partes da calçada e criaram um desnível que pode provocar tropeços.",
    endereco: "Rua Mascarenhas Camelo, 210, Vila Santana",
    data: "16/05/2026, 14:05",
    status: "Em andamento",
  },
  {
    id: "1027",
    titulo: "Placa de rua ilegível",
    categoria: "Sinalização quebrada",
    descricao:
      "A placa de identificação da rua está danificada e com letras desgastadas, dificultando a localização do endereço por visitantes e serviços de entrega.",
    endereco: "Rua João de Barros, 65, Jardim Paulistano",
    data: "16/05/2026, 14:50",
    status: "Pendente",
  },
  {
    id: "1028",
    titulo: "Luminária quebrada em área pública",
    categoria: "Postes apagados",
    descricao:
      "A luminária de um poste parece estar danificada e não ilumina o trecho da calçada. Solicita-se manutenção do equipamento.",
    endereco: "Rua Miguel Sutil, 305, Jardim Simus",
    data: "16/05/2026, 15:35",
    status: "Resolvido",
  },
  {
    id: "1029",
    titulo: "Trecho de ciclovia sem iluminação",
    categoria: "Falta de iluminação",
    descricao:
      "Um segmento da ciclovia fica completamente escuro à noite, dificultando a visualização do caminho por ciclistas e pedestres.",
    endereco: "Avenida Dom Aguirre, 2200, Jardim Santa Rosália",
    data: "17/05/2026, 07:05",
    status: "Pendente",
  },
  {
    id: "1030",
    titulo: "Fiação baixa sobre a passagem",
    categoria: "Problemas elétricos urbanos",
    descricao:
      "Cabos estão pendendo abaixo da altura habitual sobre uma passagem pública. É necessária avaliação da equipe responsável pela rede.",
    endereco: "Rua Américo Brasiliense, 140, Vila Carvalho",
    data: "17/05/2026, 07:50",
    status: "Em andamento",
  },
  {
    id: "1031",
    titulo: "Contêiner de lixo transbordando",
    categoria: "Lixo acumulado",
    descricao:
      "O contêiner está cheio e há sacos de lixo ao redor, ocupando parte da calçada e espalhando resíduos pelo local.",
    endereco: "Rua Padre Luiz, 410, Centro",
    data: "17/05/2026, 08:35",
    status: "Pendente",
  },
  {
    id: "1032",
    titulo: "Descarte de galhos e folhas na via",
    categoria: "Entulho irregular",
    descricao:
      "Galhos, folhas e restos de poda foram deixados junto à sarjeta e ocupam parte da faixa de estacionamento.",
    endereco: "Rua Francisco Silva, 95, Jardim Simus",
    data: "17/05/2026, 09:20",
    status: "Resolvido",
  },
  {
    id: "1033",
    titulo: "Terreno com acúmulo de água parada",
    categoria: "Terrenos abandonados",
    descricao:
      "Há pontos com água parada e resíduos em um terreno sem manutenção aparente. Solicita-se vistoria e providências de limpeza.",
    endereco: "Rua Antônio de Andrade, 370, Jardim São Guilherme",
    data: "17/05/2026, 10:00",
    status: "Em andamento",
  },
  {
    id: "1034",
    titulo: "Vazamento contínuo em registro",
    categoria: "Vazamentos de água",
    descricao:
      "Um registro junto ao passeio apresenta vazamento contínuo, mantendo o pavimento molhado e formando uma poça próxima à entrada de uma residência.",
    endereco: "Rua Coronel Nogueira Padilha, 610, Vila Hortência",
    data: "17/05/2026, 10:45",
    status: "Pendente",
  },
  {
    id: "1035",
    titulo: "Água de esgoto escorrendo pela rua",
    categoria: "Esgoto",
    descricao:
      "Um líquido com odor característico está escorrendo pela sarjeta. O problema requer inspeção para verificar possível falha na rede de esgoto.",
    endereco: "Rua João Gabriel Mendes, 175, Jardim Guadalajara",
    data: "17/05/2026, 11:30",
    status: "Pendente",
  },
  {
    id: "1036",
    titulo: "Bueiro obstruído por folhas",
    categoria: "Problemas em vias públicas",
    descricao:
      "Folhas e resíduos cobrem a entrada do bueiro, dificultando o escoamento da água da chuva e aumentando o risco de alagamento.",
    endereco: "Rua São Bento, 520, Centro",
    data: "17/05/2026, 12:15",
    status: "Em andamento",
  },
  {
    id: "1037",
    titulo: "Buraco em faixa de circulação",
    categoria: "Buracos",
    descricao:
      "Um buraco localizado na faixa de circulação exige desvios dos veículos e pode causar acidentes, principalmente durante a noite.",
    endereco: "Avenida São Paulo, 980, Além Ponte",
    data: "17/05/2026, 13:00",
    status: "Pendente",
  },
  {
    id: "1038",
    titulo: "Piso tátil danificado",
    categoria: "Calçadas danificadas",
    descricao:
      "Parte do piso tátil está quebrada e algumas peças estão ausentes, prejudicando a orientação de pessoas com deficiência visual.",
    endereco: "Rua Doutor Álvaro Soares, 120, Centro",
    data: "17/05/2026, 13:45",
    status: "Em andamento",
  },
  {
    id: "1039",
    titulo: "Semáforo de pedestres com sinal apagado",
    categoria: "Sinalização quebrada",
    descricao:
      "Um dos sinais luminosos destinados aos pedestres não está funcionando corretamente, deixando a travessia menos previsível.",
    endereco: "Avenida Afonso Vergueiro, 660, Centro",
    data: "17/05/2026, 14:30",
    status: "Pendente",
  },
  {
    id: "1040",
    titulo: "Poste sem iluminação em ponto de ônibus",
    categoria: "Postes apagados",
    descricao:
      "O poste próximo ao ponto de ônibus está apagado, dificultando a identificação do local de embarque durante a noite.",
    endereco: "Avenida Ipanema, 1750, Jardim Planalto",
    data: "18/05/2026, 07:15",
    status: "Resolvido",
  },
  {
    id: "1041",
    titulo: "Iluminação insuficiente em passagem pública",
    categoria: "Falta de iluminação",
    descricao:
      "A passagem entre duas ruas possui iluminação insuficiente e fica escura após o anoitecer, dificultando a circulação.",
    endereco: "Rua Maria Cinto de Biaggi, 88, Jardim Santa Rosália",
    data: "18/05/2026, 08:00",
    status: "Em andamento",
  },
  {
    id: "1042",
    titulo: "Tampa de caixa elétrica quebrada",
    categoria: "Problemas elétricos urbanos",
    descricao:
      "A tampa de uma caixa de instalação elétrica em área pública está quebrada. Solicita-se inspeção e reparo para evitar contato acidental.",
    endereco: "Rua Doutor Braguinha, 245, Centro",
    data: "18/05/2026, 08:45",
    status: "Pendente",
  },
  {
    id: "1043",
    titulo: "Resíduos espalhados em ponto de coleta",
    categoria: "Lixo acumulado",
    descricao:
      "Há resíduos espalhados ao redor do ponto de coleta, incluindo papelão, embalagens e sacolas, prejudicando a limpeza da calçada.",
    endereco: "Rua Júlio de Mesquita, 390, Vila Santana",
    data: "18/05/2026, 09:30",
    status: "Em andamento",
  },
  {
    id: "1044",
    titulo: "Descarte irregular de colchões",
    categoria: "Entulho irregular",
    descricao:
      "Colchões e peças de mobiliário foram deixados em um espaço público próximo à via, sem indicação de coleta programada.",
    endereco: "Rua José Tótora, 135, Jardim Europa",
    data: "18/05/2026, 10:15",
    status: "Pendente",
  },
  {
    id: "1045",
    titulo: "Mato alto em lote sem manutenção",
    categoria: "Terrenos abandonados",
    descricao:
      "A vegetação do lote está avançando em direção à calçada e dificulta a passagem. Solicita-se verificação da manutenção do terreno.",
    endereco: "Rua Joaquim Machado, 440, Jardim São Guilherme",
    data: "18/05/2026, 11:00",
    status: "Resolvido",
  },
  {
    id: "1046",
    titulo: "Vazamento de água próximo a praça",
    categoria: "Vazamentos de água",
    descricao:
      "A água está saindo do solo próximo à praça e se espalha pelo passeio. O local permanece molhado mesmo em períodos sem chuva.",
    endereco: "Rua Professora Maria de Almeida, 75, Vila Progresso",
    data: "18/05/2026, 11:45",
    status: "Pendente",
  },
  {
    id: "1047",
    titulo: "Possível obstrução na rede de esgoto",
    categoria: "Esgoto",
    descricao:
      "Foi percebido retorno de líquido e odor desagradável em uma área próxima à rede de drenagem. Solicita-se avaliação técnica para identificar a causa.",
    endereco: "Rua Lituânia, 285, Jardim Europa",
    data: "18/05/2026, 12:30",
    status: "Em andamento",
  },
  {
    id: "1048",
    titulo: "Sarjeta danificada junto ao cruzamento",
    categoria: "Problemas em vias públicas",
    descricao:
      "A sarjeta apresenta partes quebradas e desníveis que dificultam o escoamento da água e podem causar acúmulo durante as chuvas.",
    endereco: "Rua da Penha, 510, Centro",
    data: "18/05/2026, 13:15",
    status: "Pendente",
  },
  {
    id: "1049",
    titulo: "Buraco próximo à entrada de garagem",
    categoria: "Buracos",
    descricao:
      "Um buraco junto à entrada de uma garagem dificulta a passagem dos veículos e vem aumentando de tamanho com o tráfego.",
    endereco: "Rua José Joaquim de Lacerda, 205, Vila Hortência",
    data: "18/05/2026, 14:00",
    status: "Resolvido",
  },
  {
    id: "1050",
    titulo: "Calçada com desnível em frente a comércio",
    categoria: "Calçadas danificadas",
    descricao:
      "A calçada possui um desnível acentuado em frente ao estabelecimento, obrigando pedestres a desviar e podendo provocar quedas.",
    endereco: "Rua Barão de Tatuí, 325, Jardim Vergueiro",
    data: "18/05/2026, 14:45",
    status: "Pendente",
  },
];

export const estilosStatus: Record<Status, string> = {
  Pendente: "border-yellow-300 bg-yellow-50 text-yellow-600",
  "Em andamento": "border-blue-200 bg-blue-50 text-blue-600",
  Resolvido: "border-green-200 bg-green-50 text-green-600",
};
