import Cabecalho from "./Cabecalho";
import MenuLateral from "./MenuLateral";
import Conteudo from "./Conteudo"
import useAppData from "../../data/hooks/useAppData";
import Authentication from "../auth/Authentication";

interface LayoutProps {
    titulo: string
    subtitulo: string
    children?: any
}

export default function Layout(props: LayoutProps) {
    const ctx = useAppData()

    return (
        <Authentication>
            <div className={`${ctx.theme} flex h-screen w-screen`}>
                <MenuLateral />
                <div className={`flex flex-col w-full p-7 bg-gray-300 dark:bg-gray-800`}>
                    <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
                    <Conteudo>
                        Aqui ficará o conteúdo que será exibido!
                    </Conteudo>
                </div>
            </div>
        </Authentication>
        
    )
}