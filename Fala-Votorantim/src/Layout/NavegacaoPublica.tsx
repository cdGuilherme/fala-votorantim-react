import Header from "../Components/Header/Header";
import useNavegacaoPublica from "../hooks/useNavegacaoPublica";

export default function NavegacaoPublica() {
    const { menuAberto, alternarMenu, fecharMenu } = useNavegacaoPublica();

    return (
        <Header
            menuAberto={menuAberto}
            onAlternar={alternarMenu}
            onFechar={fecharMenu}
        />
    );
}
