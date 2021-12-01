import Link from 'next/link'

interface MenuItemProps {
    url?: string
    text: string
    icone: any
    className?: string
    onClick?: (event: any) => void
}

export default function MenuItem (props: MenuItemProps) {
    function renderLink () {
        return (
        <a className={
            `flex flex-col justify-center items-center 
            h-24 w-56 text-gray-600 
            dark:text-gray-200
            
            ${props.className}`}>
            {props.icone}
            <span className={`text-xs font-light `}>
                {props.text}
            </span>
         </a>
        )
    }

    return (
        <li onClick={props.onClick} className={`
            hover:bg-gray-100 dark:hover:bg-gray-800
            cursor-pointer`}>
            {props.url ? (
                <Link href={props.url}>
                    {renderLink()}
                </Link> 
            ): (
                renderLink()
            )}
            
           
        </li>
    )
}