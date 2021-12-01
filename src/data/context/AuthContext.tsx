import firebase from "../../firebase/config";
import route from 'next/router'
import { createContext, useEffect, useState } from "react";
import User from "../../model/User";
import Cookies from 'js-cookie'


interface AuthContextProps {
    user?: User
    loading?: boolean
    login?: (email: string, password: string) => Promise<void>
    register?: (email: string, password: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function userNormalized(userFirebase: firebase.User): Promise<User> {
    const token = await userFirebase.getIdToken()
    return {
        uid: userFirebase.uid,
        name: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provider: userFirebase.providerData[0].providerId,
        imageUrl: userFirebase.photoURL
    }
}

function cookie(logado: boolean) {
    if (logado) {
        Cookies.set('teste-pratico-WiiD-auth', logado, {
            expires: 7
        })
    } else {
        Cookies.remove('teste-pratico-WiiD-auth')
    }
}

export function AuthProvider(props) {
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)

    async function sectionConfig(userFirebase) {
        if (userFirebase?.email) {
            const userFire = await userNormalized(userFirebase)
            setUser(userFire)
            cookie(true)
            setLoading(false)
            return user
        } else {
            cookie(false)
            setUser(null)
            setLoading(false)
            return false
        }
    }

    async function login(email, password) {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, password)

            await sectionConfig(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function register(email, password) {
        try {
            setLoading(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)

            await sectionConfig(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            await sectionConfig(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await sectionConfig(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('teste-pratico-WiiD-auth')) {
            const cancel = firebase.auth().onIdTokenChanged(sectionConfig)
            return () => cancel()
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;