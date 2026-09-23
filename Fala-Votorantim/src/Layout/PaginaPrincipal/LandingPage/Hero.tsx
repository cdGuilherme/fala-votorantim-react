import { NavLink } from "react-router-dom";

export default function Hero() {
    return(
        <section className="bg-[#1447E6] relative h-[100vh] font-bold">
            <div className=" text-white absolute top-[50vh] -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="flex flex-col gap-10 justify-center items-center max-w-[80vw] text-center">
                    <h1 className="text-5xl">Ajude a melhorar Votorantim</h1>
                    <p className="text-xl">Encontrou algum problema na cidade? Denuncie buracos, iluminação quebrada, lixo acumulado e outros problemas urbanos de forma rápida, segura e anônima.</p>
                    <div className="flex gap-10">
                        {[{nome: "Fazer denúncia", link: "/Registro"},{nome: "Ver denúncias", link: "/Feed"}].map((dado, index) => {
                            return(
                                <NavLink to={dado.link}
                                key={dado.nome}
                                className="w-[25vw] h-[7vh] rounded-[1vw] border-2 flex justify-center items-center text-lg"
                                style={index == 0 ? {backgroundColor: "white", color: "#1447E6"} : {backgroundColor: "#1447E6", color: "white"}}>
                                    {dado.nome}
                                </NavLink>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}