export interface Mensagem
{
    id: string,
    text: string,
    user: "user" | "bot",
    tempo: Date
}