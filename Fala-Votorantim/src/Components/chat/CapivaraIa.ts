export const getMockAIResponse = (userMessage: string): string => {
    const message = userMessage
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    if (message.includes("oi") || message.includes("ola") || message.includes("bom dia") || message.includes("boa tarde") || message.includes("boa noite")) 
        {
            return "Olá! Sou o assistente virtual do Fala Votorantim. Como posso ajudar você hoje?";
        }

    if (message.includes("denuncia") || message.includes("reclamacao") || message.includes("problema")) 
        {
            return "Você pode utilizar o Fala Votorantim para registrar problemas da cidade, como buracos nas ruas, iluminação pública, lixo e vazamentos. Procure a opção de registrar denúncia no site para começar.";
        }

    if (message.includes("buraco") || message.includes("rua") || message.includes("asfalto")) 
        {
            return "Para relatar um buraco ou problema no asfalto, procure a categoria relacionada a buracos ou vias públicas no formulário de denúncias. Se possível, informe o endereço e descreva o problema.";
        }

    if (message.includes("luz") || message.includes("iluminacao") || message.includes("poste")) 
        {
            return "Problemas com iluminação pública podem ser relatados na categoria de iluminação. Informe a rua e um ponto de referência para ajudar a identificar o local.";
        }

    if (message.includes("lixo") || message.includes("sujeira") || message.includes("entulho")) 
        {
            return "Para relatar descarte irregular de lixo ou entulho, procure a categoria correspondente no formulário. Descreva o local e, se possível, informe desde quando o problema acontece.";
        }

    if (message.includes("vazamento") || message.includes("cano") || message.includes("esgoto")) 
        {
            return "Se você identificou um vazamento ou problema de esgoto, registre a localização e descreva o que está acontecendo. Se houver risco imediato à segurança, procure também o serviço de emergência apropriado.";
        }

    if (message.includes("acompanhar") || message.includes("status") || message.includes("andamento")) 
        {
            return "Para acompanhar uma denúncia, procure a área de consulta ou acompanhamento disponibilizada pelo site. A disponibilidade de informações depende das funcionalidades implementadas no sistema.";
        }

    if (message.includes("categoria") || message.includes("tipos de denuncia")) 
        {
            return "As categorias do projeto incluem problemas como buracos, iluminação, lixo, esgoto e segurança. Escolha a categoria que melhor representa o problema que você encontrou.";
        }

    // Secretaria de Serviços Públicos
    if (message.includes("servicos publicos") || message.includes("limpeza urbana") || message.includes("coleta de lixo")) 
        {
            return "A área de Serviços Públicos pode estar relacionada a solicitações de limpeza urbana, coleta de resíduos e manutenção de espaços públicos. Para problemas como lixo acumulado ou descarte irregular, registre uma denúncia no Fala Votorantim.";
        }

    // Secretaria de Obras e Urbanismo
    if (message.includes("obras") || message.includes("urbanismo") || message.includes("calcada")) 
        {
            return "A área de Obras e Urbanismo pode estar relacionada a problemas como buracos nas ruas, asfalto danificado e manutenção de calçadas. Registre a ocorrência com o endereço e, se possível, uma foto do problema.";
        }

    // Secretaria de Meio Ambiente
    if (message.includes("meio ambiente") || message.includes("arvore") || message.includes("poluicao") || message.includes("desmatamento")) 
        {
            return "A área de Meio Ambiente pode estar relacionada a questões de arborização, poluição e preservação ambiental. Descreva o local e o problema ao registrar sua solicitação.";
        }

    // Secretaria de Saúde
    if (message.includes("saude") || message.includes("posto de saude") || message.includes("ubs") || message.includes("hospital")) 
        {
            return "Para questões relacionadas à saúde pública, como unidades de saúde e atendimento municipal, consulte os canais oficiais da Prefeitura ou da área de Saúde. Utilize o Fala Votorantim para problemas que se encaixem nas categorias disponíveis no sistema.";
        }

    // Secretaria de Educação
    if (message.includes("educacao") || message.includes("escola") || message.includes("creche") || message.includes("merenda escolar")) 
        {
            return "A área de Educação está relacionada a demandas de escolas e creches municipais, entre outras questões educacionais. Informe a unidade, o endereço e o problema para facilitar o encaminhamento.";
        }

    // Secretaria de Segurança Pública
    if (message.includes("seguranca") || message.includes("guarda municipal") || message.includes("violencia") || message.includes("crime")) 
        {
            return "Para questões de segurança pública, o encaminhamento depende do tipo de ocorrência. Em situações de emergência ou crime em andamento, procure diretamente os serviços de emergência competentes. Para problemas urbanos não emergenciais, verifique as categorias disponíveis no Fala Votorantim.";
        }

    // Secretaria de Mobilidade Urbana
    if (message.includes("mobilidade") || message.includes("transito") || message.includes("semaforo") || message.includes("placa de transito") || message.includes("faixa de pedestre")) 
        {
            return "A área de Mobilidade Urbana pode estar relacionada a problemas de trânsito, sinalização viária e circulação nas ruas. Informe o endereço e descreva o problema para facilitar a identificação da demanda.";
        }

    // Administração Pública
    if (message.includes("administracao") || message.includes("secretaria municipal") || message.includes("servidor publico")) 
        {
            return "Para dúvidas administrativas, informações sobre serviços municipais ou solicitações gerais, consulte os canais oficiais da Prefeitura de Votorantim. Se sua dúvida estiver relacionada a um problema urbano, posso ajudar a identificar a categoria adequada para registrar a ocorrência.";
        }

    if (message.includes("anonim") || message.includes("privacidade") || message.includes("meus dados")) 
        {
            return "A privacidade é importante. Antes de enviar uma denúncia, confira as informações apresentadas pelo próprio site sobre identificação e tratamento de dados. Não compartilhe senhas ou dados pessoais desnecessários aqui no chat.";
        }

    if (message.includes("humano") || message.includes("atendente") || message.includes("prefeitura")) 
        {
            return "Sou um assistente automatizado de demonstração e não consigo transferir sua conversa para um atendente. Para atendimento oficial, consulte os canais disponibilizados pela Prefeitura de Votorantim.";
        }

    if (message.includes("obrigado") || message.includes("obrigada") || message.includes("valeu")) 
        {
            return "Por nada! Estou aqui para ajudar você a utilizar o Fala Votorantim.";
        }

    if (message.includes("ajuda") || message.includes("como funciona")) 
        {
            return "Posso orientar você sobre como registrar uma denúncia, escolher uma categoria e entender o acompanhamento. Por exemplo, pergunte: 'Como denuncio um buraco na rua?'";
        }

    return "Ainda não tenho uma resposta específica para essa pergunta. 🤔 Posso ajudar com orientações sobre denúncias urbanas, categorias e utilização do Fala Votorantim. O que você gostaria de saber?";
};