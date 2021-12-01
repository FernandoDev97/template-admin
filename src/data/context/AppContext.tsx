import { createContext, useEffect, useState } from "react";

// type Tema = 'dark' | ''

interface AppContextProps {
    theme?: string
    switchTheme?: () => void
}


const AppContext = createContext<AppContextProps>({})

export function AppProvider(props) {

    const [theme, setTheme] = useState('')

    function switchTheme() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    useEffect(() => {
       const themeSelected = localStorage.getItem('theme')
       setTheme(themeSelected)
    }, [])

    return (
        <AppContext.Provider value={{
            theme,
            switchTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext
