import { useState, createContext } from "react";
import client from '../../service/client'

interface DataContextProps {
    searchedValue: string
    getUserData: () => void
}

export const DataContext = createContext<DataContextProps>(null)

export const DataContextProvider = props => {
    const [searchedValue, setSeachedValue] = useState('')

    async function getUserData() {
        try {
            const response = await client.get(searchedValue)
            console.log(response.data)

        }catch(err) {
            console.log(err)
        }
    }

    return (
        <DataContext.Provider value={{
            searchedValue,
            getUserData
        }}>
            {props.children}
        </DataContext.Provider>
    )
}
