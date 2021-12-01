import useAppData from "../../data/hooks/useAppData";
import BtnAlternarTema from "./BtnAlternarTema";
import Titulo from "./Titulo";

interface CabecalhoProps {
    titulo: string
    subtitulo: string
}

export default function Cabecalho (props: CabecalhoProps) {
    const ctx = useAppData()

    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}/>
            <div className={`flex flex-grow justify-end`}>
                <BtnAlternarTema tema={ctx.theme} alternarTema={ctx.switchTheme}/>
            </div>
        </div>
    )
}