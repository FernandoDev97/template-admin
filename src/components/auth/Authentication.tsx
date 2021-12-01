import Head from 'next/head'
import Image from 'next/image'
import router from 'next/router'
import loading from '../../../public/img/loading.gif'
import useAuth from '../../data/hooks/useAuth'

export default function Authentication(props) {

    const ctx = useAuth()

    function renderContent() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes('teste-pratico-WiiD-auth')) {
                                    window.location.href = '/auth'
                                }
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading() {
        return (
            <div className={`
                flex justify-center
                items-center h-screen
            `}>
                <Image src={loading} />
            </div>
        )
    }

    if (!ctx.loading && ctx.user?.email) {
        return renderContent()
    } else if (ctx.loading) {
        return renderLoading()
    } else {
        router.push('/auth')
        return null
    }
}