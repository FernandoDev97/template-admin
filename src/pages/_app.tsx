import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AppProvider } from '../data/context/AppContext'
import { AuthProvider } from '../data/context/AuthContext'
import { DataContextProvider } from '../data/context/DataContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <DataContextProvider>
          <Component {...pageProps} />
        </DataContextProvider>
      </AppProvider>
    </AuthProvider>
  )
}

export default MyApp
