function ComoFunciona() {
    return (
        <section className="bg-[#EFF6FF] px-[10vw] py-20 flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-center text-[#1E2939]">Como funciona?</h2>

            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#1E2939]">1. Crie sua conta</h3>
                <p className="text-[#4A5565]">Faça seu cadastro de forma rápida e segura para começar a utilizar a plataforma.</p>
                <p className="text-[#4A5565]">Com uma conta cadastrada, você poderá:</p>
                <ul className="list-disc pl-6 text-[#4A5565]">
                    <li>Registrar denúncias;</li>
                    <li>Acompanhar solicitações;</li>
                    <li>Visualizar atualizações;</li>
                    <li>Participar ativamente da melhoria da cidade.</li>
                </ul>
                <p className="text-[#4A5565]">Nosso sistema foi pensado para ser simples e acessível para qualquer pessoa.</p>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#1E2939]">2. Registre sua denúncia</h3>
                <p className="text-[#4A5565]">Encontrou um problema na cidade?</p>
                <p className="text-[#4A5565]">Descreva a situação, informe o local e envie fotos para ajudar na identificação do problema.</p>
                <p className="text-[#4A5565]">Você pode denunciar:</p>

                <p className="text-[#4A5565] mt-2">Problemas de infraestrutura urbana:</p>
                <ul className="list-disc pl-6 text-[#4A5565]">
                    <li>Buracos;</li>
                    <li>Calçadas danificadas;</li>
                    <li>Sinalização quebrada.</li>
                </ul>

                <p className="text-[#4A5565] mt-2">Problemas de iluminação pública:</p>
                <ul className="list-disc pl-6 text-[#4A5565]">
                    <li>Postes apagados;</li>
                    <li>Falta de iluminação;</li>
                    <li>Problemas elétricos urbanos.</li>
                </ul>

                <p className="text-[#4A5565] mt-2">Problemas de limpeza urbana:</p>
                <ul className="list-disc pl-6 text-[#4A5565]">
                    <li>Lixo acumulado;</li>
                    <li>Entulho irregular;</li>
                    <li>Terrenos abandonados.</li>
                </ul>

                <p className="text-[#4A5565] mt-2">Problemas de vazamentos e saneamento:</p>
                <ul className="list-disc pl-6 text-[#4A5565]">
                    <li>Vazamentos de água;</li>
                    <li>Esgoto;</li>
                    <li>Problemas em vias públicas.</li>
                </ul>

                <p className="text-[#4A5565] mt-2">Entre outros problemas não mencionados também.</p>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#1E2939]">3. As informações são organizadas</h3>
                <p className="text-[#4A5565]">Após o envio, a denúncia é registrada e organizada na plataforma para facilitar a análise das informações.</p>
                <p className="text-[#4A5565]">Isso ajuda a identificar:</p>
                <ul className="list-disc pl-6 text-[#4A5565]">
                    <li>O tipo de problema;</li>
                    <li>A localização;</li>
                    <li>A prioridade da ocorrência;</li>
                    <li>A quantidade de denúncias semelhantes.</li>
                </ul>
                <p className="text-[#4A5565]">Quanto mais detalhada for a denúncia, mais eficiente pode ser o encaminhamento da situação.</p>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#1E2939]">4. Acompanhe o andamento</h3>
                <p className="text-[#4A5565]">Você poderá acompanhar o status da sua denúncia diretamente pela plataforma.</p>
                <p className="text-[#4A5565]">Os status incluem:</p>
                <ul className="list-disc pl-6 text-[#4A5565]">
                    <li>Pendente;</li>
                    <li>Em andamento;</li>
                    <li>Resolvido.</li>
                </ul>
                <p className="text-[#4A5565]">Assim, a população consegue ter mais transparência sobre os problemas reportados na cidade.</p>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-[#1E2939]">5. Ajude a melhorar Votorantim</h3>
                <p className="text-[#4A5565]">Cada denúncia enviada contribui para uma cidade mais organizada, segura e eficiente.</p>
                <p className="text-[#4A5565]">A participação da população é essencial para identificar problemas mais rapidamente e incentivar melhorias urbanas para todos.</p>
                <p className="text-[#4A5565]">Com o Fala Votorantim, sua voz ajuda a transformar a cidade.</p>
            </div>
        </section>
    )
}

export default ComoFunciona;
