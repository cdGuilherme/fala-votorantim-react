import {NavLink} from "react-router-dom";

const links = [
    {link:"/", label: "Início"},
    {link:"/Sobre", label: "Sobre"},
    {link:"/Feed", label: "Feed"},
    {link:"/Login", label: "Login"},
    {link:"/Cadastrar", label: "Cadastrar"},
]

export default function Header() {
    return(
        <header className="w-full bg-linear-to-r from-[#1447E6] to-[#193CB8] min-w-full ">
            <div className="flex place-content-between h-[96px] mx-5">
                <div className="flex items-center gap-5">
                    <img src="/Logo.png" alt="Logo" className="w-[64px] h-[64px] rounded-[50%]" />
                    <h1 className="text-white">Fala Votorantim</h1>
                </div>
                <div className="flex items-center gap-8">
                    {links.map((dado) => {
                        return(
                            <NavLink to={dado.link}
                            end={dado.link === "/"}
                            className={({isActive}) => {
                                return isActive ?
                                "flex h-10 items-center justify-center bg-[#155DFC] p-5 rounded-md text-white" :
                                "flex h-10 items-center justify-center bg-[#1447E6] p-5 rounded-md text-white"
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