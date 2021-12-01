import Link from 'next/link'
import useAuth from '../../data/hooks/useAuth'

export default function AvatarUser () {
    const ctx = useAuth()
    
    return (
        <Link href='/'>
            <img
                className='h-16 w-16 rounded-full cursor-pointer 
                    border-t-4 border-b-4 border-r-4 border-l-4 border-gray-100 
                    dark:border-gray-700' 
                src={ctx.user?.imageUrl ?? '/img/avatar.svg'} 
                alt="Imagem do perfil do usuário" 
            />
        </Link>
    )
}