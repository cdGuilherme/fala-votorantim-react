export default function Header() {
    return(
        <header className="w-full bg-linear-to-r from-[#1447E6] to-[#193CB8] min-w-full ">
            <div className="flex place-content-between h-[96px] mx-5">
                <div className="flex items-center gap-5">
                    <img src="/Logo.png" alt="Logo" className="w-[64px] h-[64px] rounded-[50%]" />
                    <h1>Fala Votorantim</h1>
                </div>
                <div className="flex items-center gap-8">
                    <a href="/" className="flex h-10 items-center justify-center bg-[#1447E6] p-5 rounded-md">Início</a>
                    <a href="/Sobre" className="flex h-10 items-center justify-center bg-[#1447E6] p-5 rounded-md">Sobre Nós</a>
                    <a href="/Feed" className="flex h-10 items-center justify-center bg-[#1447E6] p-5 rounded-md">Feed de Denúncias</a>
                    <a href="/Login" className="flex h-10 items-center justify-center bg-[#1447E6] p-5 rounded-md">Login</a>
                    <a href="/Cadastrar" className="flex h-10 items-center justify-center bg-[#1447E6] p-5 rounded-md">Cadastrar</a>
                </div>
            </div>
        </header>
    )
}