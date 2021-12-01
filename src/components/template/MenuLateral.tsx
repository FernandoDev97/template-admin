import useAuth from "../../data/hooks/useAuth";
import useDataContext from "../../data/hooks/useDataContext";
import { IconeHome, IconeSair } from "../icons";
import AvatarUser from "./AvatarUser";
import MenuItem from "./MenuItem";

export default function MenuLateral() {
    
    const ctx = useAuth()
    const ctxData = useDataContext()

    return (
        <aside className={`
            flex flex-col 
            bg-gray-200 text-gray-700
            dark:bg-gray-900 dark:text-gray-200
            `}>
            <div className={`
                flex flex-col items-center justify-center
                h-24 w-24
            `}>
                <AvatarUser/>
            </div>

            <hr className='
                    border-gray-800
                    dark:border-gray-300
                    max-w-screen-lg
                '
                />


            <ul className='flex-grow'>
                <MenuItem url='/' text='Início' icone={IconeHome} onClick={ctxData.getUserData}/>
            </ul>

            <ul>
                <MenuItem
                    className={`
                        text-red-600 hover:bg-red-400 hover:text-white
                        dark:text-red-400 dark:hover:text-white dark:hover:bg-red-500
                    `}
                    url='/auth'
                    text='Sair'
                    icone={IconeSair}
                    onClick={ctx.logout}
                />
            </ul>
        </aside>
    )
}