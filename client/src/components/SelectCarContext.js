import { createContext,useState } from "react";


export const SelectCarContext = createContext();

export const SelectCarProvider = ({children})=>{
    const [selectCar,setSelectCar]=useState(false)

    const handleSelectCar=()=>{
        setSelectCar(!selectCar);
    }
    return(
        <>
            <SelectCarContext.Provider value={{selectCar,setSelectCar,handleSelectCar}}>
                {
                    children
                }
            </SelectCarContext.Provider>
        </>
    )
}

