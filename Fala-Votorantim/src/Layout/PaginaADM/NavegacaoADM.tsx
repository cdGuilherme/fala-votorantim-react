import MenuLateralADM from "../../Components/Cards/menuLateral/MenuLateralADM";
import useNavegacaoADM from "../../hooks/useNavegacaoADM";

export default function NavegacaoADM() {
    const { menuAberto, alternarMenu, fecharMenu } = useNavegacaoADM();

    return (
        <MenuLateralADM
            menuAberto={menuAberto}
            onAlternar={alternarMenu}
            onFechar={fecharMenu}
        />
    );
}
