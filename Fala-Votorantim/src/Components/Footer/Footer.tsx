import { NavLink } from "react-router-dom";

const lista = [
  { link: "/", label: "Início" },
  { link: "/Sobre", label: "Sobre nós" },
  { link: "/Feed", label: "Feed de denúncias" },
  { link: "/Login", label: "Login" },
  { link: "/Cadastro", label: "Cadastro" },
];

export default function Footer() {
  const base = import.meta.env.BASE_URL;

  return (
    <footer className="flex gap-20 bg-[#1E2939] p-5">
      <div className="flex flex-col gap-5">
        <div>
          <NavLink to="/">
            <img
              src={`${base}Logo.png`}
              alt="Logo do Fala Votorantim"
              className="h-14 w-14 rounded-full object-cover"
            />
          </NavLink>
        </div>

        <div className="flex gap-3">
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X">
            <img src={`${base}twitter-x.svg`} alt="" className="h-6 w-6" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src={`${base}instagram.svg`} alt="" className="h-6 w-6" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <img src={`${base}youtube.svg`} alt="" className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src={`${base}linkedin.svg`} alt="" className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3">
        <h2 className="mb-5 font-bold text-[#E9F0FF]">Páginas</h2>
        {lista.map((dado) => (
          <NavLink
            key={dado.link + dado.label}
            to={dado.link}
            className="text-[#99A1AF]"
          >
            {dado.label}
          </NavLink>
        ))}
      </div>
    </footer>
  );
}