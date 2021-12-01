import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { IconGoogle, IconWarning } from "../components/icons";
import useAuth from "../data/hooks/useAuth";

export default function Auth() {
    const ctx = useAuth()

    const [mode, setMode] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    function showError(msg, time = 5) {
        setError(msg)
        setTimeout(() => setError(null), time * 1000)
    }

    async function submit() {
        try {
            if (mode === 'login') {
                //showError('Ocorreu um erro no login!')
                await ctx.login(email, password)
            } else {
                await ctx.register(email, password)
                //showError('Ocorreu um erro no cadastro!')
            }
        } catch (e) {
            showError(e.message)
        }
        
       
    }

    return (
        <div className='
            flex 
            h-screen 
            items-center 
            justify-center 
            bg-gray-200 '
        >
            <div className={`
                hidden 
                md:block 
                md:w-1/2 
                lg:w-2/3`}
            >
                <img src="/img/login3.jpg" alt="Imagem da tela de login" className='object-cover h-screen w-full' />
            </div>

            <div className='m-10 w-full md:w-1/2 lg:w-1/3' >
                <h1 className={`text-2xl font-bold mb-5`}>
                    {mode === 'login' ? 'Entre com sua conta' : 'Cadastre-se na plataforma'}
                </h1>

                {error ? (
                    <div className={`
                        bg-red-400
                        text-white
                        flex
                        items-center
                        justify-center
                        py-3
                        px-5
                        my-2
                        border rounded-lg
                    `}>
                        {IconWarning}
                        <span className='ml-3'>{error}</span>
                    </div>
                ) : false}

                <AuthInput
                    label='Email:'
                    type='email'
                    value={email}
                    valueChanged={setEmail}
                    mandatory
                />

                <AuthInput
                    label='Password:'
                    type='password'
                    value={password}
                    valueChanged={setPassword}
                    mandatory
                />

                <button onClick={submit} className={`
                    w-full 
                    bg-indigo-500 
                    hover:bg-indigo-400 
                    text-black
                    rounded-lg
                    px-4
                    py-3
                    mt-6
                `}>
                    {mode === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className='
                    my-6 
                    border-gray-300 
                    w-full'
                />

                <button onClick={ctx.loginGoogle} className={`
                    flex
                    justify-center
                    w-full 
                    bg-red-500 
                    hover:bg-red-400 
                    text-black
                    rounded-lg
                    px-4
                    py-3
                `}>
                    <span className='mr-2'>Entrar com o Google</span>  {IconGoogle}
                </button>

                {mode === "login" ? (
                    <p className='mt-8 text-center'>
                        Novo por aqui?
                        <a onClick={() => setMode('cadastro')}
                            className={`
                                text-blue-500
                                hover:text-blue-700
                                font-semibold
                                cursor-pointer
                                ml-1
                            `}>
                            Crie uma Conta gratuitamente.
                        </a>

                    </p>
                ) : (
                    <p className='mt-8 text-center'>
                        Já faz parte da nossa comunidade?
                        <a className={`
                        text-blue-500
                        hover:text-blue-700
                        font-semibold
                        cursor-pointer
                        ml-1
                    `} onClick={() => setMode('login')}>
                            Clique aqui para entrar.
                        </a>

                    </p>
                )}

            </div>
        </div>
    )
}