import { NavLink } from "react-router-dom";

const lista = [
    {link:"/", label: "Início"},
    {link:"/Sobre", label: "Sobre nós"},
    {link:"/Feed", label: "Feed de Denúncias"},
    {link:"/Login", label: "Login"},
    {link:"/Cadastro", label: "Cadastro"}
]

export default function Footer() {
    return(
        <footer className="bg-[#1E2939] flex gap-20 p-5">
            <div className="flex flex-col gap-5">
                <div>
                    <NavLink to={"/"}><img src="/Logo.png" alt="logo" className="w-[3.5vw] h-[3.5vw] rounded-[50%]"/></NavLink>
                </div>
                <div className="flex gap-3">
                    <a href="http://" target="_blank" rel="noopener noreferrer"><img src="/twitter-x.svg" alt="" className="w-[2vw] h-[2vw]"/></a>
                    <a href="http://" target="_blank" rel="noopener noreferrer"><img src="/instagram.svg" alt="" className="w-[2vw] h-[2vw]"/></a>
                    <a href="http://" target="_blank" rel="noopener noreferrer"><img src="/youtube.svg" alt="" className="w-[2vw] h-[2vw]"/></a>
                    <a href="http://" target="_blank" rel="noopener noreferrer"><img src="/linkedin.svg" alt="" className="w-[2vw] h-[2vw]"/></a>
                </div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-left">
                <h1 className="text-[#E9F0FF] font-bold mb-5">Páginas</h1>
                {lista.map((dado) => {
                    return(
                        <NavLink to={dado.link}
                        className={"text-[#99A1AF]"}>
                            {dado.label}
                        </NavLink>
                    )
                })}
            </div>
        </footer>
    )
}