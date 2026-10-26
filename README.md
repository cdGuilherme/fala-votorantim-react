# Fala Votorantim — React

Projeto **Fala Votorantim**, desenvolvido com React, TypeScript, Vite e Tailwind CSS.

🌐 **Acesse o site publicado:** [Fala Votorantim — GitHub Pages](https://cdGuilherme.github.io/fala-votorantim-react/)

📦 **Repositório:** [fala-votorantim-react](https://github.com/cdGuilherme/fala-votorantim-react)

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- npm, que acompanha a instalação do Node.js.

## Instalação

Na primeira execução ou após clonar o repositório, entre na pasta do projeto:

```bash
cd Fala-Votorantim
npm install
```

## Executar em desenvolvimento

Inicia o servidor local de desenvolvimento:

```bash
npm run dev
```

Acesse o endereço exibido no terminal.

Para parar o servidor, pressione `Ctrl + C`.

## Build e testes antes do commit

Gera a versão de produção do projeto:

```bash
npm run build
```

Recomenda-se executar esse comando antes de enviar alterações para verificar se o projeto compila corretamente.

## Visualizar a versão de produção localmente

Depois de gerar o build, execute:

```bash
npm run preview
```

Acesse o endereço exibido no terminal. Esse comando permite conferir a versão compilada antes da publicação.

Para encerrar, pressione `Ctrl + C`.

## Enviar alterações para o GitHub

Após testar as alterações:

```bash
git add .
git commit -m "Descreva suas alterações"
git push
```

O GitHub Actions executa o processo de build e publicação do GitHub Pages automaticamente após o envio de alterações para a branch configurada.

## Comandos úteis

| Comando | Finalidade |
|---|---|
| `npm install` | Instala as dependências do projeto. |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão de produção. |
| `npm run preview` | Visualiza localmente a versão compilada. |
| `npm run` | Lista os scripts disponíveis no `package.json`. |
| `git status` | Mostra os arquivos modificados e o estado do Git. |
| `git log --oneline -5` | Exibe os cinco commits mais recentes. |

## Publicação

O projeto é publicado no GitHub Pages por meio do GitHub Actions.

**Site:** https://cdGuilherme.github.io/fala-votorantim-react/