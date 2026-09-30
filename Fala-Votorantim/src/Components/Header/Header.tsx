import {NavLink} from "react-router-dom";

const links = [
    {link:"/", label: "Início"},
    {link:"/Sobre", label: "Sobre nós"},
    {link:"/Feed", label: "Feed de denúncias"},
    {link:"/Registro", label: "Acessar"},
]

export default function Header() {
    return(
        <header className="w-full bg-[#FFFFFF] min-w-full fixed top-0 left-0 z-9999">
            <div className="flex place-content-between h-[10vh] mx-5">
                <div className="flex items-center gap-5">
                    <NavLink to={"/"}><img src="/Logo.png" alt="Logo do Fala Votorantim" className="w-[3.5vw] h-[3.5vw] rounded-[50%]" /></NavLink>
                    <h1 className="text-[#1E2939]">Fala Votorantim</h1>
                </div>
                <div className="flex items-center gap-8">
                    {links.map((dado) => {
                        return(
                            <NavLink to={dado.link}
                            end={dado.link === "/"}
                            className={({isActive}) => {
                                return isActive ?
                                "flex h-10 items-center justify-center p-5 rounded-md text-[#1E2939] font-bold" :
                                "flex h-10 items-center justify-center p-5 rounded-md text-[#1E2939]"
                            }}
                            key={dado.link}>
                                {dado.label}
                            </NavLink>
                        )
                    })}
                    
                </div>
            </div>
        </header>
    )
}