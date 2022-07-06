import React ,{ useState, Fragment, createContext ,useContext } from 'react'
const NumContext = createContext();

function Sub() {
    const {num,setNum} = useContext(NumContext)
    return (
        <>
            <h2>{num}</h2>
            <button onClick={()=>{setNum(num+1)}}>点我+1</button>
        </>
    )
}

function Father(){
    return  <Sub/>
    
}

function App() {
    const [num, setNum] = useState(1)
    
    return (
        <NumContext.Provider value={{num,setNum}}>
            <Father />
        </NumContext.Provider>
        
    )
}

export default App