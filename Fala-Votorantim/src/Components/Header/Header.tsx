import {NavLink} from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const links = [
    {link:"/", label: "Início"},
    {link:"/Sobre", label: "Sobre nós"},
    {link:"/Feed", label: "Feed de denúncias"},
    {link:"/Registro", label: "Acessar"},
]

export default function Header() {
    return(
        <header className="w-[100vw] bg-linear-to-r from-[#1447E6] to-[#193CB8] absolute top-0 z-999 ">
            <div className="flex place-content-between items-center p-2 mx-5 h-[10vh]
                            md:place-content-evenly
                            lg:place-content-between">
                <div className="flex items-center gap-5">
                    <NavLink to={"/"}><img src="/Logo.png" alt="Logo do Fala Votorantim" 
                    className="w-15 h-15 rounded-[50%]" /></NavLink>
                    <h1 className="text-white hidden
                                    lg:inline-block">Fala Votorantim</h1>
                </div>
                <div className="hidden
                                md:block md:flex md:items-center md:gap-8">
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
                <div className="md:hidden"><RxHamburgerMenu size={40} className="text-white"/></div>
            </div>
        </header>
    )
}